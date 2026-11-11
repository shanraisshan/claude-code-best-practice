// Speaks each sentence of <video-dir>/script.md with Kokoro (local, open-weights TTS). Run by `build.cjs tts`.
//   node tts.mjs <video-dir> <out-dir>
// Voice, speed and pronunciation fixes come from <video-dir>/video.json.
// Model: downloaded once (about 90 MB) into the transformers cache on first run.
// Set KOKORO_CACHE to a folder that already holds onnx-community/Kokoro-82M-v1.0-ONNX to stay fully offline.
import { KokoroTTS } from "kokoro-js";
import { env } from "@huggingface/transformers";
import fs from "fs";
import path from "path";

if (process.env.KOKORO_CACHE) { env.cacheDir = process.env.KOKORO_CACHE; env.allowRemoteModels = false; }

const [videoDir, dir] = process.argv.slice(2);
if (!videoDir || !dir) throw new Error("usage: node tts.mjs <video-dir> <out-dir>");
const cfg = JSON.parse(fs.readFileSync(path.join(videoDir, "video.json"), "utf8"));
const VOICE = cfg.voice || "af_heart", SPEED = cfg.speed ?? 1.0;
// Written form -> what the voice should say. Captions keep the written form.
const sayAs = (cfg.sayAs || []).map(([from, to]) => [new RegExp(from, "g"), to]);
const forEar = (t) => sayAs.reduce((s, [re, to]) => s.replace(re, to), t);

const wav = (a, rate) => {
  const n = a.length, b = Buffer.alloc(44 + n * 2);
  b.write("RIFF", 0); b.writeUInt32LE(36 + n * 2, 4); b.write("WAVEfmt ", 8); b.writeUInt32LE(16, 16); b.writeUInt16LE(1, 20);
  b.writeUInt16LE(1, 22); b.writeUInt32LE(rate, 24); b.writeUInt32LE(rate * 2, 28); b.writeUInt16LE(2, 32); b.writeUInt16LE(16, 34);
  b.write("data", 36); b.writeUInt32LE(n * 2, 40);
  for (let i = 0; i < n; i++) b.writeInt16LE(Math.max(-32768, Math.min(32767, Math.round(a[i] * 32767))), 44 + i * 2);
  return b;
};

const md = fs.readFileSync(path.join(videoDir, "script.md"), "utf8");
const scenes = []; let m; const re = /\*\*(\d+)\. ([^*]+)\*\*[^\n]*\n([^\n]+)/g;
while ((m = re.exec(md))) scenes.push({ n: +m[1], text: m[3].trim() });

fs.mkdirSync(dir, { recursive: true });
const tts = await KokoroTTS.from_pretrained("onnx-community/Kokoro-82M-v1.0-ONNX", { dtype: "q8", device: "cpu" });
const manifest = [];
for (const s of scenes) for (const [i, text] of s.text.split(/(?<=[.!?])\s+/).entries()) {
  const stem = path.join(dir, `s${s.n}-${i}`), spoken = forEar(text);
  const tag = `${VOICE}@${SPEED}|${spoken}`;
  // Reuse a clip only if it was spoken from these exact words, voice and speed.
  if (!(fs.existsSync(stem + ".raw.wav") && fs.existsSync(stem + ".txt") && fs.readFileSync(stem + ".txt", "utf8") === tag)) {
    const audio = await tts.generate(spoken, { voice: VOICE, speed: SPEED });
    fs.writeFileSync(stem + ".raw.wav", wav(audio.audio, audio.sampling_rate));
    fs.writeFileSync(stem + ".txt", tag);
    console.log(`spoken ${s.n}.${i}: ${spoken}`);
  }
  manifest.push({ n: s.n, i, text, raw: stem + ".raw.wav" });
}
fs.writeFileSync(path.join(dir, "manifest.json"), JSON.stringify(manifest));
console.log(`kokoro ${VOICE} speed ${SPEED}: ${manifest.length} sentences`);

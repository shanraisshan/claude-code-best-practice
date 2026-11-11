// Video studio engine: narration -> timeline -> subtitles -> frame-exact render -> MP4.
//   node build.cjs <video-dir> tts               -> narration, timeline, <name>.srt
//   node build.cjs <video-dir> still <sec> <png> -> one frame, for a look
//   node build.cjs <video-dir> video             -> <name>.mp4 (picture + narration)
// A video folder holds script.md (narration), scenes.html.tpl (visuals) and video.json (voice and timing).
// Env: BUILD_DIR (scratch folder, default video-studio/.build/<video>), KOKORO_CACHE (see tts.mjs).
const fs = require("fs"), path = require("path"), { execFileSync, spawn } = require("child_process");
const { pathToFileURL } = require("url");

const [dirArg, mode, a, b] = process.argv.slice(2);
if (!dirArg || !mode) throw new Error("usage: node build.cjs <video-dir> tts | still <sec> <png> | video");
const VIDEO = path.resolve(dirArg);
const CFG = readConfig();
const BUILD = process.env.BUILD_DIR || path.join(__dirname, "..", ".build", path.basename(VIDEO));
const FPS = 30, RATE = 48000, W = 1920, H = 1080;

const run = (cmd, args) => execFileSync(cmd, args, { stdio: ["ignore", "pipe", "pipe"] }).toString();
const dur = (f) => parseFloat(run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", f]));

function readConfig() {
  const c = JSON.parse(fs.readFileSync(path.join(VIDEO, "video.json"), "utf8"));
  return {
    name: c.name || path.basename(VIDEO).replace(/^\d{4}-\d{2}-\d{2}-/, ""),
    gap: c.gap ?? 0.2,                       // silence between sentences
    lead: c.lead || {}, tail: c.tail || {},  // per-scene silence before the first and after the last sentence
    leadDefault: c.leadDefault ?? 0.15, tailDefault: c.tailDefault ?? 0.3,
  };
}

function readScript() {
  const md = fs.readFileSync(path.join(VIDEO, "script.md"), "utf8");
  const scenes = []; let m; const re = /\*\*(\d+)\. ([^*]+)\*\*[^\n]*\n([^\n]+)/g;
  while ((m = re.exec(md))) scenes.push({ n: +m[1], title: m[2].trim(), text: m[3].trim() });
  if (!scenes.length) throw new Error("no scenes found in script.md (expected **1. Title** headings)");
  return scenes;
}

function tts() {
  const scenes = readScript(), dir = path.join(BUILD, "tts");
  fs.mkdirSync(dir, { recursive: true });
  // Kokoro speaks every sentence first (tts.mjs), then this lays the clips out.
  execFileSync("node", [path.join(__dirname, "tts.mjs"), VIDEO, dir], { stdio: "inherit" });
  const manifest = JSON.parse(fs.readFileSync(path.join(dir, "manifest.json"), "utf8"));
  let frame0 = 0;
  for (const s of scenes) {
    s.sentences = s.text.split(/(?<=[.!?])\s+/).map((text, i) => {
      const stem = path.join(dir, `s${s.n}-${i}`), clip = manifest.find((c) => c.n === s.n && c.i === i);
      if (!clip || clip.text !== text) throw new Error(`no voice clip for scene ${s.n} sentence ${i}`);
      // Trim the clip's own silence at both ends so sentence times are exact.
      run("ffmpeg", ["-loglevel", "error", "-y", "-i", clip.raw, "-af",
        `aformat=sample_rates=${RATE}:channel_layouts=mono,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.02,areverse,silenceremove=start_periods=1:start_threshold=-50dB:start_silence=0.04,areverse`,
        "-c:a", "pcm_s16le", stem + ".wav"]);
      return { text, wav: stem + ".wav", dur: dur(stem + ".wav") };
    });
    const lead = CFG.lead[s.n] ?? CFG.leadDefault, tail = CFG.tail[s.n] ?? CFG.tailDefault;
    let t = lead;
    for (const [i, x] of s.sentences.entries()) {
      x.start = +t.toFixed(4); x.end = +(t + x.dur).toFixed(4);
      t = x.end + (i < s.sentences.length - 1 ? CFG.gap : 0);
    }
    s.frames = Math.ceil((t + tail) * FPS); s.dur = s.frames / FPS;
    s.startFrame = frame0; s.t0 = frame0 / FPS; frame0 += s.frames;
    // Scene audio, exactly s.frames / FPS long.
    const pcm = Buffer.alloc(Math.round(s.dur * RATE) * 2);
    for (const x of s.sentences) {
      const raw = path.join(dir, "tmp.pcm");
      run("ffmpeg", ["-loglevel", "error", "-y", "-i", x.wav, "-f", "s16le", "-ac", "1", "-ar", String(RATE), raw]);
      fs.readFileSync(raw).copy(pcm, Math.round(x.start * RATE) * 2); fs.rmSync(raw);
    }
    s.pcm = pcm;
  }
  const all = Buffer.concat(scenes.map((s) => s.pcm));

  // One gain for the whole narration, peaks under about -1.5 dB. Written as stereo WAV.
  let peak = 0; for (let i = 0; i < all.length; i += 2) peak = Math.max(peak, Math.abs(all.readInt16LE(i)));
  const gain = Math.min(0.84 / (peak / 32768), 4);
  const out = Buffer.alloc(all.length * 2);
  for (let i = 0, j = 0; i < all.length; i += 2, j += 4) {
    const v = Math.max(-32768, Math.min(32767, Math.round(all.readInt16LE(i) * gain)));
    out.writeInt16LE(v, j); out.writeInt16LE(v, j + 2);
  }
  const h = Buffer.alloc(44);
  h.write("RIFF", 0); h.writeUInt32LE(36 + out.length, 4); h.write("WAVEfmt ", 8); h.writeUInt32LE(16, 16);
  h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(RATE, 24); h.writeUInt32LE(RATE * 4, 28);
  h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write("data", 36); h.writeUInt32LE(out.length, 40);
  fs.writeFileSync(path.join(BUILD, "narration.wav"), Buffer.concat([h, out]));

  // Mouth: one level (0-5) per frame from the loudness of the narration in that frame.
  const rms = [], perFrame = RATE / FPS, n = all.length / 2;
  for (let f = 0; f < frame0; f++) {
    const lo = Math.round(f * perFrame), hi = Math.min(Math.round((f + 1) * perFrame), n);
    let sum = 0; for (let i = lo; i < hi; i++) { const v = all.readInt16LE(i * 2) / 32768; sum += v * v; }
    rms.push(Math.sqrt(sum / Math.max(1, hi - lo)));
  }
  const voiced = rms.filter((r) => r > 0.002).sort((x, y) => x - y), p90 = voiced[Math.floor(voiced.length * 0.9)];
  const mouth = rms.map((r) => (r < 0.002 ? 0 : Math.max(1, Math.min(5, Math.round((r / p90) * 5)))));

  // Captions: one cue per sentence, at most two lines of 42 characters.
  const wrap = (t) => {
    if (t.length <= 42) return t;
    let best = null; const w = t.split(" ");
    for (let i = 1; i < w.length; i++) {
      const x = w.slice(0, i).join(" "), y = w.slice(i).join(" ");
      if (x.length <= 42 && y.length <= 42) { const d = Math.abs(x.length - y.length); if (!best || d < best.d) best = { d, v: x + "\n" + y }; }
    }
    if (!best) throw new Error("caption too long, split the sentence: " + t);
    return best.v;
  };
  const cues = [];
  for (const s of scenes) for (const x of s.sentences) cues.push({ a: s.t0 + x.start, b: s.t0 + x.end, text: wrap(x.text) });
  const stamp = (t) => { const ms = Math.round(t * 1000), p = (v, l = 2) => String(v).padStart(l, "0");
    return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`; };
  fs.writeFileSync(path.join(VIDEO, CFG.name + ".srt"),
    cues.map((c, i) => `${i + 1}\n${stamp(c.a)} --> ${stamp(c.b)}\n${c.text}\n`).join("\n"));

  for (const s of scenes) { delete s.pcm; for (const x of s.sentences) delete x.wav; }
  fs.writeFileSync(path.join(BUILD, "timeline.json"), JSON.stringify({ fps: FPS, frames: frame0, scenes, cues, mouth }));
  console.log(`gain ${gain.toFixed(2)}, ${(frame0 / FPS).toFixed(2)} s, ${frame0} frames, ${cues.length} cues`);
  for (const s of scenes) console.log(s.n, s.title.padEnd(22), s.dur.toFixed(2), s.sentences.map((x) => x.dur.toFixed(2)).join(" "));
}

function makePage() {
  const tl = fs.readFileSync(path.join(BUILD, "timeline.json"), "utf8");
  const html = fs.readFileSync(path.join(VIDEO, "scenes.html.tpl"), "utf8").replace("__TL__", tl);
  const out = path.join(BUILD, "page.html");
  fs.writeFileSync(out, html);
  return out;
}

async function open() {
  const { chromium } = require("playwright");
  // Uses the installed Google Chrome, so no Playwright browser download is needed.
  const browser = await chromium.launch({ channel: "chrome", headless: true });
  const page = await browser.newPage({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  page.on("pageerror", (e) => { console.error("PAGE ERROR", e.message); process.exit(1); });
  await page.goto(pathToFileURL(makePage()).href);
  await page.evaluate(() => window.READY);
  return { browser, page };
}

async function still(sec, png) {
  const { browser, page } = await open();
  await page.evaluate((f) => window.render(f), Math.round(parseFloat(sec) * FPS));
  await page.screenshot({ path: png });
  await browser.close();
}

async function video() {
  const tl = JSON.parse(fs.readFileSync(path.join(BUILD, "timeline.json"), "utf8"));
  const { browser, page } = await open();
  const outFile = path.join(VIDEO, CFG.name + ".mp4");
  const ff = spawn("ffmpeg", ["-loglevel", "error", "-y",
    "-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-",
    "-i", path.join(BUILD, "narration.wav"), "-map", "0:v:0", "-map", "1:a:0",
    "-vf", "scale=out_color_matrix=bt709:out_range=tv:flags=lanczos+accurate_rnd+full_chroma_int,format=yuv420p",
    "-c:v", "libx264", "-preset", "medium", "-crf", "17",
    "-x264-params", "aq-mode=3:colorprim=bt709:transfer=bt709:colormatrix=bt709",
    "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709", "-r", String(FPS), "-fps_mode", "cfr",
    "-c:a", "aac", "-b:a", "160k", "-ar", String(RATE), "-movflags", "+faststart", "-tag:v", "avc1", outFile],
    { stdio: ["pipe", "inherit", "inherit"] });
  const done = new Promise((res, rej) => ff.on("close", (c) => (c ? rej(new Error("ffmpeg exit " + c)) : res())));
  const started = Date.now();
  for (let f = 0; f < tl.frames; f++) {
    await page.evaluate((f) => window.render(f), f);
    const buf = await page.screenshot({ type: "png" });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once("drain", r));
    if (f % 90 === 0) console.log(`frame ${f}/${tl.frames}`);
  }
  ff.stdin.end(); await done; await browser.close();
  console.log(`wrote ${outFile} in ${((Date.now() - started) / 1000).toFixed(0)} s`);
}

fs.mkdirSync(BUILD, { recursive: true });
(async () => {
  if (mode === "tts") tts();
  else if (mode === "still") await still(a, b);
  else if (mode === "video") await video();
  else throw new Error("unknown mode: " + mode);
})().catch((e) => { console.error(e); process.exit(1); });

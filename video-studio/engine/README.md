# Video studio engine

Makes short narrated videos with the pixel Claude mascot: a local Kokoro voice, burned-in subtitles, a mouth that follows the voice, and scenes rendered frame by frame from HTML.

## Pipeline

```
script.md ──► tts.mjs (Kokoro) ──► build.cjs tts ──► timeline.json + narration.wav + <name>.srt
                                                          │
scenes.html.tpl ◄─────────────── window.render(frame) ◄───┘
        │
        └──► build.cjs video ──► headless Chrome (Playwright) ──► ffmpeg ──► <name>.mp4
```

- **Voice:** each sentence is spoken separately, trimmed of silence and measured, so scene animations can be timed to the words.
- **Mouth:** one level per frame from the narration's loudness, so the mascot only talks while the voice does.
- **Render:** the page draws any frame from the frame number alone, so every render is identical.

## Setup

Needs Node 20+, ffmpeg and Google Chrome.

```bash
cd video-studio/engine && npm install
```

The Kokoro model (about 90 MB) downloads on the first run. To stay offline, point `KOKORO_CACHE` at a folder that already holds `onnx-community/Kokoro-82M-v1.0-ONNX`.

## Make a video

1. Create `video-studio/<yyyy-mm-dd>-<slug>/` with:
   - `script.md`: one `**N. Scene title** (visual notes)` heading per scene, with the narration on the next line
   - `video.json`: voice, speed, per-scene timing and pronunciation fixes (copy an existing one)
   - `scenes.html.tpl`: the visuals; it must define `window.READY` and `window.render(frame)` and read the timeline from `__TL__`
2. Build from the video folder:

```bash
node ../engine/build.cjs . tts                       # narration, timeline, subtitles
node ../engine/build.cjs . still 3.5 /tmp/frame.png  # check one frame
node ../engine/build.cjs . video                     # render the MP4
```

Scratch files go to `video-studio/.build/<video>/` (git-ignored). The MP4 and SRT are written into the video folder.

## video.json

| Field | Meaning |
|---|---|
| `name` | Output file name (default: folder name without the date) |
| `voice`, `speed` | Kokoro voice and speed, for example `af_heart` and `1.08` |
| `gap` | Silence between sentences, in seconds |
| `lead`, `tail` | Per-scene silence before the first and after the last sentence, keyed by scene number |
| `leadDefault`, `tailDefault` | Used for scenes not listed in `lead` or `tail` |
| `sayAs` | `[regex, spoken]` pairs, for example `["\\$200", "two hundred dollars"]`; subtitles keep the written form |

## Videos

| Video | Length |
|---|---|
| [2026-11-11-weekly-limit-reset-tip](../2026-11-11-weekly-limit-reset-tip/script.md) | 19.5 s |

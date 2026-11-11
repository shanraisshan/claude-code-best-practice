<!doctype html>
<html><head><meta charset="utf-8"><title>Limit tips</title>
<style>
/* Light theme. --fg is the main text colour on the page background. */
:root{
  --bg:#F4F1EA; --fg:#1F1E1D; --muted:#77716A; --orange:#E07C4C; --orange2:#C25E30; --cream:#FFFDF8;
  --card:#FFFFFF; --ink:#1F1E1D; --ink2:#6B675F; --line:#E7E2D8; --red:#E5484D; --blue:#3B82F6; --green:#2E9E5B;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:1920px;height:1080px;overflow:hidden;background:var(--bg)}
body{font-family:-apple-system,BlinkMacSystemFont,"SF Pro Display","Helvetica Neue",Arial,sans-serif;color:var(--fg);position:relative;
  background:radial-gradient(1200px 800px at 30% 40%,#FBF9F4 0%,var(--bg) 70%)}
#dots{position:absolute;inset:0;background-image:radial-gradient(rgba(31,30,29,.09) 1.5px,transparent 1.6px);background-size:36px 36px}
.abs{position:absolute}
.scene{position:absolute;inset:0}
#mark{left:64px;top:44px;display:flex;align-items:center;gap:14px;font-size:24px;font-weight:600;color:var(--muted);letter-spacing:.2px}
#mark i{width:18px;height:18px;background:var(--orange);display:block}
#mascot{position:absolute;z-index:5}
#mascot svg{width:100%;height:100%;overflow:visible;display:block}
#body rect{fill:var(--orange)}
#body rect.k{fill:#000}
.kicker{font-size:28px;font-weight:700;letter-spacing:4px;color:var(--orange2);text-transform:uppercase}
.title{font-weight:800;color:var(--fg);letter-spacing:-1.5px;line-height:1.04}
.crumb{display:inline-flex;align-items:center;gap:10px;font-size:26px;font-weight:600;color:var(--fg);background:#fff;border:1px solid var(--line);padding:10px 18px;border-radius:12px;box-shadow:0 4px 14px rgba(60,40,20,.06)}
.crumb b{color:var(--orange2)}

/* scene 1 */
#bubble{left:640px;top:150px;background:var(--ink);color:#fff;font-size:40px;font-weight:800;padding:18px 30px;border-radius:18px;transform-origin:0% 100%}
#bubble:after{content:"";position:absolute;left:34px;bottom:-18px;border:18px solid transparent;border-top-color:var(--ink);border-bottom:0;border-left:0}
#s1k{left:980px;top:290px}
#s1t{left:980px;top:340px;width:860px;font-size:124px}
#s1bar{left:984px;top:640px;display:flex;align-items:center;gap:22px;font-size:28px;color:var(--muted)}
#s1bar .bar{width:420px;height:16px;border-radius:8px;background:rgba(31,30,29,.09);overflow:hidden}
#s1bar .bar i{display:block;height:100%;width:100%;background:var(--red);border-radius:8px}
#s1bar b{color:var(--red);font-weight:700}
.tip{left:984px;display:flex;align-items:center;gap:22px;font-size:46px;font-weight:700;color:var(--fg)}
.tip span{width:58px;height:58px;background:var(--orange);color:#fff;display:flex;align-items:center;justify-content:center;font-size:34px;font-weight:800}
#tip1{top:730px} #tip2{top:812px}

/* scenes 2 and 3: left column */
.lk{left:104px;top:200px}
.lt{left:100px;top:248px;width:600px;font-size:92px}
.lc{left:104px;top:470px}

/* settings cards */
.card{left:800px;top:120px;width:1020px;background:var(--card);color:var(--ink);border-radius:24px;border:1px solid var(--line);box-shadow:0 24px 70px rgba(60,40,20,.14);overflow:hidden}
.head{display:flex;align-items:center;justify-content:space-between;padding:26px 44px;border-bottom:1px solid var(--line);font-size:26px;color:var(--ink2)}
.head b{color:var(--ink);font-weight:700}
.head .x{font-size:30px;color:var(--ink2)}
.body{padding:20px 44px 34px}
.sec{display:flex;justify-content:space-between;align-items:baseline;margin:22px 0 6px}
.sec b{font-size:32px;font-weight:700}
.sec span{font-size:24px;color:var(--ink2)}
.row{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:20px 0;border-top:1px solid var(--line)}
.row:first-of-type{border-top:0}
.row h4{font-size:28px;font-weight:700}
.row p{font-size:22px;color:var(--ink2);margin-top:4px}
.btn{font-size:24px;font-weight:600;background:#EFECE4;border-radius:12px;padding:14px 22px;white-space:nowrap;color:var(--ink)}
.status{font-size:30px;font-weight:700;padding:14px 0 6px}
.usage{display:flex;align-items:center;gap:26px;padding:16px 0 18px}
.usage .lbl{width:180px}
.usage .lbl h4{font-size:26px;font-weight:600}
.usage .lbl p{font-size:20px;color:var(--ink2)}
.usage .bar{flex:1;height:14px;border-radius:7px;background:#E9E5DC;overflow:hidden}
.usage .bar i{display:block;height:100%;border-radius:7px}
.usage .pct{width:150px;text-align:right;font-size:24px;color:var(--ink2)}
#hl1{position:absolute;border:4px solid var(--orange);border-radius:18px;box-shadow:0 0 0 8px rgba(224,124,76,.18);pointer-events:none}
#cursor{position:absolute;width:44px;height:44px;z-index:3}
#ripple{position:absolute;width:20px;height:20px;border-radius:50%;border:4px solid var(--orange);z-index:2}
.chip{font-size:22px;font-weight:700;color:var(--green);background:#E3F4EA;border-radius:999px;padding:8px 18px}
.money{font-size:72px;font-weight:800;letter-spacing:-2px;color:var(--ink);font-variant-numeric:tabular-nums}
.plans{display:flex;gap:20px;padding:18px 0 6px}
.plan{flex:1;border:3px solid var(--line);border-radius:16px;padding:16px 22px;display:flex;justify-content:space-between;align-items:baseline}
.plan b{font-size:28px} .plan span{font-size:26px;color:var(--ink2);font-weight:600}
.foot{margin-top:18px;font-size:22px;color:var(--ink2);border-radius:12px;padding:14px 18px;background:#F1EEE6}
.coin{position:absolute;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#FFE08A,#E9A93A 60%,#C9831C);border:3px solid #A8670E;
  color:#7A4A05;font-size:22px;font-weight:900;display:flex;align-items:center;justify-content:center;z-index:6}

/* scene 4 */
#s4t{left:0;width:1920px;top:590px;text-align:center;font-size:118px}
#s4l{left:0;width:1920px;top:742px;text-align:center;font-size:42px;font-weight:700;color:var(--orange2)}
#s4f{left:0;width:1920px;top:812px;text-align:center;font-size:26px;color:var(--muted)}
#s4g{left:0;width:1920px;top:868px;text-align:center;font-size:28px;font-weight:600;color:var(--fg)}

#sub{position:absolute;left:0;width:1920px;bottom:58px;display:flex;justify-content:center;z-index:10}
#sub span{max-width:1500px;text-align:center;font-size:44px;font-weight:600;line-height:1.25;color:#fff;background:rgba(31,30,29,.86);padding:10px 28px;border-radius:14px;white-space:pre-line}
</style></head>
<body>
<div id="dots"></div>
<div id="mark" class="abs"><i></i>claude-code-best-practice</div>

<!-- Pixel Claude, geometry from !/claude-speaking.svg and !/claude-jumping.svg. Animated per frame by render(). -->
<div id="mascot"><svg viewBox="0 0 100 90" shape-rendering="crispEdges">
  <ellipse id="shadow" cx="50" cy="82" rx="22" ry="5" fill="#3C2A1E" opacity=".16"/>
  <g id="body">
    <rect id="earL" x="22" y="10" width="8" height="14"/>
    <rect id="earR" x="70" y="10" width="8" height="14"/>
    <rect x="18" y="24" width="64" height="4"/>
    <rect x="14" y="28" width="72" height="32"/>
    <rect id="eyeL" class="k" x="30" y="34" width="8" height="10"/>
    <rect id="eyeR" class="k" x="62" y="34" width="8" height="10"/>
    <rect id="mouth" class="k" x="44" y="50" width="12" height="6"/>
    <rect id="armL" x="2" y="40" width="12" height="8"/>
    <rect id="armR" x="86" y="40" width="12" height="8"/>
    <rect x="24" y="60" width="12" height="14"/>
    <rect x="64" y="60" width="12" height="14"/>
  </g>
</svg></div>

<!-- 1. Hello -->
<div class="scene" id="s1">
  <div id="bubble" class="abs">Hi Claudians!</div>
  <div id="s1k" class="abs kicker">2 tips · Claude plans</div>
  <div id="s1t" class="abs title">Weekly limit hit?</div>
  <div id="s1bar" class="abs">This week <div class="bar"><i></i></div><b>100% used</b></div>
  <div id="tip1" class="abs tip"><span>1</span>Free limit resets</div>
  <div id="tip2" class="abs tip"><span>2</span>Monthly API credits</div>
</div>

<!-- 2. Free limit resets -->
<div class="scene" id="s2">
  <div class="abs kicker lk" id="s2k">Tip 1 of 2</div>
  <div class="abs title lt" id="s2t">Free limit resets</div>
  <div class="abs lc" id="s2c"><span class="crumb">Settings <b>›</b> Usage</span></div>
  <div class="abs card" id="c1">
    <div class="head"><span>Settings&nbsp;&nbsp;›&nbsp;&nbsp;<b>Usage</b></span><span class="x">✕</span></div>
    <div class="body">
      <div class="status" id="st1">Weekly limit reached</div>
      <div class="usage">
        <div class="lbl"><h4>This week</h4><p>Resets Thursday</p></div>
        <div class="bar"><i id="bar1"></i></div>
        <div class="pct" id="pct1">100% used</div>
      </div>
      <div id="sec1">
        <div class="sec"><b>Limit resets</b><span id="avail">2 available</span></div>
        <div class="row"><div><h4>Weekly reset</h4><p>Refills your whole weekly limit</p></div><div class="btn" id="btnW">Reset for free</div></div>
        <div class="row"><div><h4>Fable reset</h4><p>Gives back what Fable models used this week</p></div><div class="btn">Reset for free</div></div>
      </div>
    </div>
    <div id="hl1"></div>
    <div id="ripple"></div>
    <svg id="cursor" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15.5 L12.5 22.5 L15.5 21 L12 14 L19 14 Z" fill="#fff" stroke="#111" stroke-width="1.6" stroke-linejoin="round"/></svg>
  </div>
</div>

<!-- 3. Monthly API credits -->
<div class="scene" id="s3">
  <div class="abs kicker lk" id="s3k">Tip 2 of 2</div>
  <div class="abs title lt" id="s3t">Monthly API credits</div>
  <div class="abs lc" id="s3c"><span class="crumb">Settings <b>›</b> Billing</span></div>
  <div class="abs card" id="c2">
    <div class="head"><span>Settings&nbsp;&nbsp;›&nbsp;&nbsp;<b>Billing</b></span><span class="x">✕</span></div>
    <div class="body">
      <div class="sec"><b>API credits</b><span>Claude Platform</span></div>
      <div class="plans">
        <div class="plan" id="pMax"><b>Max</b><span>$100 / mo</span></div>
        <div class="plan" id="pUltra"><b>Ultra</b><span>$200 / mo</span></div>
      </div>
      <div class="row" style="margin-top:12px"><div><h4>Your Console organization</h4><p>Link one in Settings › Billing</p></div><span class="chip">Linked</span></div>
      <div class="row"><div><h4>Monthly credit</h4><p>Refreshes every billing cycle · doesn't roll over</p></div><div class="money" id="money">$0</div></div>
      <div class="foot" id="foot">For the Claude API, Agent SDK and Managed Agents · not for Claude Code plan usage</div>
    </div>
  </div>
  <div id="coins"></div>
</div>

<!-- 4. Close -->
<div class="scene" id="s4">
  <div id="s4t" class="abs title">Use it or lose it.</div>
  <div id="s4l" class="abs">Settings › Usage&nbsp;&nbsp;&amp;&nbsp;&nbsp;Settings › Billing</div>
  <div id="s4f" class="abs">Limit resets vary by plan · API credits: Max $100, Ultra $200 per month</div>
  <div id="s4g" class="abs">★ github.com/shanraisshan/claude-code-best-practice</div>
</div>

<div id="sub"><span id="subt"></span></div>

<script>
const TL = __TL__;
const FPS = TL.fps, SC = TL.scenes;
const $ = (id) => document.getElementById(id);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, k) => a + (b - a) * k;
const eout = (x) => 1 - Math.pow(1 - clamp(x), 3);
const ease = (x) => { x = clamp(x); return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
const back = (x) => { x = clamp(x); const c1 = 1.9, c3 = c1 + 1; return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2); };
// Scene-local time of sentence i: its start, plus a share of its length, plus an offset in seconds.
const T = (k, i, off = 0, share = 0) => { const x = SC[k].sentences[i]; return x.start + share * (x.end - x.start) + off; };
function show(el, lt, tIn, dur = .45, dy = 26) {
  const k = eout((lt - tIn) / dur); el.style.opacity = k; el.style.transform = `translateY(${(1 - k) * dy}px)`; return k;
}
function mix(c1, c2, k) {
  const h = (c) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16)), a = h(c1), b = h(c2);
  return `rgb(${a.map((v, i) => Math.round(lerp(v, b[i], k))).join(",")})`;
}
// Seeded random, so every render of a frame is identical.
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// Mascot layouts per scene: centre x, centre y, width in px.
const LAYOUT = [[560, 520, 560], [380, 735, 300], [380, 735, 300], [960, 360, 360]];
const COINS = []; const R = rng(7);
for (let i = 0; i < 16; i++) {
  const el = document.createElement("div"); el.className = "coin"; el.textContent = "$"; $("coins").appendChild(el);
  COINS.push({ el, d: i * 0.06, vx: (R() * 2 - 1) * 520, vy: -(520 + R() * 420), spin: (R() * 2 - 1) * 540 });
}
let BTN, MONEY;
window.READY = document.fonts.ready.then(() => {
  const c1 = $("c1").getBoundingClientRect(), b = $("btnW").getBoundingClientRect(), s = $("sec1").getBoundingClientRect();
  BTN = { x: b.left - c1.left + b.width / 2, y: b.top - c1.top + b.height / 2 };
  Object.assign($("hl1").style, { left: (s.left - c1.left - 18) + "px", top: (s.top - c1.top - 16) + "px", width: (s.width + 36) + "px", height: (s.height + 30) + "px" });
  const m = $("money").getBoundingClientRect(); MONEY = { x: m.left + m.width / 2, y: m.top + m.height / 2 };
  return true;
});

function sceneAt(t) { let k = 0; for (let i = 0; i < SC.length; i++) if (t >= SC[i].t0) k = i; return k; }

function mascot(t, f, k) {
  const lt = t - SC[k].t0;
  // Position: glide from the previous scene's layout.
  let L = LAYOUT[k];
  if (k > 0) { const p = ease((lt + 0.15) / 0.7); L = LAYOUT[k - 1].map((v, i) => lerp(v, L[i], p)); }
  const [x, y, w] = L, el = $("mascot");
  el.style.left = (x - w / 2) + "px"; el.style.top = (y - w * 0.45) + "px"; el.style.width = w + "px"; el.style.height = (w * 0.9) + "px";

  let by = -1.6 * Math.sin(2 * Math.PI * t / 0.9), jy = 0, sx = 1, sy = 1, aL = 0, aR = 0, sh = 1;
  const ear = 5 * Math.sin(2 * Math.PI * t / 0.9);
  const jump = (p) => { p = clamp(p); jy = -18 * Math.sin(Math.PI * p); sy = 1 + 0.07 * Math.sin(Math.PI * p); sx = 1 / sy; sh = 1 - 0.55 * Math.sin(Math.PI * p); by = 0; };

  if (k === 0 && lt < T(0, 0, 0.25, 1)) aR = -(35 + 22 * Math.sin(2 * Math.PI * 2.6 * lt));           // wave hello
  if (k === 1) { const c = T(1, 2, 0.55); if (lt > c && lt < c + 0.5) { jump((lt - c) / 0.5); aL = 30; aR = -30; } } // hop on reset
  if (k === 2) { const c = T(2, 1, 0); if (lt > c && lt < c + 2.9) { const a = 32 + 10 * Math.sin(2 * Math.PI * 3 * lt); aL = a; aR = -a; } } // arms up for coins
  if (k === 3) { const c = T(3, 1, 0.05, 1); if (lt > c) { const p = ((lt - c) % 0.5) / 0.5; jump(p); const a = 25 * Math.sin(2 * Math.PI * p); aL = a; aR = -a; } }

  $("body").setAttribute("transform", `translate(0 ${by + jy}) translate(50 74) scale(${sx} ${sy}) translate(-50 -74)`);
  $("shadow").setAttribute("transform", `translate(50 82) scale(${sh} 1) translate(-50 -82)`);
  $("earL").setAttribute("transform", `rotate(${-ear} 26 24)`); $("earR").setAttribute("transform", `rotate(${ear} 74 24)`);
  $("armL").setAttribute("transform", `rotate(${aL} 14 44)`); $("armR").setAttribute("transform", `rotate(${aR} 86 44)`);
  const m = TL.mouth[f] || 0, mh = m === 0 ? 2 : 2 + m * 1.6;
  $("mouth").setAttribute("height", mh); $("mouth").setAttribute("y", 53 - mh / 2);
  const blink = ((t + 0.8) % 3.1) < 0.12, eh = blink ? 2 : 10, ey = blink ? 38 : 34;
  for (const id of ["eyeL", "eyeR"]) { $(id).setAttribute("height", eh); $(id).setAttribute("y", ey); }
}

function scene1(lt) {
  const b = $("bubble"), bi = back((lt - T(0, 0, -0.15)) / 0.4), bo = 1 - clamp((lt - T(1, 0, 0.1)) / 0.25);
  b.style.opacity = clamp(bi) * bo; b.style.transform = `scale(${0.6 + 0.4 * bi})`;
  show($("s1k"), lt, 0.05);
  show($("s1t"), lt, T(0, 1, -0.12), .5, 40);
  const bk = show($("s1bar"), lt, T(0, 1, 0.3));
  $("s1bar").querySelector("i").style.opacity = 0.88 + 0.12 * Math.sin(lt * 9) * bk;
  show($("tip1"), lt, T(0, 2, -0.05), .4, 30);
  show($("tip2"), lt, T(0, 2, 0.25), .4, 30);
}

function settingsCard(card, lt) {
  const k = eout((lt - 0.05) / 0.55);
  card.style.opacity = k; card.style.transform = `translateY(${(1 - k) * 60}px) scale(${0.97 + 0.03 * k})`;
}

function scene2(lt) {
  show($("s2k"), lt, 0.0); show($("s2t"), lt, 0.08, .5, 34); show($("s2c"), lt, 0.25);
  settingsCard($("c1"), lt);
  // Highlight the Limit resets section while "You may have a free limit reset" is spoken.
  const hl = eout((lt - T(1, 1, -0.05)) / 0.3) * (1 - clamp((lt - T(1, 2, 0.45)) / 0.3));
  $("hl1").style.opacity = hl;
  // Cursor glides to Reset for free and clicks.
  const cIn = T(1, 2, -0.35), cAt = T(1, 2, 0.4), click = T(1, 2, 0.5);
  const cu = $("cursor"), p = ease((lt - cIn) / (cAt - cIn));
  cu.style.left = lerp(BTN.x + 260, BTN.x - 6, p) + "px"; cu.style.top = lerp(BTN.y + 230, BTN.y - 4, p) + "px";
  cu.style.opacity = clamp((lt - cIn) / 0.15) * (1 - clamp((lt - T(1, 2, 1.6)) / 0.3));
  const press = lt > click && lt < click + 0.14;
  const btn = $("btnW"); btn.style.transform = press ? "scale(.92)" : "none";
  const used = lt > click + 0.05;
  btn.textContent = used ? "Used ✓" : "Reset for free"; btn.style.color = used ? "#6B675F" : "#1F1E1D";
  $("avail").textContent = used ? "1 available" : "2 available";
  const rp = (lt - click) / 0.5, rip = $("ripple");
  rip.style.opacity = rp > 0 && rp < 1 ? 1 - rp : 0; const rs = 20 + 90 * eout(rp);
  Object.assign(rip.style, { width: rs + "px", height: rs + "px", left: (BTN.x - rs / 2) + "px", top: (BTN.y - rs / 2) + "px" });
  // The bar drains from 100% to 0% and turns from red to blue.
  const d = ease((lt - (click + 0.1)) / 0.9), pct = Math.round(100 * (1 - d));
  const bar = $("bar1"); bar.style.width = (100 - 100 * d) + "%"; bar.style.background = mix("#E5484D", "#3B82F6", d);
  bar.style.opacity = d > 0 ? 1 : 0.88 + 0.12 * Math.sin(lt * 9);
  $("pct1").textContent = pct + "% used";
  const st = $("st1"); st.textContent = d > 0.5 ? "Back to full. Keep going!" : "Weekly limit reached"; st.style.color = d > 0.5 ? "#2E9E5B" : "#E5484D";
}

function scene3(lt) {
  show($("s3k"), lt, 0.0); show($("s3t"), lt, 0.08, .5, 34); show($("s3c"), lt, 0.25);
  settingsCard($("c2"), lt);
  const hp = eout((lt - T(2, 0, -0.05, 0.12)) / 0.3);
  for (const id of ["pMax", "pUltra"]) { $(id).style.borderColor = mix("#E7E2D8", "#E07C4C", hp); }
  const hf = eout((lt - T(2, 0, 0, 0.6)) / 0.3);
  $("foot").style.background = mix("#F1EEE6", "#FBE3D6", hf); $("foot").style.color = mix("#6B675F", "#1F1E1D", hf);
  // Counter $0 -> $200, then coins.
  const c0 = T(2, 1, 0), v = Math.round(200 * eout((lt - c0) / 1.3));
  const money = $("money"); money.textContent = "$" + v;
  const pop = lt > c0 + 1.3 ? 1 + 0.08 * Math.sin(Math.PI * clamp((lt - c0 - 1.3) / 0.35)) : 1;
  money.style.transform = `scale(${pop})`; money.style.color = v === 200 ? "#C2562A" : "#1F1E1D";
  for (const c of COINS) {
    const age = lt - (c0 + 1.2 + c.d);   // burst as the counter lands on $200, so the count stays readable
    if (age < 0 || age > 1.7) { c.el.style.opacity = 0; continue; }
    const x = MONEY.x + c.vx * age, y = MONEY.y + c.vy * age + 0.5 * 1900 * age * age;
    c.el.style.opacity = 1 - clamp((age - 1.2) / 0.5);
    c.el.style.transform = `translate(${x - 20}px, ${y - 20}px) rotate(${c.spin * age}deg)`;
  }
}

function scene4(lt) {
  const t = $("s4t"), k = back((lt - T(3, 0, -0.1)) / 0.5);
  t.style.opacity = clamp((lt - T(3, 0, -0.1)) / 0.25); t.style.transform = `scale(${0.7 + 0.3 * k})`;
  show($("s4l"), lt, T(3, 1, -0.1));
  show($("s4f"), lt, T(3, 1, 0.25));
  show($("s4g"), lt, T(3, 1, 0.45));
}

function subtitle(t) {
  let text = "", op = 0;
  TL.cues.forEach((c, i) => {
    const next = TL.cues[i + 1], end = next && next.a - c.b < 0.4 ? next.a : c.b + 0.25;
    if (t >= c.a - 0.05 && t < end) { text = c.text; op = 1; }
  });
  const s = $("subt"); s.textContent = text; s.style.opacity = op; s.style.display = text ? "inline-block" : "none";
}

window.render = (f) => {
  const t = f / FPS, k = sceneAt(t);
  SC.forEach((s, i) => {
    const fin = i === 0 ? 1 : clamp((t - (s.t0 - 0.2)) / 0.3);
    const fout = i === SC.length - 1 ? 1 : 1 - clamp((t - (s.t0 + s.dur - 0.25)) / 0.25);
    const el = $("s" + (i + 1)); el.style.opacity = fin * fout; el.style.visibility = fin * fout > 0 ? "visible" : "hidden";
  });
  mascot(t, f, k);
  scene1(t - SC[0].t0); scene2(t - SC[1].t0); scene3(t - SC[2].t0); scene4(t - SC[3].t0);
  subtitle(t);
  return f;
};
</script>
</body></html>

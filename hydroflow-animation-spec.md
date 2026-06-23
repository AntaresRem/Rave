# HydroFlow Animation -- Implementation Spec
> Feed this entire document to Claude Code (VS Code extension or terminal).
> It covers every animation, timing, scroll mechanic, and section in the order they appear.

---

## Stack

- Vanilla HTML + CSS + JS (no framework required)
- **Three.js r128** via CDN for the 3D can
- **GSAP 3** + **ScrollTrigger plugin** via CDN for all scroll-driven animation
- Google Fonts: `Orbitron` (700, 900) + `Space Grotesk` (400, 500, 700)

```html
<!-- In <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Before </body> -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
```

---

## Visual Design Tokens

```css
:root {
  --bg:           #eeece7;   /* warm off-white, the base page colour */
  --bg-dark:      #0a0a0a;   /* near-black for section 3 */
  --text-primary: #111111;
  --text-muted:   #555555;
  --accent:       #e8683a;   /* orange -- CTA button, "Rotate Hydroflow" button */
  --border:       #cccccc;
  --grid-line:    rgba(0,0,0,0.07);
  --font-display: 'Orbitron', sans-serif;
  --font-body:    'Space Grotesk', sans-serif;
}

/* Grid background -- used on sections 1 and 2 */
.grid-bg {
  background-color: var(--bg);
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-size: 32px 32px;
}
```

---

## Page Structure (HTML skeleton)

```html
<body class="grid-bg">

  <!-- NAV -->
  <nav id="nav">...</nav>

  <!-- SECTION 1: Hero (100vh, scroll container for sticky can) -->
  <section id="hero-section">
    <div id="hero-text-block">
      <h1 id="hero-line1">TOKENIZING</h1>
      <h1 id="hero-line2">HYDRATION</h1>
    </div>
    <div id="hero-sub-block">
      <div class="dashes"></div>
      <p id="hero-sub">PURE.&nbsp; REFRESHING.&nbsp; BLOCKCHAIN-POWERED.</p>
    </div>
    <!-- Three.js canvas lives here, positioned sticky -->
    <canvas id="can-canvas"></canvas>
  </section>

  <!-- TICKER -->
  <div id="ticker">...</div>

  <!-- SECTION 2: Product detail -->
  <section id="product-section" class="grid-bg">
    <div id="product-left">...</div>
    <!-- can canvas moves here conceptually via scroll -->
    <div id="product-center">
      <div id="product-can-frame"><!-- can stays in DOM, CSS positions it --></div>
    </div>
    <div id="product-right">...</div>
  </section>

  <!-- SECTION 3: Dark brand -->
  <section id="brand-section">...</section>

</body>
```

---

## Section 1 -- Hero

### Layout
```css
#hero-section {
  position: relative;
  height: 200vh;          /* tall enough for scroll room */
  overflow: hidden;
}

/* Giant type -- sits behind the can */
#hero-text-block {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  pointer-events: none;
}

#hero-line1,
#hero-line2 {
  font-family: var(--font-display);
  font-size: clamp(72px, 12vw, 140px);
  font-weight: 900;
  color: var(--text-primary);
  line-height: 0.9;
  letter-spacing: -0.01em;
  text-transform: uppercase;
  margin: 0;
}

/* Can canvas -- sticky, always centred, above the text */
#can-canvas {
  position: sticky;
  top: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  display: block;
  pointer-events: none;   /* drag handled via JS on the canvas element itself */
}
```

### Three.js Can Setup

Build a cylindrical can in Three.js. Key geometry:

```js
const CAN_RADIUS    = 0.56;
const CAN_HEIGHT    = 2.1;
const SEGMENTS      = 80;

// Body (open-ended cylinder for the label texture)
const bodyGeo = new THREE.CylinderGeometry(CAN_RADIUS, CAN_RADIUS, CAN_HEIGHT, SEGMENTS, 1, true);

// Top taper (closed)
const topGeo  = new THREE.CylinderGeometry(CAN_RADIUS * 0.84, CAN_RADIUS, 0.18, SEGMENTS);

// Top disc / pull-tab platform
const discGeo = new THREE.CylinderGeometry(CAN_RADIUS * 0.55, CAN_RADIUS * 0.55, 0.06, SEGMENTS);

// Pull tab (small disc, offset slightly)
const tabGeo  = new THREE.CylinderGeometry(CAN_RADIUS * 0.28, CAN_RADIUS * 0.28, 0.03, 24);
// position: x=+0.1, y=CAN_HEIGHT/2 + 0.26

// Bottom taper (mirrored top)
const botGeo  = new THREE.CylinderGeometry(CAN_RADIUS, CAN_RADIUS * 0.84, 0.18, SEGMENTS);
```

### Can Label Texture (Canvas 2D)

Paint onto a 512x512 canvas, then pass to `THREE.CanvasTexture`:

```
Background: horizontal silver gradient
  x=0:    #8a9baa
  x=18%:  #c8d4dc
  x=38%:  #e8eef2
  x=50%:  #f4f7f9  (highlight)
  x=62%:  #dce6ec
  x=82%:  #b0bfc8
  x=100%: #8a9baa

Blue tint band (vertical, y=160..340):
  Semi-transparent rgba(160,200,240,0.35) -- fades in/out at top and bottom edges

Text (centred at x=256):
  "HYDROFLOW"   -- bold 38px Arial Black, rgba(20,40,70,0.85), y=230
  "Solana Splash" -- 16px Arial, rgba(30,50,90,0.6), y=262
  "330ml · Zero Sugar" -- 11px Arial, rgba(20,40,70,0.4), y=290

Horizontal accent lines (full-width, fading at edges):
  y=130, height=12, rgba(40,80,140,0.22)
  y=365, height=12, rgba(40,80,140,0.22)

QR code block (bottom centre):
  Filled rect 72x72 at x=220, y=310 with rgba(20,40,70,0.25)
  Random 5x5 grid of 10x10px cells inside it at ~55% fill density
```

### Lighting

```js
// Bright overhead key -- gives the strong top highlight visible on the real can
const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
keyLight.position.set(1, 4, 3);

// Soft blue fill from left
const fillLight = new THREE.DirectionalLight(0xd0e8f8, 1.2);
fillLight.position.set(-3, 1, 2);

// Rim from behind-right
const rimLight = new THREE.DirectionalLight(0xb0c8e0, 1.0);
rimLight.position.set(2, -1, -3);

// Ambient
const ambient = new THREE.AmbientLight(0xd8e8f0, 1.0);

// Floor bounce
const bounce = new THREE.PointLight(0xe8f0f8, 0.6, 8);
bounce.position.set(0, -3, 1);
```

### Camera

```js
const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 50);
camera.position.set(0, 0, 5.2);
```

### Renderer

```js
renderer.setClearColor(0x000000, 0);   // transparent -- bg shows through
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = false;    // not needed, performance gain
```

---

## Page Load Animation (GSAP timeline, fires on DOMContentLoaded)

**What it looks like:** Blank grid page -- only "HYDROFLOW" wordmark centred and very faint. Then elements arrive in sequence.

```
STATE 0 (initial, set with gsap.set before any play):
  - #nav:           opacity 0, y -20
  - #hero-line1:    opacity 0, filter blur(12px), y 30
  - #hero-line2:    opacity 0, filter blur(12px), y 30
  - #hero-sub-block: opacity 0
  - #can-canvas:    opacity 0, y -60  (can drops from above)
  - #ticker:        opacity 0, y 20

WORDMARK PHASE (0s -- 0.6s):
  Show a centred "HYDROFLOW" wordmark div that exists only during load.
  It fades out at t=0.4s as the rest arrives.

MAIN TIMELINE (starts at ~0.3s):
  t=0.0  can drops in:       opacity 0->1, y -60->0,  duration 0.7s, ease "power3.out"
  t=0.2  hero-line1 arrives: opacity 0->1, blur 12->0, y 30->0, duration 0.6s, ease "power2.out"
  t=0.35 hero-line2 arrives: same as line1, staggered 0.15s after
  t=0.5  nav fades in:       opacity 0->1, y -20->0, duration 0.4s
  t=0.6  hero-sub fades in:  opacity 0->1, duration 0.4s
  t=0.7  ticker slides up:   opacity 0->1, y 20->0, duration 0.4s
```

---

## Scroll Animation -- Hero to Product Transition

This is the signature mechanic. Use **GSAP ScrollTrigger** with `scrub: true` pinned to `#hero-section`.

### ScrollTrigger config

```js
gsap.registerPlugin(ScrollTrigger);

const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger:  "#hero-section",
    start:    "top top",
    end:      "bottom bottom",
    scrub:    1.2,           // lag factor -- higher = smoother but slower
    pin:      false,         // we handle sticky ourselves via CSS
  }
});
```

### What animates during hero scroll (0% -> 100% of section height)

```
CAN (Three.js rotation driven by scrollY, NOT GSAP -- see note below):
  rotationX:  0  ->  +1.4 radians   (tilts backward, top comes toward viewer)
  The tilt makes the can go from upright to showing its top face by end of section.
  Also continues slow Y auto-rotation the whole time.

HERO TYPE (via GSAP scrub):
  0%  -> 60%:  #hero-line1 and #hero-line2 stay fully visible
  60% -> 100%: both lines fade: opacity 1 -> 0, filter blur 0 -> 8px
  They scroll at normal page scroll speed (position:sticky handles this).

HERO SUB-BLOCK:
  Fades out opacity 1 -> 0 between 50% and 80% scroll progress.

TICKER:
  Stays fixed at bottom of viewport as hero scrolls (position:sticky bottom:0),
  then becomes static once product section is reached.
```

> **Note on can tilt:** Drive `can.rotation.x` directly from `window.scrollY` in the
> Three.js render loop, NOT via GSAP. This gives smoother control:
>
> ```js
> function onScroll() {
>   const heroEl   = document.getElementById('hero-section');
>   const progress = window.scrollY / heroEl.offsetHeight;  // 0 to 1
>   targetRotX     = progress * 1.4;   // max tilt in radians
> }
> window.addEventListener('scroll', onScroll, { passive: true });
>
> // In render loop, lerp toward target for smooth damping:
> can.rotation.x += (targetRotX - can.rotation.x) * 0.08;
> ```

---

## Section 2 -- Product Detail

### Layout

Three-column grid, light bg with grid lines continuing.

```
LEFT COLUMN (~28% width, right-aligned text):
  Eyebrow:    "Pre-Trade Energy"  (11px, Space Grotesk, muted)
  Name:       "SOLANA\nSPLASH"   (Orbitron 700, ~52px, two lines)
  Size:       "330ml with Zero Sugar" (14px, muted)
  ----
  Label:      "INGREDIENTS"  (11px tracking, muted)
  Ingredients: "Caffeine, Natural Flavor, Magnesium
                Citrate, Sodium Citrate, Stevia Extract"
               (13px Space Grotesk, muted)

CENTRE COLUMN (~44% width):
  Bordered container (1px solid #ccc, slight border-radius).
  The Three.js canvas is repositioned here as the user scrolls into this section.
  Can is now upright again (rotation.x -> 0 as product section enters viewport).

RIGHT COLUMN (~28% width, left-aligned text):
  Eyebrow:   "INTRODUCTION TO DRINK"  (11px tracking, muted)
  Body copy: "Solana Splash by HydroFlow is the world's
              first tokenized energy drink, blending
              cutting-edge blockchain innovation with
              peak performance. Designed for the modern
              trader, Solana Splash combines refreshing
              taste with tokenized transparency,
              redefining how you hydrate and energize."
             (14px Space Grotesk, line-height 1.7)
  CTA:       "Rotate Hydroflow" button -- orange (#e8683a),
              Space Grotesk 600, padding 10px 20px, border-radius 6px.
              On click: trigger a full 360° Y rotation of the can via GSAP:
              gsap.to(can.rotation, { y: can.rotation.y + Math.PI * 2, duration: 1.2, ease: "power2.inOut" })
```

### Can canvas handoff (hero -> product section)

The simplest approach: keep the canvas as `position: fixed` for the entire duration, and update its CSS `top`/`left`/`width`/`height` via ScrollTrigger so it smoothly repositions from the hero centre to the product section centre frame.

```js
ScrollTrigger.create({
  trigger: "#product-section",
  start:   "top 80%",
  end:     "top 20%",
  scrub:   true,
  onUpdate(self) {
    const p = self.progress;
    // Lerp canvas position from hero centre to product centre
    // heroRect and productRect pre-calculated on load
    canvas.style.top    = lerp(heroRect.top,    productRect.top,    p) + "px";
    canvas.style.left   = lerp(heroRect.left,   productRect.left,   p) + "px";
    canvas.style.width  = lerp(heroRect.width,  productRect.width,  p) + "px";
    canvas.style.height = lerp(heroRect.height, productRect.height, p) + "px";
  }
});
```

Simultaneously, can `rotation.x` lerps back toward 0 (upright) as product section enters.

---

## Section 3 -- Dark Brand

```css
#brand-section {
  background: var(--bg-dark);
  color: #ffffff;
  padding: 120px 48px;
  text-align: center;
}
```

```
Eyebrow:   "About HydroFlow Tokenomics"  (11px, Space Grotesk, rgba(255,255,255,0.45), tracking 0.2em)

Headline:  "WELCOME TO HYDROFLOW
            WHERE WATER MEETS
            INNOVATION"
           (Orbitron 900, clamp(48px, 8vw, 96px), white, line-height 0.92)

Body:      14px Space Grotesk, rgba(255,255,255,0.6), max-width 640px, centred, line-height 1.7
```

### Section 3 entrance animation (ScrollTrigger, NOT scrubbed -- plays once)

```js
gsap.from("#brand-section .eyebrow", {
  scrollTrigger: { trigger: "#brand-section", start: "top 75%" },
  opacity: 0, y: 20, duration: 0.5
});
gsap.from("#brand-section .headline", {
  scrollTrigger: { trigger: "#brand-section", start: "top 70%" },
  opacity: 0, y: 40, filter: "blur(10px)",
  duration: 0.8, ease: "power2.out", delay: 0.1
});
gsap.from("#brand-section .body", {
  scrollTrigger: { trigger: "#brand-section", start: "top 65%" },
  opacity: 0, y: 20, duration: 0.5, delay: 0.3
});
```

---

## Ticker Bar

Auto-scrolling logo ticker at the base of the hero section.

```css
#ticker {
  position: sticky;    /* sticks to bottom of viewport as hero scrolls */
  bottom: 0;
  z-index: 20;
  background: var(--bg);
  border-top:    1.5px solid var(--border);
  border-bottom: 1.5px solid var(--border);
  height: 48px;
  overflow: hidden;
}

#ticker-inner {
  display: flex;
  white-space: nowrap;
  animation: ticker-scroll 18s linear infinite;
}

@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }  /* items duplicated so loop is seamless */
}

.tick-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 32px;
  height: 48px;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  border-right: 1.5px solid var(--border);
}
```

Items (duplicated for seamless loop): Chainlink, TRON, BNB, OKX -- repeat twice.

---

## Nav

```css
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 32px;
  background: rgba(238, 236, 231, 0.85);
  backdrop-filter: blur(8px);
}

/* Logo */
.nav-logo {
  font-family: var(--font-display);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--text-primary);
}

/* Links */
.nav-links {
  display: flex;
  gap: 28px;
  font-family: var(--font-body);
  font-size: 13px;
  color: rgba(0,0,0,0.6);
}

/* CTA */
.nav-cta {
  background: var(--accent);
  color: #fff;
  font-family: var(--font-body);
  font-size: 12px;
  font-weight: 600;
  padding: 9px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 0.02em;
}
```

---

## Idle Can Animation (render loop, always on)

The can auto-rotates on Y axis at all times. The drag interaction overrides this temporarily.

```js
// In render loop:
if (!isDragging) {
  can.rotation.y += 0.004;       // constant slow spin
}

// Float up/down:
can.position.y = Math.sin(elapsed * 0.9) * 0.05;
```

### Drag to rotate (mouse + touch)

```js
let isDragging = false;
let lastX = 0;
let velocityX = 0;

canvas.addEventListener('mousedown', e => { isDragging = true; lastX = e.clientX; });
window.addEventListener('mousemove', e => {
  if (!isDragging) return;
  velocityX = (e.clientX - lastX) * 0.014;
  can.rotation.y += velocityX;
  lastX = e.clientX;
});
window.addEventListener('mouseup', () => { isDragging = false; });

// In render loop, apply inertia when not dragging:
if (!isDragging) {
  velocityX *= 0.92;
  can.rotation.y += velocityX;
}
```

---

## File Structure

```
/
├── index.html
├── style.css
├── js/
│   ├── main.js          -- init, page load timeline, scroll triggers
│   ├── can.js           -- Three.js can setup, texture, lighting, render loop
│   └── ticker.js        -- ticker (optional, can inline in main.js)
└── fonts/               -- (optional, if self-hosting Orbitron)
```

---

## Key Implementation Notes for Claude Code

1. **Canvas sizing:** On init and on resize, set `canvas.width` / `canvas.height` to match its CSS dimensions * `devicePixelRatio`. Update `camera.aspect` and call `renderer.setSize()` on resize.

2. **Scroll + render loop coexistence:** The Three.js `requestAnimationFrame` loop reads `window.scrollY` directly each frame. Do NOT use GSAP to drive `can.rotation.x` -- the lerp in the RAF loop is smoother.

3. **Blur filter on hero type:** CSS `filter: blur()` is GPU-accelerated. Use it directly -- do not use SVG filters or canvas blur.

4. **Sticky canvas z-index stacking:** The canvas must sit above `#hero-text-block` (z-index: 10 vs 1) but below the nav (z-index: 100).

5. **ScrollTrigger refresh:** Call `ScrollTrigger.refresh()` after any dynamic content loads or fonts finish loading to recalculate trigger positions.

6. **Mobile:** On viewports < 768px, reduce `CAN_HEIGHT` scene scale by ~0.75, and reduce hero font-size using clamp. The ticker and product section stack vertically.

7. **Performance:** Keep the Three.js scene to ~500 polys total. No shadows. `antialias: true` only if `devicePixelRatio === 1` -- on retina screens it is redundant and costly.

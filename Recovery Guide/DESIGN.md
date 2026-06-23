---
name: Ravevive Core
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9379'
  outline-variant: '#444933'
  surface-tint: '#abd600'
  primary: '#ffffff'
  on-primary: '#283500'
  primary-container: '#c3f400'
  on-primary-container: '#556d00'
  inverse-primary: '#506600'
  secondary: '#ffabf3'
  on-secondary: '#5b005b'
  secondary-container: '#fe00fe'
  on-secondary-container: '#500050'
  tertiary: '#ffffff'
  on-tertiary: '#003737'
  tertiary-container: '#00fbfb'
  on-tertiary-container: '#007070'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c3f400'
  primary-fixed-dim: '#abd600'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3c4d00'
  secondary-fixed: '#ffd7f5'
  secondary-fixed-dim: '#ffabf3'
  on-secondary-fixed: '#380038'
  on-secondary-fixed-variant: '#810081'
  tertiary-fixed: '#00fbfb'
  tertiary-fixed-dim: '#00dddd'
  on-tertiary-fixed: '#002020'
  on-tertiary-fixed-variant: '#004f4f'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 72px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 80px
  stack-sm: 12px
  stack-md: 32px
  stack-lg: 64px
---

## Brand & Style

The design system is built on a "Festival/Rave Core" aesthetic—a high-octane fusion of midnight darkness and pulsating neon energy. It balances the hedonistic vibrancy of the electronic music scene with the clinical authority of a doctor-led recovery formula.

The visual style leverages **Glassmorphism** and **High-Contrast Bold** elements. Surfaces feel like tinted translucent acrylic, illuminated from behind by neon light sources. The UI should evoke the feeling of a premium digital dashboard inside a festival medical tent—cutting-edge, urgent, and impeccably clean. Subtle "glitch" artifacts and kinetic typography should be used to imply movement and high energy, while generous whitespace ensures the scientific/medical information remains legible and trustworthy.

## Colors

The palette is rooted in a deep, void-like neutral to maximize the luminosity of the accent colors. 

- **Primary (Electric Lime):** Used for primary calls to action and critical recovery stats. It signifies energy and replenishment.
- **Secondary (Hot Pink):** Used for "Festival" lifestyle elements and emotive highlights.
- **Tertiary (Cyan):** Used for medical data, hydration metrics, and scientific terminology to provide a cooling, clinical contrast to the warmer neons.
- **Backgrounds:** Use a true black or a 95% charcoal to ensure neon glows do not wash out the UI.

## Typography

This design system utilizes a dual-font strategy to bridge the gap between "Party" and "Provider."

- **Sora (Headlines):** A geometric, futuristic sans-serif with wide apertures. Use this for all marketing claims and high-impact headings. It should feel aggressive and modern.
- **Inter (Body):** A highly legible, systematic sans-serif. Use this for all ingredient lists, doctor-led explanations, and instructional copy. It provides the "Professional" anchor to the brand.
- **JetBrains Mono (Labels):** Used for technical data, nutritional facts, and timestamps. The monospaced nature reinforces the "formulaic" and "scientific" aspect of the product.

## Layout & Spacing

The layout philosophy is **Fluid and Layered**. While adhering to a 12-column grid for alignment, elements should frequently break the grid or overlap to create a sense of depth and three-dimensional space.

- **Dynamic Layering:** Use z-index stacking where glass cards float over large, blurred neon orbs (background gradients).
- **Whitespace:** Use aggressive vertical spacing (`stack-lg`) to separate lifestyle content from scientific data, preventing the UI from feeling "cheap" or cluttered.
- **Mobile-First:** Given the festival context, the layout must prioritize one-handed thumb navigation with large touch targets.

## Elevation & Depth

Hierarchy is achieved through **Luminance and Blur** rather than traditional shadows.

1.  **Base Layer:** Solid black or dark charcoal.
2.  **Atmospheric Layer:** Large, low-opacity neon blurs (150px-300px radius) that act as "light leaks."
3.  **Surface Layer:** Glassmorphic containers with a `16px` backdrop blur, a `1px` semi-transparent white border, and `5%` white fill. 
4.  **Active Layer:** Elements that are "On" or "Active" emit an **Outer Glow** using the primary or secondary color (e.g., `box-shadow: 0 0 15px var(primary)`).

Avoid black shadows; use colored blurs to simulate light emission.

## Shapes

The shape language is "Sleek Industrial." We use **Level 2 (Rounded)** corners (0.5rem / 8px) as the default for most containers to maintain a modern, friendly feel. 

- **Buttons:** Use a more aggressive rounding (Pill-shaped) to distinguish them from content containers.
- **Data Points:** Small technical chips should have a `2px` (Soft) radius to feel more like "bits" of data.
- **Borders:** Always use thin `1px` strokes for glass containers to maintain a sharp, high-definition look.

## Components

- **Primary Buttons:** High-contrast Electric Lime background with black Sora-Bold text. On hover, add a massive outer glow and a 2px vertical shift.
- **Glass Cards:** Backdrop-filter: blur(16px). These are the primary containers for medical info. Use a subtle gradient stroke (Cyan to Transparent) to hint at light hitting the edge.
- **Glitch Indicators:** For alerts or "Energy" states, use a CSS glitch animation on the text or icon, shifting the RGB channels slightly.
- **Input Fields:** Dark, transparent backgrounds with a simple Cyan bottom border that glows when focused.
- **Chips/Badges:** Use JetBrains Mono for the text. These should look like laboratory tags or technical metadata labels.
- **Progress Bars:** For hydration tracking, use a neon gradient fill (Cyan to Lime) with a "pulsing" animation at the leading edge.
---
name: Luminous Noir
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#444748'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#747878'
  outline-variant: '#c4c7c7'
  surface-tint: '#5f5e5e'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#1c1b1b'
  on-primary-container: '#858383'
  inverse-primary: '#c8c6c5'
  secondary: '#9600c9'
  on-secondary: '#ffffff'
  secondary-container: '#bc00fb'
  on-secondary-container: '#fffbff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#1c153f'
  on-tertiary-container: '#867eae'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c8c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474746'
  secondary-fixed: '#f9d8ff'
  secondary-fixed-dim: '#ecb1ff'
  on-secondary-fixed: '#320046'
  on-secondary-fixed-variant: '#75009e'
  tertiary-fixed: '#e6deff'
  tertiary-fixed-dim: '#c9c0f5'
  on-tertiary-fixed: '#1c153f'
  on-tertiary-fixed-variant: '#48416d'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 56px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-mono:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 48px
---

## Brand & Style
The design system embodies a high-contrast, sophisticated aesthetic that blends professional SaaS reliability with a sharp, avant-garde edge. It is designed for luxury tech, high-end creative tools, or premium fintech platforms where precision meets personality. 

The style is **Modern Minimalist with Neon Accents**. It utilizes expansive white space (now pure white) to provide a clinical, premium feel, contrasted against deep, nocturnal tones. The introduction of high-vibrancy purple provides a digital "spark," ensuring the interface feels kinetic and contemporary rather than static. The emotional response should be one of focused clarity, punctuated by moments of intense energy.

## Colors
The palette is anchored by extreme contrast. The primary background is now a clinical **Pure White (#FFFFFF)**, replacing previous organic tones to maximize the "pop" of the accent colors.

- **Deep Dusk (#1A1A1A):** Used for primary text, heavy UI elements, and structural grounding.
- **Neon Purple (#BF00FF):** Our high-vibrancy accent. Used sparingly for critical lettering, active states, and focus highlights to inject an aggressive, modern edge.
- **Warm Lavender (#8E86B7):** A softer secondary tone for sub-headers and secondary actions, bridging the gap between the dark neutrals and the neon purple.
- **Warm Stone (#E2DED9):** Retained for subtle containment, such as secondary card backgrounds or dividers, to prevent the UI from feeling too cold.

## Typography
The typography system relies on the precision of **Hanken Grotesk** for most roles, providing a sharp, contemporary sans-serif feel. **Geist** is introduced for technical labels and monospaced data points to reinforce the "developer-grade" precision of the system.

Use **Neon Purple** specifically for `label-mono` elements or specific keywords within `display-lg` headings to draw immediate visual attention. Large headlines should use tight tracking and heavy weights to create a sense of authority against the white background.

## Layout & Spacing
The layout follows a strict **12-column fluid grid** for desktop and a **4-column grid** for mobile. Spacing is governed by a 8px base unit. 

Generous margins (48px on desktop) are essential to maintain the minimalist "gallery" feel of the design system. Elements should feel intentionally placed with ample breathing room. Use "Warm Stone" for thin (1px) vertical or horizontal lines to delineate sections without breaking the flow of the pure white background.

## Elevation & Depth
This design system avoids traditional heavy shadows in favor of **Tonal Layers and Sharp Outlines**. 

Depth is achieved through:
1.  **Layering:** Placing "Warm Stone" or "Neutral" containers over the "Pure White" base.
2.  **Hard Strokes:** 1px borders in "Deep Dusk" (at 10% opacity) define card boundaries.
3.  **Neon Focus:** Active states do not lift; they glow. Use a subtle outer glow (0px 0px 8px) using "Neon Purple" at 30% opacity to indicate focus or activity on interactive components.

## Shapes
The shape language is **Soft (0.25rem)**. This slight rounding takes the "edge" off the brutalist tendencies of the high-contrast palette, making the professional environment feel more accessible. 

- **Buttons/Inputs:** 4px (0.25rem) radius.
- **Large Cards:** 8px (0.5rem) radius.
- **Icon Enclosures:** 4px (0.25rem) radius or pure squares for a more technical look.

## Components
- **Buttons:** Primary buttons use "Deep Dusk" with white text. Secondary buttons use a "Warm Stone" background. Ghost buttons use "Neon Purple" for text only to signify high-intent actions.
- **Inputs:** Pure white background with a 1px "Warm Stone" border. On focus, the border transitions to "Neon Purple" with a matching 2px bottom-heavy accent.
- **Chips:** Small, rectangular with a 4px radius. Use "Geist" font for text. Active chips should have a "Neon Purple" background with white text.
- **Lists:** Clean rows separated by 1px "Warm Stone" dividers. Hover states should utilize a very faint "Warm Lavender" tint (5% opacity).
- **Cards:** No shadows. Use a 1px border in "Warm Stone". For "Featured" cards, use a top-border accent (3px) in "Neon Purple".
- **Lettering Accents:** Use "Neon Purple" for specific metadata, tags, or hyper-important status indicators to cut through the monochrome layout.
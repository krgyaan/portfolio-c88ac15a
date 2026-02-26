

# Plan: Jolly Roger Favicon/Logo + Ocean Waves + Font Readability Fix

## 1. Straw Hat Jolly Roger SVG

Create an inline SVG component for the Straw Hat crew's Jolly Roger (simplified/original to avoid copyright — skull with crossbones and straw hat silhouette).

**Files:**
- **New: `src/components/ui/JollyRoger.tsx`** — A reusable SVG component (skull + crossbones + straw hat outline) accepting `className` for sizing.
- **Edit: `src/components/layout/Navbar.tsx`** — Add the Jolly Roger as a clickable home link icon before the nav links. Wrap it in a `<Link to="/">`.
- **Edit: `index.html`** — Add a `<link rel="icon">` pointing to a small SVG favicon. We'll create `public/favicon.svg` with the same Jolly Roger graphic.
- **New: `public/favicon.svg`** — Minimal Jolly Roger SVG for the browser tab.

## 2. Ocean Wave Background Animation

Add a subtle, continuously animated wave layer to the page background using CSS pseudo-elements with sine-wave-shaped SVG paths.

**File: `src/index.css`**
- Add a new fixed `div` via the `Layout.tsx` component (since `body::before` and `body::after` are already used for grain and compass).
- Better approach: Add the ocean wave as a dedicated element in `Layout.tsx` — a fixed, full-screen, pointer-events-none div with animated wave SVG paths at the bottom of the viewport.
- Define `@keyframes ocean-wave-1` and `ocean-wave-2` — horizontal translate animations at different speeds for a parallax wave effect.
- Waves will be very low opacity (0.03-0.05) so they're atmospheric, not distracting.

**File: `src/components/layout/Layout.tsx`** — Add the wave background div inside the layout.

## 3. Fix Compact/Tight Text

The issue is that `IM Fell English` is a narrow serif font with tight default spacing. The fix:

**File: `src/index.css`**
- Increase body `line-height` to `1.75` (currently relying on default which is tight for this font).
- Add `letter-spacing: 0.01em` to body text for slightly more breathing room.
- Increase paragraph/body `font-size` slightly — bump the base from the browser default to `16.5px` or use `word-spacing: 0.05em` for better readability.
- For `font-mono` elements (age, timestamps), add `letter-spacing: 0.03em` since monospace at small sizes gets especially cramped.

**File: `tailwind.config.ts`** — No changes needed, CSS-level fix is sufficient.

## Summary of All File Changes

| File | Action |
|---|---|
| `src/components/ui/JollyRoger.tsx` | Create — SVG component |
| `public/favicon.svg` | Create — Jolly Roger favicon |
| `index.html` | Edit — Add favicon link |
| `src/components/layout/Navbar.tsx` | Edit — Add Jolly Roger home link icon |
| `src/index.css` | Edit — Ocean wave keyframes, body line-height/spacing fixes |
| `src/components/layout/Layout.tsx` | Edit — Add ocean wave background element |


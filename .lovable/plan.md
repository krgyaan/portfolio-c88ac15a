

# ONE PIECE Immersive Theme Plan

## Overview

Transform both light and dark themes into a full ONE PIECE-inspired aesthetic. The goal is bold, immersive, and unmistakably pirate-themed while keeping the portfolio professional and readable.

---

## Visual Direction

```text
Light Theme: "Marine HQ" — Cream parchment / aged paper, navy blue accents, justice-themed
Dark Theme:  "Pirate King" — Deep ocean navy, gold/red accents, treasure-map texture
```

---

## 1. Color Palette (src/index.css)

**Light ("Marine" theme):**
- Background: warm parchment cream `40 30% 94%`
- Foreground: deep navy `220 40% 13%`
- Primary: marine blue `220 70% 35%`
- Accent: gold `45 90% 50%`
- Destructive: pirate red `0 75% 50%`
- Border: weathered tan `35 25% 75%`
- Cards: aged white `40 25% 97%`

**Dark ("Pirate King" theme):**
- Background: deep ocean `222 50% 8%`
- Foreground: warm cream `40 30% 90%`
- Primary: treasure gold `45 85% 55%`
- Accent: straw-hat red `0 70% 55%`
- Secondary: ocean teal `200 40% 20%`
- Border: faded gold `45 30% 30%`
- Cards: ship-deck dark `220 35% 13%`

**Custom ONE PIECE tokens:**
- `--op-gold: 45 85% 55%`
- `--op-red: 0 70% 55%`
- `--op-straw: 40 60% 70%`
- `--op-ocean: 200 60% 40%`
- `--op-marine: 220 70% 35%`

---

## 2. Typography (src/index.css + tailwind.config.ts)

- Import **Pirata One** (Google Fonts) — for section headers and the name
- Import **IM Fell English** — for body text, giving an old-world feel
- Keep **JetBrains Mono** for code/mono contexts
- Keep **Caveat** for handwritten accents (repurposed for "bounty" labels)

```text
h1, h2, h3  → Pirata One (pirate headers)
body text    → IM Fell English (aged serif)
mono/code    → JetBrains Mono (unchanged)
accent notes → Caveat (handwritten bounty style)
```

---

## 3. Textures & Background (src/index.css)

- Replace the current noise texture with a **parchment/paper grain** SVG filter
- Add a subtle **compass rose watermark** as a fixed background element (CSS `::after` on body, low opacity)
- Divider lines changed from dashed to a **rope pattern** using a repeating SVG background

---

## 4. Section Renaming (src/pages/Index.tsx + Layout.tsx)

| Current | ONE PIECE Theme |
|---|---|
| Experience | Voyage Log |
| Education | Training Arc |
| Projects | Treasure Map |
| Skills | Devil Fruits & Haki |
| Notes (Blog) | Captain's Log |
| "View All" | "Set Sail →" |

Also update `SUB_PAGE_TITLES` in `Layout.tsx` and nav labels in `Navbar.tsx`.

---

## 5. Component Theming

### ProfileCard (src/components/home/ProfileCard.tsx)
- Avatar border becomes a **double gold ring** (`border-4 border-[hsl(var(--op-gold))]`)
- Name rendered in **Pirata One** font
- Status dot becomes a **Jolly Roger** mini SVG icon (online = flying flag, busy = crossed swords, offline = skull)
- "Resume" button → "Bounty Poster" with a skull icon
- "Contact" button → "Send a Den Den Mushi" with a snail-phone icon (custom SVG)
- Age/location line gets a small anchor (⚓) icon prefix

### ExperienceItem (src/components/home/ExperienceItem.tsx)
- Card border gets a subtle **treasure map edge** feel — thin gold left-border accent
- Company initials fallback rendered with **Pirata One** font
- Bullet points changed from `•` to `☠` (skull) or `⚓` (anchor)
- Tech tags styled with gold border and slight parchment background

### ProjectCard (src/components/home/ProjectCard.tsx)
- Cards styled as **treasure map fragments** — parchment bg, torn-edge shadow effect
- Status "Live" becomes "Discovered" with a treasure chest icon
- Status "Building" becomes "Charting..." with a compass icon
- GitHub/Live links get pirate-themed icons (spyglass for Live, map for GitHub)

### SkillsSection (src/components/home/SkillsSection.tsx)
- Section header: "Devil Fruits & Haki"
- Skill badges get a subtle **wanted-poster tan background** with slightly rough border
- Category headers could reference ONE PIECE power types (Languages = "Haki Types", Frameworks = "Devil Fruits", etc.)

### GitHubHeatmap (src/components/home/GitHubHeatmap.tsx)
- Heatmap colors: ocean blue gradient (`transparent → light teal → ocean blue → deep navy → gold` for max contributions)
- Label "Contributions" → "Battles Fought"

---

## 6. Navbar (src/components/layout/Navbar.tsx)

- Navigation links rendered in **Pirata One** for a bold pirate feel
- Active link underline becomes a **red wavy line** (CSS wavy text-decoration or SVG)
- Theme toggle icon: Sun/Moon → **Jolly Roger / Marine flag** toggle using custom inline SVGs
- Labels: Home → "Crew", Projects → "Treasure Map", Notes → "Captain's Log"

---

## 7. Footer (src/components/layout/Footer.tsx)

- Quote updated to a ONE PIECE quote: *"I'm gonna be King of the Pirates!" — Monkey D. Luffy*
- Update via `src/api/config.api.ts`
- "Designed & Developed by" → "Crafted by Nakama"
- Add a small **Straw Hat Jolly Roger** SVG icon in the footer
- Time display prefixed with "Ship's Log:"

---

## 8. Bordered Container & Dividers

- `bordered-container` dashed lines → **rope-style repeating pattern** (gold/brown dashed with thicker segments)
- `divider-line` → rope pattern SVG or a `~~~` wave pattern using CSS

---

## 9. Animations & Effects

- Page transition (`page-transition` class) → add a subtle **wave/ocean sway** effect instead of plain translateY
- Card hover → gentle **ship-rocking** rotation (`hover:rotate-[0.5deg]`) with gold glow
- `animate-fade-in-up` → add a slight horizontal sway for a "floating on water" feel
- Scrollbar thumb styled as a dark wood/plank color

---

## 10. Custom SVG Assets (new files)

Create small inline SVGs or a components file:
- `src/assets/jolly-roger.svg` — Straw Hat crew Jolly Roger (simplified, original design to avoid copyright)
- `src/assets/den-den-mushi.svg` — snail phone icon
- Use Lucide icons where possible: `Anchor`, `Compass`, `Ship`, `Skull`, `Swords`

---

## Files to Modify

| File | Changes |
|---|---|
| `src/index.css` | Complete color palette overhaul, new textures, rope dividers, fonts, animations |
| `tailwind.config.ts` | New font families, ONE PIECE color tokens, custom animations |
| `src/components/layout/Navbar.tsx` | Pirate nav labels, themed toggle, active link styling |
| `src/components/layout/Layout.tsx` | Updated sub-page titles |
| `src/components/layout/SubPageHeader.tsx` | Pirate-themed back button, header font |
| `src/components/layout/Footer.tsx` | ONE PIECE quote, pirate copy, Jolly Roger icon |
| `src/components/home/ProfileCard.tsx` | Gold avatar, pirate buttons, Jolly Roger status, anchor icons |
| `src/components/home/ExperienceItem.tsx` | Gold accent borders, skull bullets, pirate font for initials |
| `src/components/home/ProjectCard.tsx` | Treasure map cards, pirate status labels |
| `src/components/home/SkillsSection.tsx` | "Devil Fruits & Haki" header, themed badges |
| `src/components/home/GitHubHeatmap.tsx` | Ocean color scale, "Battles Fought" label |
| `src/pages/Index.tsx` | Pirate section names, anchor icons replacing squares |
| `src/api/config.api.ts` | Luffy quote in footer config |
| `src/components/ui/BorderedContainer.tsx` | Rope-pattern borders |
| `src/components/ui/Divider.tsx` | Wave/rope divider pattern |

---

## Implementation Order

1. Colors & typography foundations (`index.css`, `tailwind.config.ts`)
2. Layout shell (Navbar, Footer, BorderedContainer, Dividers)
3. Home page sections (ProfileCard, ExperienceItem, ProjectCard, SkillsSection, Heatmap)
4. Index page section renaming
5. Sub-pages consistency (SubPageHeader, Layout titles)
6. Animations and polish


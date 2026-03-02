

# Plan: Multi-Anime Theme Configuration System

## Architecture

Create a centralized theme config that defines every anime-specific aspect (colors, labels, fonts, icons, textures). A React context provides the active theme to all components, which read from it instead of hardcoded ONE PIECE values.

```text
src/config/themes/
  ├── index.ts          ← AnimeTheme type + registry + active theme logic
  ├── one-piece.ts      ← Current ONE PIECE theme extracted into config
  └── naruto.ts         ← New Naruto theme

src/contexts/
  └── AnimeThemeContext.tsx  ← React context + provider + useAnimeTheme hook
```

## 1. Theme Configuration Type (`src/config/themes/index.ts`)

Define an `AnimeTheme` interface covering every theme-dependent value:

- **id** / **name** / **description**
- **colors**: light + dark mode CSS variable maps (background, foreground, primary, accent, border, plus custom tokens like `--theme-accent-1`, `--theme-accent-2`)
- **fonts**: header, body, accent font-family strings + Google Fonts import URLs
- **labels**: section names (experience, education, projects, skills, blog), nav links, "view all" text, footer quote/author, resume button, contact button, heatmap label, status labels (live/building/coming-soon)
- **icons**: which Lucide icon names to use for sections, status indicators, divider style
- **textures**: noise opacity, watermark character, selection color
- **cssClasses**: divider gradient colors, bordered-container gradient, card background gradients, glow color, scrollbar color

## 2. ONE PIECE Theme (`src/config/themes/one-piece.ts`)

Extract all current hardcoded values into this config. No behavioral changes — just moving values into the config object.

## 3. Naruto Theme (`src/config/themes/naruto.ts`)

- **Light mode ("Hidden Leaf Village")**: Warm tan/earth tones, forest green accents, leaf-village red
- **Dark mode ("Akatsuki")**: Deep crimson-black, red cloud accents, sharingan red
- **Fonts**: `Zen Tokyo Zoo` for headers (Japanese brush feel), `Noto Serif JP` for body
- **Labels**: Experience → "Ninja Record", Education → "Academy Training", Projects → "Mission Log", Skills → "Jutsu Arsenal", Blog → "Scroll Archive", "View All" → "Continue Mission"
- **Icons**: Compass → Flame, Ship → Scroll, Anchor → Shuriken (use Lucide: `Flame`, `ScrollText`, `Swords`, `Target`)
- **Footer quote**: "I'm not gonna run away, I never go back on my word!" — Naruto Uzumaki
- **Textures**: Scroll/paper texture, hidden leaf symbol watermark

## 4. Theme Context (`src/contexts/AnimeThemeContext.tsx`)

- Stores active theme ID in `localStorage`
- Provides `activeTheme` object and `setActiveTheme(id)` function
- On mount/change, injects the theme's CSS variables into `:root` and `.dark` via `document.documentElement.style.setProperty()`
- Dynamically loads the theme's Google Fonts import

## 5. Component Updates

All components that currently have hardcoded ONE PIECE text/styles will use `useAnimeTheme()`:

| Component | What changes |
|---|---|
| `Navbar.tsx` | Nav labels from `theme.labels.nav`, toggle icons from `theme.icons` |
| `Footer.tsx` | Quote from `theme.labels.footer`, branding text |
| `Layout.tsx` | Sub-page titles from `theme.labels` |
| `Index.tsx` | Section headers from `theme.labels`, section icons from `theme.icons` |
| `ProfileCard.tsx` | Button labels from `theme.labels` |
| `ExperienceItem.tsx` | Bullet character from `theme.icons.bullet` |
| `ProjectCard.tsx` | Status labels from `theme.labels.status` |
| `SkillsSection.tsx` | Section title + category aliases from `theme.labels` |
| `GitHubHeatmap.tsx` | "Battles Fought" label from `theme.labels.heatmap` |
| `config.api.ts` | Footer quote from active theme config |
| `index.css` | Theme-specific CSS variables applied dynamically; keep structural CSS only |

## 6. Theme Switcher UI

Add a small theme selector in the Navbar (dropdown or icon toggle next to the dark/light toggle) that lets you pick between "One Piece" and "Naruto". Stores preference in localStorage.

## Implementation Order

1. Create theme type + ONE PIECE config + Naruto config
2. Create AnimeThemeContext + provider
3. Wire provider into App.tsx
4. Update all components to read from `useAnimeTheme()`
5. Add theme switcher UI to Navbar
6. Dynamic CSS variable injection for color switching


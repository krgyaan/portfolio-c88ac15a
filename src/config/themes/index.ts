export interface AnimeThemeColors {
  background: string;
  foreground: string;
  card: string;
  'card-foreground': string;
  popover: string;
  'popover-foreground': string;
  primary: string;
  'primary-foreground': string;
  secondary: string;
  'secondary-foreground': string;
  muted: string;
  'muted-foreground': string;
  accent: string;
  'accent-foreground': string;
  destructive: string;
  'destructive-foreground': string;
  border: string;
  input: string;
  ring: string;
  divider: string;
  'glow-color': string;
  'noise-opacity': string;
  // Theme accent tokens (mapped to --theme-accent-1, --theme-accent-2, etc.)
  'theme-accent-1': string;
  'theme-accent-2': string;
  'theme-accent-3': string;
  'theme-accent-4': string;
  'theme-accent-5': string;
}

export interface AnimeThemeLabels {
  nav: { path: string; label: string }[];
  backLink: string;
  subPageTitles: Record<string, string>;
  sections: {
    experience: string;
    education: string;
    projects: string;
    skills: string;
    skillsSubtitle: string;
    heatmap: string;
    heatmapUnit: string;
    heatmapLow: string;
    heatmapHigh: string;
    heatmapCta: string;
  };
  viewAll: string;
  status: {
    live: string;
    building: string;
    'coming-soon': string;
  };
  resume: string;
  contact: string;
  footer: {
    quote: string;
    author: string;
    crafted: string;
    brandName: string;
    timeLabel: string;
  };
  skillCategories: Record<string, string>;
  bulletChar: string;
  projectLinks: {
    github: string;
    live: string;
  };
}

export interface AnimeThemeFonts {
  header: string;
  body: string;
  mono: string;
  handwritten: string;
  googleFontsUrl: string;
}

export interface AnimeThemeIcons {
  experience: string;
  education: string;
  projects: string;
  skills: string;
  themeToggleLight: string;
  themeToggleDark: string;
  resume: string;
  statusLive: string;
  statusBuilding: string;
}

export interface AnimeTheme {
  id: string;
  name: string;
  description: string;
  emoji: string;
  colors: {
    light: AnimeThemeColors;
    dark: AnimeThemeColors;
  };
  fonts: AnimeThemeFonts;
  labels: AnimeThemeLabels;
  icons: AnimeThemeIcons;
  textures: {
    watermarkChar: string;
    selectionBg: string;
    selectionColor: string;
  };
}

import { onePieceTheme } from './one-piece';
import { narutoTheme } from './naruto';

export const themeRegistry: Record<string, AnimeTheme> = {
  'one-piece': onePieceTheme,
  'naruto': narutoTheme,
};

export const defaultThemeId = 'one-piece';

export function getThemeById(id: string): AnimeTheme {
  return themeRegistry[id] || themeRegistry[defaultThemeId];
}

export function getAllThemes(): AnimeTheme[] {
  return Object.values(themeRegistry);
}

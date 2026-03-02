import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AnimeTheme, getThemeById, defaultThemeId, getAllThemes } from '@/config/themes';

interface AnimeThemeContextValue {
  theme: AnimeTheme;
  setActiveTheme: (id: string) => void;
  allThemes: AnimeTheme[];
}

const AnimeThemeContext = createContext<AnimeThemeContextValue | null>(null);

const STORAGE_KEY = 'anime-theme-id';

function loadFonts(url: string) {
  const existingLink = document.querySelector('link[data-anime-fonts]');
  if (existingLink) {
    (existingLink as HTMLLinkElement).href = url;
  } else {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = url;
    link.setAttribute('data-anime-fonts', 'true');
    document.head.appendChild(link);
  }
}

function applyThemeColors(theme: AnimeTheme, isDark: boolean) {
  const colors = isDark ? theme.colors.dark : theme.colors.light;
  const root = document.documentElement;

  // Apply CSS variables
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });

  // Map theme-accent tokens to legacy OP tokens for backward compat
  root.style.setProperty('--op-gold', colors['theme-accent-1']);
  root.style.setProperty('--op-red', colors['theme-accent-2']);
  root.style.setProperty('--op-straw', colors['theme-accent-3']);
  root.style.setProperty('--op-ocean', colors['theme-accent-4']);
  root.style.setProperty('--op-marine', colors['theme-accent-5']);

  // Apply font families
  root.style.setProperty('--font-header', theme.fonts.header);
  root.style.setProperty('--font-body', theme.fonts.body);
  root.style.setProperty('--font-mono', theme.fonts.mono);
  root.style.setProperty('--font-handwritten', theme.fonts.handwritten);

  // Apply watermark
  root.style.setProperty('--watermark-char', `'${theme.textures.watermarkChar}'`);
}

export function AnimeThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || defaultThemeId;
    } catch {
      return defaultThemeId;
    }
  });

  const theme = getThemeById(themeId);

  const setActiveTheme = (id: string) => {
    setThemeId(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {}
  };

  // Apply colors whenever theme or dark mode changes
  useEffect(() => {
    const currentTheme = getThemeById(themeId);
    loadFonts(currentTheme.fonts.googleFontsUrl);

    const isDark = document.documentElement.classList.contains('dark');
    applyThemeColors(currentTheme, isDark);

    // Watch for dark mode class changes
    const observer = new MutationObserver(() => {
      const nowDark = document.documentElement.classList.contains('dark');
      applyThemeColors(getThemeById(themeId), nowDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [themeId]);

  return (
    <AnimeThemeContext.Provider value={{ theme, setActiveTheme, allThemes: getAllThemes() }}>
      {children}
    </AnimeThemeContext.Provider>
  );
}

export function useAnimeTheme() {
  const ctx = useContext(AnimeThemeContext);
  if (!ctx) throw new Error('useAnimeTheme must be used within AnimeThemeProvider');
  return ctx;
}

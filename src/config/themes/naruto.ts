import { AnimeTheme } from './index';

export const narutoTheme: AnimeTheme = {
  id: 'naruto',
  name: 'Naruto',
  description: 'Shinobi Way — Believe it!',
  emoji: '🍥',
  colors: {
    light: {
      // Hidden Leaf Village — warm earth, tan, forest green
      background: '35 30% 92%',
      foreground: '20 30% 15%',
      card: '35 25% 95%',
      'card-foreground': '20 30% 15%',
      popover: '35 25% 95%',
      'popover-foreground': '20 30% 15%',
      primary: '145 45% 30%',          // forest green
      'primary-foreground': '35 30% 96%',
      secondary: '30 20% 86%',
      'secondary-foreground': '20 30% 15%',
      muted: '30 15% 82%',
      'muted-foreground': '20 15% 45%',
      accent: '0 70% 50%',              // leaf-village red
      'accent-foreground': '35 30% 96%',
      destructive: '0 75% 50%',
      'destructive-foreground': '0 85% 97%',
      border: '30 20% 72%',
      input: '30 20% 72%',
      ring: '145 45% 30%',
      divider: '30 20% 72%',
      'glow-color': '25 80% 55%',       // naruto orange glow
      'noise-opacity': '0.025',
      'theme-accent-1': '25 90% 55%',   // naruto orange
      'theme-accent-2': '0 70% 50%',    // leaf red
      'theme-accent-3': '45 50% 65%',   // scroll tan
      'theme-accent-4': '145 45% 30%',  // forest green
      'theme-accent-5': '210 30% 40%',  // headband blue
    },
    dark: {
      // Akatsuki — deep crimson-black, red clouds, sharingan
      background: '0 30% 6%',
      foreground: '30 20% 88%',
      card: '0 20% 12%',
      'card-foreground': '30 20% 88%',
      popover: '0 20% 14%',
      'popover-foreground': '30 20% 88%',
      primary: '25 90% 55%',            // naruto orange
      'primary-foreground': '0 30% 6%',
      secondary: '0 25% 18%',
      'secondary-foreground': '30 20% 88%',
      muted: '0 15% 20%',
      'muted-foreground': '30 15% 60%',
      accent: '0 80% 50%',              // sharingan red
      'accent-foreground': '30 20% 95%',
      destructive: '0 84% 60%',
      'destructive-foreground': '0 85% 97%',
      border: '0 25% 25%',
      input: '0 25% 25%',
      ring: '25 90% 55%',
      divider: '0 15% 18%',
      'glow-color': '25 90% 55%',
      'noise-opacity': '0.035',
      'theme-accent-1': '25 90% 55%',
      'theme-accent-2': '0 80% 50%',
      'theme-accent-3': '45 40% 55%',
      'theme-accent-4': '145 40% 35%',
      'theme-accent-5': '210 30% 40%',
    },
  },
  fonts: {
    header: "'Cinzel', serif",
    body: "'Source Serif 4', serif",
    mono: "'JetBrains Mono', monospace",
    handwritten: "'Cormorant Garamond', serif",
    googleFontsUrl: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&family=Source+Serif+4:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
  },
  labels: {
    nav: [
      { path: '/', label: 'Village' },
      { path: '/projects', label: 'Mission Log' },
      { path: '/blog', label: 'Scroll Archive' },
    ],
    backLink: 'Return to Village',
    subPageTitles: {
      '/experiences': 'Ninja Record',
      '/projects': 'Mission Log',
      '/blog': 'Scroll Archive',
    },
    sections: {
      experience: 'Ninja Record',
      education: 'Academy Training',
      projects: 'Mission Log',
      skills: 'Jutsu Arsenal',
      skillsSubtitle: '',
      heatmap: 'Missions Completed',
      heatmapUnit: 'missions',
      heatmapLow: 'D-Rank',
      heatmapHigh: 'S-Rank',
      heatmapCta: 'Join my squad on GitHub',
    },
    viewAll: 'Continue Mission',
    status: {
      live: 'Completed',
      building: 'In Progress...',
      'coming-soon': 'Classified',
    },
    resume: 'Ninja Info Card',
    contact: 'Send a Scroll',
    footer: {
      quote: "I'm not gonna run away, I never go back on my word!",
      author: 'Naruto Uzumaki',
      crafted: 'Forged by',
      brandName: 'Shinobi Gyan',
      timeLabel: 'Mission Clock:',
    },
    skillCategories: {
      Languages: 'Chakra Natures',
      Frameworks: 'Kekkei Genkai',
      Tools: 'Ninja Tools',
      Databases: 'Scroll Vaults',
      Other: 'Hidden Jutsu',
    },
    bulletChar: '✦',
    projectLinks: {
      github: 'Intel',
      live: 'Deploy',
    },
  },
  icons: {
    experience: 'Flame',
    education: 'ScrollText',
    projects: 'Target',
    skills: 'Swords',
    themeToggleLight: 'Sun',
    themeToggleDark: 'Moon',
    resume: 'ScrollText',
    statusLive: 'Target',
    statusBuilding: 'Flame',
  },
  textures: {
    watermarkChar: '忍',
    selectionBg: 'var(--theme-accent-1)',
    selectionColor: '0 30% 6%',
  },
};

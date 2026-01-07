export interface KanjiItem {
  id: string;
  symbol: string;
  reading: string;
  meaning: string;
  partOfSpeech: string;
};

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  tags?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description?: string;
  logoUrl?: string;
  highlights?: string[];
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  age: number;
  subtitle: string;
  avatarUrl: string;
  isVerified: boolean;
  about: string;
  email: string;
  calendarUrl: string;
  socialLinks: SocialLink[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  year: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  problem?: string;
  solution?: string;
  challenges?: string;
  outcome?: string;
}

export interface Skill {
  name: string;
  description: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export interface GitHubContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface GitHubContribution {
  total: number;
  days: GitHubContributionDay[];
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks?: number;
  url: string;
  homepage?: string;
}

export interface GitHubWeek {
  days: GitHubContributionDay[];
}

export interface GitHubHeatmapType {
  total: number;
  weeks: GitHubWeek[];
}

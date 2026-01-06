import { Profile } from '@/types';

const mockProfile: Profile = {
  name: "Gyan Prakash Kumar",
  age: 24,
  subtitle: "Engineer · Developer · Builder",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  isVerified: true,
  about: "Full Stack Developer with 2.2+ years of hands-on experience building and migrating production systems using NestJS, React, and PostgreSQL. Strong in feature ownership, role-based access control, authentication, and API design from database schema to production deployment.",
  email: "gyanprakash@email.com",
  calendarUrl: "https://cal.com/gyanprakash",
  socialLinks: [
    { id: "1", platform: "Gmail", url: "mailto:gyanprakash@email.com", icon: "Mail" },
    { id: "2", platform: "GitHub", url: "https://github.com/gyanprakash", icon: "Github" },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com/in/gyanprakash", icon: "Linkedin" },
    { id: "4", platform: "Portfolio", url: "#", icon: "BookOpen" },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProfile(): Promise<Profile> {
  await delay(300);
  return mockProfile;
}

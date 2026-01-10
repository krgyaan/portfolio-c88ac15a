import { Profile } from '@/types/api.types';

const mockProfile: Profile = {
  name: "Gyan Prakash Kumar",
  age: 24,
  subtitle: "Learner · Developer · Engineer",
  avatarUrl: "https://avatars.githubusercontent.com/u/100079802?s=400&u=9c0082e9d16118af6ed7b547b6461c29accf821d&v=4",
  isVerified: true,
  isAvailableForHire: true,
  status: 'online',
  about: "Full Stack Developer with 2.2+ years of hands-on experience building and migrating production systems using NestJS, React, and PostgreSQL. Strong in feature ownership, role-based access control, authentication, and API design from database schema to production deployment.",
  email: "gyanprakashk55@gmail.com",
  calendarUrl: "https://cal.com/gyanprakash",
  socialLinks: [
    { id: "1", platform: "Gmail", url: "mailto:gyanprakashk55@gmail.com", icon: "Mail", isPrimary: true },
    { id: "2", platform: "GitHub", url: "https://github.com/krgyaan", icon: "Github", isPrimary: true },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com/in/krgyaan", icon: "Linkedin", isPrimary: true },
    { id: "4", platform: "Twitter/X", url: "https://x.com/krgyaan", icon: "Twitter", isPrimary: true },
    { id: "5", platform: "Leetcode", url: "https://leetcode.com/u/_gyaan_/", icon: "Code", isPrimary: false },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProfile(): Promise<Profile> {
  await delay(300);
  return mockProfile;
}

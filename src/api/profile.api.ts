import { Profile } from '@/types';

const mockProfile: Profile = {
  name: "Vedant Lavale",
  age: 20,
  subtitle: "Engineer · Developer · Builder",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  isVerified: true,
  about: "I like starting from a blank slate and turning it into a finished product. From frontend and backend to deployment, I focus on building software that's practical, usable, and reliable.",
  email: "vedantlavale@gmail.com",
  calendarUrl: "https://cal.com/vedantlavale",
  socialLinks: [
    { id: "1", platform: "Gmail", url: "mailto:vedantlavale@gmail.com", icon: "Mail" },
    { id: "2", platform: "GitHub", url: "https://github.com/vedantlavale", icon: "Github" },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com/in/vedantlavale", icon: "Linkedin" },
    { id: "4", platform: "Medium", url: "https://medium.com/@vedantlavale", icon: "BookOpen" },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProfile(): Promise<Profile> {
  await delay(300);
  return mockProfile;
}

import { Profile } from '@/types';

const mockProfile: Profile = {
  name: "John Doe",
  subtitle: "Engineer · Developer · Builder",
  avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  isVerified: true,
  about: "I'm a creative developer based in New York, crafting digital experiences that balance form and function. With a focus on minimal aesthetics and thoughtful interactions, I build products that are both beautiful and useful. Currently focused on building tools that help people work smarter.",
  email: "hello@johndoe.dev",
  calendarUrl: "https://cal.com/johndoe",
  socialLinks: [
    { id: "1", platform: "GitHub", url: "https://github.com", icon: "Github" },
    { id: "2", platform: "Twitter", url: "https://twitter.com", icon: "Twitter" },
    { id: "3", platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin" },
    { id: "4", platform: "Instagram", url: "https://instagram.com", icon: "Instagram" },
  ],
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProfile(): Promise<Profile> {
  await delay(300);
  return mockProfile;
}

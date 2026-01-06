export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface Profile {
  name: string;
  subtitle: string;
  avatarUrl: string;
  isVerified: boolean;
  about: string;
  email: string;
  calendarUrl: string;
  socialLinks: SocialLink[];
}

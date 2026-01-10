import { SiteConfig } from '@/types/api.types';

const mockConfig: SiteConfig = {
  hireMe: {
    enabled: true,
    text: "HIRE ME!",
  },
  ctaButtons: {
    bookCall: { enabled: true, text: "Book an intro call" },
    sendEmail: { enabled: true, text: "Send an email" },
  },
  footer: {
    quote: "Building the future, one line of code at a time.",
    author: "Gyan",
  },
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getSiteConfig(): Promise<SiteConfig> {
  await delay(100);
  return mockConfig;
}

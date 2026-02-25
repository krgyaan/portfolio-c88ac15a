import { SiteConfig } from '@/types/api.types';

const mockConfig: SiteConfig = {
  hireMe: {
    enabled: true,
    text: "WANTED!",
  },
  ctaButtons: {
    bookCall: { enabled: true, text: "Book an intro call" },
    sendEmail: { enabled: true, text: "Send a Den Den Mushi" },
  },
  footer: {
    quote: "I'm gonna be King of the Pirates!",
    author: "Monkey D. Luffy",
  },
};

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getSiteConfig(): Promise<SiteConfig> {
  await delay(100);
  return mockConfig;
}

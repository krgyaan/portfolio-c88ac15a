import { Experience } from '@/types';

const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "Gauge.ro",
    role: "Full Stack Developer",
    period: "Nov 2024 — Present",
    logoUrl: "https://gauge.ro/favicon.ico",
    highlights: [
      "Sole Full Stack Developer in a 3-member core engineering team.",
      "Working on production backend systems with 200+ REST APIs and highly scalable time-series databases.",
      "Developing Node.js services for IoT data ingestion and business logic.",
    ],
  },
  {
    id: "2",
    company: "Socialease",
    role: "Full Stack Developer",
    period: "Jun 2024 — Aug 2024",
    logoUrl: "",
    highlights: [],
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getExperiences(): Promise<Experience[]> {
  await delay(300);
  return mockExperiences;
}

export async function getExperienceById(id: string): Promise<Experience | undefined> {
  await delay(200);
  return mockExperiences.find(exp => exp.id === id);
}

import { Experience } from '@/types';

const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "TechCorp",
    role: "Senior Engineer",
    period: "2023 — Present",
    description: "Leading frontend architecture and design systems",
  },
  {
    id: "2",
    company: "StartupXYZ",
    role: "Full Stack Developer",
    period: "2021 — 2023",
    description: "Built scalable web applications from scratch",
  },
  {
    id: "3",
    company: "DigitalAgency",
    role: "Frontend Developer",
    period: "2019 — 2021",
    description: "Crafted interactive experiences for clients",
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

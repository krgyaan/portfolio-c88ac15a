import { Education } from "@/types/api.types";

const mockEducation: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Bachelor of Science",
    field: "Computer Science",
    period: "2018 — 2022",
    highlights: [
      "Graduated with honors",
      "Specialized in software engineering and web technologies",
      "Led student developer community"
    ],
    skills: ["Java", "Python", "Data Structures", "Algorithms"]
  },
  {
    id: "2",
    institution: "Online Academy",
    degree: "Professional Certification",
    field: "Full Stack Development",
    period: "2022",
    highlights: [
      "Completed intensive 6-month bootcamp",
      "Built 10+ production-ready projects"
    ],
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"]
  }
];

export async function getEducation(): Promise<Education[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockEducation;
}

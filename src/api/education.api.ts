import { Education } from "@/types/api.types";

const mockEducation: Education[] = [
  {
    id: "1",
    institution: "Vishveshwarya Group of Institution",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    period: "2020 — 2024",
    location: "Greater Noida, UP, India",
    highlights: [
      "Focused on core computer science fundamentals and software engineering practices",
      "Built multiple full-stack projects during academic years",
      "Participated in coding competitions and technical events"
    ],
    skills: ["Data Structures", "Algorithms", "Database Management", "Software Engineering"]
  }
];

export async function getEducation(): Promise<Education[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockEducation;
}

import { Education } from "@/types/api.types";

const mockEducation: Education[] = [
  {
    id: "1",
    institution: "University of Technology",
    degree: "Bachelor of Technology",
    field: "Computer Science & Engineering",
    period: "2020 — 2024",
    highlights: [
      "Graduated with First Class honors",
      "Specialized in Web Development and Software Engineering",
      "Participated in multiple hackathons and coding competitions",
      "Led the college tech club as Technical Lead"
    ],
    skills: ["Data Structures", "Algorithms", "Web Development", "Database Management"]
  }
];

export async function getEducation(): Promise<Education[]> {
  await new Promise((resolve) => setTimeout(resolve, 200));
  return mockEducation;
}

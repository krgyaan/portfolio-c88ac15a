import { Experience } from '@/types/api.types';

const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "Volks Energie Pvt. Ltd.",
    role: "Software Developer",
    period: "Jul 2025 — Present",
    location: "Mohan Cooperative Industrial Estate, New Delhi",
    employmentType: "Full Time",
    logoUrl: "",
    highlights: [
      "Led the end-to-end migration of a live Tender Management System from Laravel/MySQL to React, NestJS, and PostgreSQL, with zero downtime to daily business operations.",
      "Designed and executed complex database migrations, preserving legacy IDs, sequences, and relational integrity across financial and tender data.",
      "Built and maintained 25+ backend modules across Tender and Accounts domains, owning schema design, APIs, validation, and authorization.",
      "Implemented backend-enforced RBAC using JWT authentication and Google OAuth, replacing insecure UI-only access controls.",
      "Developed scalable React features using TanStack Query and Zod, supporting large datasets with pagination, filtering, and role-aware UI logic.",
      "Set up CI/CD pipelines, PR-based workflows, and production deployments using Linux VPS, Nginx, and PM2.",
      "Implemented transaction-safe background jobs and rollback-safe migrations, reducing risk during frequent schema changes in production.",
    ],
    technologies: ["React", "NestJS", "PostgreSQL", "TypeScript", "TanStack Query", "Zod", "Nginx", "PM2"],
  },
  {
    id: "2",
    company: "Ananta Business Services",
    role: "Software Developer",
    period: "Nov 2023 — Jun 2025",
    location: "Hauz Khas, New Delhi",
    employmentType: "Full Time",
    logoUrl: "",
    highlights: [
      "Served as technical owner for multiple client projects, leading task breakdown, sprint planning, PR reviews, and delivery execution.",
      "Acted as the primary technical contact for clients, translating ambiguous business requirements into production-ready systems.",
      "Designed and built a biometric Attendance Management System, integrating fingerprint devices via vendor APIs to automate attendance and payroll workflows.",
      "Architected and maintained large Laravel/MySQL systems with complex relational schemas (~100+ tables) supporting inventory and office operations.",
      "Improved performance of legacy PHP systems by implementing server-side pagination and optimized data-loading strategies.",
      "Owned projects end-to-end, including architecture, development, deployment, client onboarding, and post-release production support.",
      "Mentored junior developers through code reviews and architectural guidance, improving code quality and delivery reliability.",
    ],
    technologies: ["Laravel", "MySQL", "PHP", "JavaScript", "Bootstrap", "Git"],
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

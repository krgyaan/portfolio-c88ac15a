import { Experience } from '@/types';

const mockExperiences: Experience[] = [
  {
    id: "1",
    company: "Volks Energie Pvt. Ltd.",
    role: "Software Developer",
    period: "Jul 2025 — Present",
    logoUrl: "",
    highlights: [
      "Core developer in a 2-person full-stack team, owning end-to-end delivery of multiple modules in a Tender Management System migrated from Laravel/MySQL to React, NestJS, and PostgreSQL.",
      "Built and maintained 25+ backend modules across Tender and Accounts domains, including schema design, REST APIs, validation, and role-based access control.",
      "Implemented JWT-based authentication and Google OAuth, introducing proper backend-enforced RBAC to replace UI-only restrictions in the legacy system.",
      "Set up CI/CD pipelines, Nginx, and production deployments on a Hostinger VPS.",
    ],
  },
  {
    id: "2",
    company: "Ananta Business Services",
    role: "Software Developer",
    period: "Nov 2023 — Jun 2025",
    logoUrl: "",
    highlights: [
      "Led a 4-member development team, handling task allocation, PR reviews, sprint planning, and direct client communication.",
      "Built a hardware-integrated Attendance Management System, integrating fingerprint biometric devices via APIs.",
      "Designed and delivered large-scale Inventory and Office Management Systems using Laravel and MySQL, managing schemas across ~110 tables.",
      "Owned projects end-to-end, from requirement gathering and system design to deployment and post-release support.",
    ],
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

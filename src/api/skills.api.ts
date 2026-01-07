import { SkillCategory } from "@/types/api.types";

export async function getSkills(): Promise<SkillCategory[]> {
  // Later: replace with real API call
  return Promise.resolve([
    {
      id: "core",
      title: "Core Technologies",
      skills: [
        {
          name: "TypeScript, JavaScript",
          description:
            "Production backend and frontend development, async workflows, validation, API integration",
        },
        {
          name: "React",
          description:
            "Data-driven UIs, complex forms, server-driven tables, role-based UI behavior",
        },
        {
          name: "NestJS (Node.js)",
          description:
            "Modular architecture, REST APIs, authentication, RBAC, background jobs, transactions",
        },
      ],
    },
    {
      id: "backend",
      title: "Backend & System Design",
      skills: [
        {
          name: "API Design",
          description:
            "Schema-first development, validation layers, authorization, error handling",
        },
        {
          name: "Authentication & Authorization",
          description: "JWT, Google OAuth, backend-enforced RBAC",
        },
        {
          name: "System Migrations",
          description:
            "Legacy migrations, data preservation, rollback-safe deployments",
        },
      ],
    },
    {
      id: "databases",
      title: "Databases",
      skills: [
        {
          name: "PostgreSQL",
          description:
            "Schema design, indexing, transactions, migrations",
        },
        {
          name: "MySQL",
          description:
            "Large legacy schemas, query optimization",
        },
        {
          name: "MongoDB",
          description:
            "Basic usage for document-oriented data (non-core)",
        },
      ],
    },
    {
      id: "frontend",
      title: "Frontend & State Management",
      skills: [
        {
          name: "TanStack Query",
          description:
            "Server-state management, caching, pagination",
        },
        {
          name: "Zod",
          description:
            "Schema validation and type safety",
        },
        {
          name: "Tailwind CSS",
          description:
            "Rapid UI development with consistent design systems",
        },
      ],
    },
    {
      id: "devops",
      title: "DevOps & Tooling",
      skills: [
        {
          name: "CI/CD",
          description:
            "Branch-based workflows, automated builds, controlled releases",
        },
        {
          name: "Linux & VPS Hosting",
          description:
            "Production deployments, process management",
        },
        {
          name: "Nginx, PM2",
          description:
            "Reverse proxy configuration, application lifecycle management",
        },
        {
          name: "Git & GitHub",
          description:
            "PR-driven development, code reviews, collaboration",
        },
        {
          name: "Postman",
          description:
            "API testing and validation",
        },
      ],
    },
  ]);
}

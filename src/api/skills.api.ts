import { SkillCategory } from "@/types/api.types";

export async function getSkills(): Promise<SkillCategory[]> {
  // Later: replace with real API call
  return Promise.resolve([
    {
      id: "core",
      title: "Core Technologies",
      skills: [
        {
          name: "TypeScript",
          description:
            "Production backend and frontend development, async workflows, validation, API integration",
          icon: "typescript",
        },
        {
          name: "JavaScript",
          description:
            "ES6+, async/await, DOM manipulation, event handling",
          icon: "javascript",
        },
        {
          name: "React",
          description:
            "Data-driven UIs, complex forms, server-driven tables, role-based UI behavior",
          icon: "react",
        },
        {
          name: "NestJS",
          description:
            "Modular architecture, REST APIs, authentication, RBAC, background jobs, transactions",
          icon: "nestjs",
        },
        {
          name: "Node.js",
          description:
            "Server-side JavaScript, API development, event-driven architecture",
          icon: "nodejs",
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
          icon: "api",
        },
        {
          name: "Auth & Security",
          description: "JWT, Google OAuth, backend-enforced RBAC",
          icon: "auth",
        },
        {
          name: "System Migrations",
          description:
            "Legacy migrations, data preservation, rollback-safe deployments",
          icon: "migration",
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
          icon: "postgresql",
        },
        {
          name: "MySQL",
          description:
            "Large legacy schemas, query optimization",
          icon: "mysql",
        },
        {
          name: "MongoDB",
          description:
            "Basic usage for document-oriented data (non-core)",
          icon: "mongodb",
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
          icon: "tanstack",
        },
        {
          name: "Zod",
          description:
            "Schema validation and type safety",
          icon: "zod",
        },
        {
          name: "Tailwind CSS",
          description:
            "Rapid UI development with consistent design systems",
          icon: "tailwindcss",
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
          icon: "cicd",
        },
        {
          name: "Linux",
          description:
            "Production deployments, process management",
          icon: "linux",
        },
        {
          name: "Nginx",
          description:
            "Reverse proxy configuration, load balancing",
          icon: "nginx",
        },
        {
          name: "PM2",
          description:
            "Application lifecycle management, clustering",
          icon: "pm2",
        },
        {
          name: "Git & GitHub",
          description:
            "PR-driven development, code reviews, collaboration",
          icon: "git",
        },
        {
          name: "Postman",
          description:
            "API testing and validation",
          icon: "postman",
        },
      ],
    },
  ]);
}

import { Project } from '@/types/api.types';

const mockProjects: Project[] = [
  {
    id: "1",
    slug: "synapse",
    title: "Synapse",
    description: "Full-stack productivity platform for saving URLs, notes, and insights.",
    fullDescription: "Synapse is a comprehensive productivity platform designed to help users organize and manage their digital content effectively. It provides a seamless experience for saving URLs, taking notes, and extracting insights from your collected data.",
    year: "2024",
    tags: ["Next.js", "PostgreSQL", "Prisma", "BetterAuth", "Resend"],
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
    liveUrl: "https://synapse.app",
    githubUrl: "https://github.com/vedantlavale/synapse",
    role: "Full Stack Developer",
    problem: "Users struggle to organize their digital bookmarks, notes, and insights across multiple platforms, leading to information overload and lost productivity.",
    solution: "Built a unified platform that allows users to save URLs, create notes, and generate insights from their collected content with an intuitive interface.",
    challenges: "Implementing real-time sync across devices while maintaining fast performance required careful architecture decisions and efficient caching strategies.",
    outcome: "Successfully launched with 500+ active users, achieving 4.8/5 user satisfaction rating and reducing users' content organization time by 60%.",
    status: "live",
    isFeatured: true,
  },
  {
    id: "2",
    slug: "tender-management-system",
    title: "Tender Management System",
    description: "Enterprise-grade tender and accounts management platform.",
    fullDescription: "A comprehensive tender management system migrated from Laravel to modern React/NestJS stack with full RBAC support.",
    year: "2024",
    tags: ["React", "NestJS", "PostgreSQL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    role: "Full Stack Developer",
    status: "building",
    isFeatured: true,
  },
  {
    id: "3",
    slug: "coming-soon-1",
    title: "AI Code Assistant",
    description: "Intelligent coding assistant powered by LLMs.",
    year: "2025",
    tags: ["AI", "TypeScript", "OpenAI"],
    status: "coming-soon",
    isFeatured: true,
  },
  {
    id: "4",
    slug: "coming-soon-2",
    title: "DevOps Dashboard",
    description: "Real-time monitoring and deployment management.",
    year: "2025",
    tags: ["Docker", "Kubernetes", "React"],
    status: "coming-soon",
    isFeatured: false,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getProjects(): Promise<Project[]> {
  await delay(300);
  return mockProjects;
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  await delay(200);
  return mockProjects.find(project => project.slug === slug);
}

export async function getFeaturedProjects(limit: number = 3): Promise<Project[]> {
  await delay(300);
  return mockProjects.filter(p => p.isFeatured).slice(0, limit);
}

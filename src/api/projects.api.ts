import { Project } from '@/types';

const mockProjects: Project[] = [
  {
    id: "1",
    slug: "project-alpha",
    title: "Project Alpha",
    description: "A minimal design system for modern web applications",
    fullDescription: "Project Alpha is a comprehensive design system built to streamline the development of modern web applications. It provides a cohesive set of components, patterns, and guidelines that ensure consistency across all touchpoints.",
    year: "2024",
    tags: ["React", "TypeScript", "Design System", "Storybook"],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    role: "Lead Designer & Developer",
    problem: "Teams were spending too much time rebuilding common UI components, leading to inconsistent user experiences and slower development cycles.",
    solution: "Created a comprehensive design system with reusable components, design tokens, and documentation that serves as the single source of truth for the entire product.",
    challenges: "Balancing flexibility with consistency was the biggest challenge. Components needed to be customizable enough for different use cases while maintaining visual coherence.",
    outcome: "Reduced development time by 40% and achieved 100% design consistency across the product. The system is now used by 5 product teams.",
  },
  {
    id: "2",
    slug: "project-beta",
    title: "Project Beta",
    description: "Interactive data visualization platform",
    fullDescription: "An advanced data visualization platform that transforms complex datasets into intuitive, interactive visual stories. Built for analysts who need to communicate insights effectively.",
    year: "2024",
    tags: ["D3.js", "React", "WebGL", "Data Viz"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    role: "Full Stack Developer",
    problem: "Data analysts were struggling to create compelling visualizations without deep technical knowledge, often resorting to static charts that failed to engage stakeholders.",
    solution: "Built an intuitive platform that allows users to create interactive, animated visualizations through a drag-and-drop interface while maintaining full customization options.",
    challenges: "Performance optimization for large datasets was critical. Implemented WebGL rendering and data streaming to handle millions of data points smoothly.",
    outcome: "Platform now serves 10,000+ users and has been featured in data visualization conferences. Average engagement time increased by 300%.",
  },
  {
    id: "3",
    slug: "project-gamma",
    title: "Project Gamma",
    description: "E-commerce experience reimagined",
    fullDescription: "A next-generation e-commerce platform that reimagines the online shopping experience through personalization, speed, and delightful micro-interactions.",
    year: "2023",
    tags: ["Next.js", "Stripe", "E-commerce", "Vercel"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    role: "Frontend Architect",
    problem: "Traditional e-commerce sites felt slow and impersonal, leading to high cart abandonment rates and low customer satisfaction.",
    solution: "Designed a lightning-fast storefront with AI-powered recommendations, instant search, and seamless checkout flow that adapts to user behavior.",
    challenges: "Integrating real-time inventory management with a responsive UI while maintaining sub-100ms page loads required innovative caching strategies.",
    outcome: "Conversion rate improved by 65%, page load times reduced to 0.8s, and customer satisfaction scores increased from 3.2 to 4.7 out of 5.",
  },
  {
    id: "4",
    slug: "project-delta",
    title: "Project Delta",
    description: "AI-powered content management system",
    fullDescription: "An intelligent CMS that leverages AI to automate content workflows, suggest improvements, and optimize for SEO—all while maintaining the simplicity content creators need.",
    year: "2023",
    tags: ["AI", "CMS", "Python", "OpenAI"],
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    role: "Technical Lead",
    problem: "Content teams were overwhelmed with manual tasks—from SEO optimization to image resizing—that distracted from actual content creation.",
    solution: "Built an AI-first CMS that automates repetitive tasks, provides real-time SEO suggestions, and generates alt text and summaries automatically.",
    challenges: "Ensuring AI suggestions were helpful without being intrusive required extensive user research and iterative prompt engineering.",
    outcome: "Content production velocity increased by 200%, SEO scores improved by an average of 35 points, and editors reported 90% satisfaction with AI suggestions.",
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
  return mockProjects.slice(0, limit);
}

import { BlogPost } from '@/types/api.types';

const mockPosts: BlogPost[] = [
  {
    id: "1",
    slug: "building-scalable-apis-nestjs",
    title: "Building Scalable APIs with NestJS and PostgreSQL",
    excerpt: "A comprehensive guide to building production-ready APIs with proper authentication, validation, and RBAC.",
    date: "Dec 2024",
    readTime: "8 min",
    tags: ["NestJS", "PostgreSQL", "API"],
    claps: 280,
    externalUrl: "https://medium.com/@gyanprakash",
  },
  {
    id: "2",
    slug: "migrating-legacy-laravel-to-modern-stack",
    title: "Migrating Legacy Laravel Apps to Modern Stack",
    excerpt: "Lessons learned from migrating a production Laravel/MySQL system to React, NestJS, and PostgreSQL.",
    date: "Nov 2024",
    readTime: "12 min",
    tags: ["Migration", "React", "NestJS"],
    claps: 156,
    externalUrl: "https://medium.com/@gyanprakash",
  },
  {
    id: "3",
    slug: "implementing-rbac-from-scratch",
    title: "Implementing RBAC from Scratch in NestJS",
    excerpt: "A deep dive into building role-based access control with guards, decorators, and database-driven permissions.",
    date: "Oct 2024",
    readTime: "10 min",
    tags: ["Security", "NestJS", "RBAC"],
    claps: 342,
    externalUrl: "https://medium.com/@gyanprakash",
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBlogPosts(): Promise<BlogPost[]> {
  await delay(300);
  return mockPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await delay(200);
  return mockPosts.find(post => post.slug === slug);
}

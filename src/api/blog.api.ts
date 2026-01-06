import { BlogPost } from '@/types';

const mockPosts: BlogPost[] = [];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getBlogPosts(): Promise<BlogPost[]> {
  await delay(300);
  return mockPosts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  await delay(200);
  return mockPosts.find(post => post.slug === slug);
}

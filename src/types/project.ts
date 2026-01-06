export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  fullDescription?: string;
  year: string;
  tags: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
  role?: string;
  problem?: string;
  solution?: string;
  challenges?: string;
  outcome?: string;
}

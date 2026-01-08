import { GitHubContributionDay, GitHubHeatmapType, GitHubWeek } from "@/types/api.types";

const LEVEL_THRESHOLDS = [0, 1, 5, 10, 20];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < LEVEL_THRESHOLDS[2]) return 1;
  if (count < LEVEL_THRESHOLDS[3]) return 2;
  if (count < LEVEL_THRESHOLDS[4]) return 3;
  return 4;
}

export interface GitHubRepoAPI {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
}

/**
 * Fetch real GitHub contributions using a public CORS-friendly API
 */
export async function fetchGitHubHeatmap(
  username: string
): Promise<GitHubHeatmapType> {
  const res = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${username}?y=last`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  const data = await res.json();
  
  // Transform the API response to our format
  const contributionsByWeek: Map<number, GitHubContributionDay[]> = new Map();
  let total = data.total?.lastYear || 0;

  // The API returns contributions as an array of { date, count, level }
  if (data.contributions) {
    data.contributions.forEach((contribution: { date: string; count: number; level: number }) => {
      const date = new Date(contribution.date);
      const weekNumber = getWeekNumber(date);
      
      if (!contributionsByWeek.has(weekNumber)) {
        contributionsByWeek.set(weekNumber, []);
      }
      
      contributionsByWeek.get(weekNumber)!.push({
        date: contribution.date,
        count: contribution.count,
        level: getLevel(contribution.count),
      });
    });
  }

  const weeks: GitHubWeek[] = Array.from(contributionsByWeek.values()).map(days => ({ days }));

  return { total, weeks };
}

function getWeekNumber(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + startOfYear.getDay() + 1) / 7);
}

/**
 * Fetch real top GitHub repositories using public API
 */
export async function fetchTopGitHubRepos(username: string): Promise<GitHubRepoAPI[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=stars&per_page=100&type=owner`,
    {
      headers: {
        'Accept': 'application/vnd.github.mercy-preview+json'
      }
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  const repos: GitHubRepoAPI[] = await res.json();
  
  // Filter out forks and sort by stars, return top 6
  return repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6);
}

import { addDays, format, parseISO, startOfWeek } from "date-fns";
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
  watchers_count: number;
  language: string | null;
  topics: string[];
  fork: boolean;
  created_at: string;
  updated_at: string;
  license: { name: string } | null;
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
  // IMPORTANT: last-year contributions span multiple calendar years.
  // Grouping by plain "week number" will collide and create weeks with > 7 days.
  // We instead group by the *week start date* (Sunday) to guarantee 7 rows.
  const contributionsByWeekStart = new Map<string, Map<string, GitHubContributionDay>>();
  const total = data.total?.lastYear || 0;

  let minDay: string | null = null;
  let maxDay: string | null = null;

  if (data.contributions) {
    for (const contribution of data.contributions as Array<{ date: string; count: number; level: number }>) {
      const d = parseISO(contribution.date);
      const dayKey = format(d, "yyyy-MM-dd");
      const weekStart = startOfWeek(d, { weekStartsOn: 0 });
      const weekKey = format(weekStart, "yyyy-MM-dd");

      if (!minDay || dayKey < minDay) minDay = dayKey;
      if (!maxDay || dayKey > maxDay) maxDay = dayKey;

      if (!contributionsByWeekStart.has(weekKey)) {
        contributionsByWeekStart.set(weekKey, new Map());
      }

      contributionsByWeekStart.get(weekKey)!.set(dayKey, {
        date: dayKey,
        count: contribution.count,
        level: getLevel(contribution.count),
      });
    }
  }

  if (!minDay || !maxDay) {
    return { total, weeks: [] };
  }

  const rangeStart = startOfWeek(parseISO(minDay), { weekStartsOn: 0 });
  const rangeEnd = startOfWeek(parseISO(maxDay), { weekStartsOn: 0 });

  const weeks: GitHubWeek[] = [];
  for (let cursor = rangeStart; cursor <= rangeEnd; cursor = addDays(cursor, 7)) {
    const weekKey = format(cursor, "yyyy-MM-dd");
    const byDate = contributionsByWeekStart.get(weekKey);

    const days: GitHubContributionDay[] = [];
    for (let i = 0; i < 7; i++) {
      const day = addDays(cursor, i);
      const dayKey = format(day, "yyyy-MM-dd");
      days.push(byDate?.get(dayKey) ?? { date: dayKey, count: 0, level: 0 });
    }

    weeks.push({ days });
  }

  return { total, weeks };
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
  
  // Filter out forks and sort by stars, return top 12 for filtering
  return repos
    .filter(repo => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 12);
}

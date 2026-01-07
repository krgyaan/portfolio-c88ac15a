import { GitHubContribution, GitHubContributionDay, GitHubHeatmapType, GitHubRepo, GitHubWeek } from "@/types/api.types";

const LEVEL_THRESHOLDS = [0, 1, 5, 10, 20];

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count < LEVEL_THRESHOLDS[2]) return 1;
  if (count < LEVEL_THRESHOLDS[3]) return 2;
  if (count < LEVEL_THRESHOLDS[4]) return 3;
  return 4;
}

export async function getGitHubContributions(): Promise<GitHubContribution> {
  const res = await fetch("/mock/github-contributions.json");

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub contributions");
  }

  return res.json();
}

/**
 * Top open-source repositories
 */
export async function getTopGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch("/mock/github-repos.json");

  if (!res.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  return res.json();
}

export async function fetchGitHubHeatmap(
  username: string
): Promise<GitHubHeatmapType> {
  const res = await fetch(
    `https://github.com/users/${username}/contributions`
  );

  const text = await res.text();
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  const weeks: GitHubWeek[] = [];
  let total = 0;

  doc.querySelectorAll("svg g").forEach((weekEl) => {
    const days: GitHubContributionDay[] = [];

    weekEl.querySelectorAll("rect").forEach((dayEl) => {
      const count = Number(dayEl.getAttribute("data-count") || 0);
      const date = dayEl.getAttribute("data-date") || "";

      total += count;

      days.push({
        date,
        count,
        level: getLevel(count),
      });
    });

    if (days.length) {
      weeks.push({ days });
    }
  });

  return { total, weeks };
}

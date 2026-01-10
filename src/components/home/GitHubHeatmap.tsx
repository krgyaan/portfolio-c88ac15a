import { useEffect, useState } from "react";
import { fetchGitHubHeatmap } from "@/api/github.api";
import { cn } from "@/lib/utils";
import { GitHubHeatmapType } from "@/types/api.types";
import { ExternalLink } from "lucide-react";

const LEVEL_STYLES = [
  "bg-secondary",
  "bg-muted-foreground/30",
  "bg-muted-foreground/50",
  "bg-muted-foreground/70",
  "bg-foreground",
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubHeatmap({ username }: { username: string }) {
  const [data, setData] = useState<GitHubHeatmapType | null>(null);

  useEffect(() => {
    fetchGitHubHeatmap(username).then(setData);
  }, [username]);

  if (!data) return null;

  // Calculate month labels positions based on weeks
  const getMonthLabels = () => {
    const labels: { month: string; position: number }[] = [];
    let currentMonth = -1;
    
    data.weeks.forEach((week, index) => {
      if (week.days.length > 0) {
        const date = new Date(week.days[0].date);
        const month = date.getMonth();
        if (month !== currentMonth) {
          labels.push({ month: MONTHS[month], position: index });
          currentMonth = month;
        }
      }
    });
    
    return labels;
  };

  const monthLabels = getMonthLabels();
  const currentYear = new Date().getFullYear();

  return (
    <section className="py-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-foreground">GitHub Activity</h2>
          <span className="text-xs text-muted-foreground font-mono">
            {data.total} activities in {currentYear}
          </span>
        </div>
        
        {/* Month labels */}
        <div className="relative h-5">
          <div className="flex text-xs text-muted-foreground">
            {monthLabels.map((label, idx) => (
              <span
                key={idx}
                className="absolute"
                style={{ left: `${label.position * 13}px` }}
              >
                {label.month}
              </span>
            ))}
          </div>
        </div>

        {/* Heatmap grid */}
        <div className="overflow-x-auto">
          <div className="inline-flex gap-[3px] flex-nowrap" style={{ minWidth: 'max-content' }}>
            {data.weeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-[3px] flex-shrink-0">
                {week.days.slice(0, 7).map((day) => (
                  <div
                    key={day.date}
                    title={`${day.count} contributions on ${day.date}`}
                    className={cn(
                      "h-[10px] w-[10px] rounded-sm flex-shrink-0 transition-colors",
                      LEVEL_STYLES[day.level]
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend and link */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span>Less</span>
            {LEVEL_STYLES.map((cls, i) => (
              <div key={i} className={cn("h-3 w-3 rounded-sm", cls)} />
            ))}
            <span>More</span>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-foreground transition-colors"
          >
            Follow me on GitHub
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}

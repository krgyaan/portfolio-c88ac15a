import { useEffect, useState } from "react";
import { fetchGitHubHeatmap } from "@/api/github.api";
import { cn } from "@/lib/utils";
import { GitHubHeatmapType } from "@/types/api.types";
import { Section } from "../ui/Section";
import { ExternalLink } from "lucide-react";

const LEVEL_STYLES = [
    "bg-muted",
    "bg-neutral-700",
    "bg-neutral-500",
    "bg-neutral-300",
    "bg-white",
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

    return (
        <Section>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">GitHub Activity</h3>
                
                {/* Month labels */}
                <div className="relative">
                    <div className="flex text-xs text-muted-foreground mb-2" style={{ marginLeft: '0px' }}>
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
                <div className="overflow-x-auto pt-4">
                    <div className="inline-flex gap-[3px] flex-nowrap" style={{ minWidth: 'max-content' }}>
                        {data.weeks.map((week, wIdx) => {
                            // Get the day of week for the first day (0 = Sunday, 6 = Saturday)
                            const firstDayOfWeek = week.days.length > 0 
                                ? new Date(week.days[0].date).getDay() 
                                : 0;
                            
                            // Create padding for incomplete weeks at the start
                            const paddingDays = wIdx === 0 ? firstDayOfWeek : 0;
                            
                            return (
                                <div key={wIdx} className="flex flex-col gap-[3px] flex-shrink-0">
                                    {/* Add empty cells for padding */}
                                    {Array.from({ length: paddingDays }).map((_, i) => (
                                        <div
                                            key={`pad-${i}`}
                                            className="h-[10px] w-[10px]"
                                        />
                                    ))}
                                    {week.days.map((day) => (
                                        <div
                                            key={day.date}
                                            title={`${day.count} contributions on ${day.date}`}
                                            className={cn(
                                                "h-[10px] w-[10px] rounded-sm flex-shrink-0",
                                                LEVEL_STYLES[day.level]
                                            )}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{data.total} contributions in the last year</span>

                    <div className="flex items-center gap-1">
                        <span>Less</span>
                        {LEVEL_STYLES.map((cls, i) => (
                            <div key={i} className={cn("h-3 w-3 rounded-sm", cls)} />
                        ))}
                        <span>More</span>
                    </div>
                </div>

                {/* Follow me link */}
                <div className="flex justify-end pt-2">
                    <a
                        href={`https://github.com/${username}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        Follow me on GitHub
                        <ExternalLink className="h-3 w-3" />
                    </a>
                </div>
            </div>
        </Section>
    );
}

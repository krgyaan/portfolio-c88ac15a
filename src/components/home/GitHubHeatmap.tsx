import { useEffect, useState } from "react";
import { fetchGitHubHeatmap } from "@/api/github.api";
import { cn } from "@/lib/utils";
import { GitHubHeatmapType } from "@/types/api.types";
import { Section } from "../ui/Section";

const LEVEL_STYLES = [
    "bg-muted",
    "bg-neutral-700",
    "bg-neutral-500",
    "bg-neutral-300",
    "bg-white",
];

export function GitHubHeatmap({ username }: { username: string }) {
    const [data, setData] = useState<GitHubHeatmapType | null>(null);

    useEffect(() => {
        fetchGitHubHeatmap(username).then(setData);
    }, [username]);

    if (!data) return null;

    return (
        <Section>
            <div className="space-y-4">
                <div className="flex gap-[3px]">
                    {data.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                            {week.days.map((day) => (
                                <div
                                    key={day.date}
                                    title={`${day.count} contributions on ${day.date}`}
                                    className={cn(
                                        "h-[10px] w-[10px] rounded-sm",
                                        LEVEL_STYLES[day.level]
                                    )}
                                />
                            ))}
                        </div>
                    ))}
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
            </div>
        </Section>
    );
}

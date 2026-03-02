import { useAnimeTheme } from "@/contexts/AnimeThemeContext";

export function Footer() {
  const { theme } = useAnimeTheme();
  const labels = theme.labels.footer;

  const localTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <footer className="mt-auto pt-8">
      <div className="divider-line mb-6" />
      
      {/* Quote */}
      {labels.quote && (
        <div className="mb-6 text-center">
          <p className="text-sm italic text-muted-foreground font-body">
            "{labels.quote}"
            {labels.author && (
              <span className="ml-2">— {labels.author}</span>
            )}
          </p>
        </div>
      )}
      
      <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between pb-6">
        <div className="flex items-center gap-2">
          <span className="text-lg">{theme.emoji}</span>
          <div>
            <span>{labels.crafted} </span>
            <span className="text-foreground font-pirate text-sm">{labels.brandName}</span>
            <p className="mt-1 text-muted-foreground/70">©2026. All rights reserved.</p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="font-mono">
            <span className="text-muted-foreground/70">{labels.timeLabel} </span>
            <span className="text-foreground">{localTime}</span>
          </span>
          <span className="font-mono text-muted-foreground/70">
            New Delhi, India
          </span>
        </div>
      </div>
    </footer>
  );
}

import { useEffect, useState } from "react";
import { getSiteConfig } from "@/api";
import { SiteConfig } from "@/types/api.types";
import { Skull } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState(new Date());
  const [config, setConfig] = useState<SiteConfig | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    getSiteConfig().then(setConfig);
    return () => clearInterval(timer);
  }, []);

  const localTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <footer className="mt-auto pt-8">
      <div className="divider-line mb-6" />
      
      {/* Quote */}
      {config?.footer.quote && (
        <div className="mb-6 text-center">
          <p className="text-sm italic text-muted-foreground font-body">
            "{config.footer.quote}"
            {config.footer.author && (
              <span className="ml-2">— {config.footer.author}</span>
            )}
          </p>
        </div>
      )}
      
      <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between pb-6">
        <div className="flex items-center gap-2">
          <Skull className="h-4 w-4 text-op-gold" />
          <div>
            <span>Crafted by </span>
            <span className="text-foreground font-pirate text-sm">Nakama Gyan</span>
            <p className="mt-1 text-muted-foreground/70">©2026. All rights reserved.</p>
          </div>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <span className="font-mono">
            <span className="text-muted-foreground/70">Ship's Log: </span>
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

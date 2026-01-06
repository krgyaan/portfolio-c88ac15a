import { useEffect, useState } from "react";
import { Divider } from "@/components/ui/Divider";

export function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const localTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <footer className="mt-auto">
      <Divider />
      <div className="content-container py-8">
        <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>
            <span>Designed & Developed by </span>
            <span className="text-foreground font-medium">Gyan</span>
            <p className="mt-1 text-muted-foreground/70">©2026. All rights reserved.</p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1">
            <span className="font-mono">
              Visitors <span className="text-foreground">#1858</span>
            </span>
            <span className="font-mono text-muted-foreground/70">
              Pune, India, {localTime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

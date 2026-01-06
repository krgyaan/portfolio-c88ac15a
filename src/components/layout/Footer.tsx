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
    hour12: false,
  });

  return (
    <footer className="mt-auto">
      <Divider />
      <div className="content-container py-8">
        <div className="flex flex-col gap-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <span>Designed & Developed by [Name]</span>
          <div className="flex items-center gap-4">
            <span className="font-mono">Visitors: 1,234</span>
            <span className="hidden h-3 w-px bg-border md:block" />
            <span className="font-mono">
              New York, NY — {localTime}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

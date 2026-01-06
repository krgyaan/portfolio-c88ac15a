import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function KanjiTooltip() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-center mb-8">
      <TooltipProvider delayDuration={100}>
        <Tooltip open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <span 
              className="text-[8rem] md:text-[12rem] font-bold text-muted-foreground/20 leading-none tracking-tighter cursor-default select-none hover:text-muted-foreground/30 transition-colors"
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              改善
            </span>
          </TooltipTrigger>
          <TooltipContent 
            side="bottom" 
            className="bg-card border border-border px-4 py-3 max-w-[200px]"
            sideOffset={8}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <span className="text-lg font-semibold text-foreground">改善</span>
                <span className="text-sm text-muted-foreground italic">/kaizen/</span>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">noun</span>
                <p className="text-sm text-muted-foreground">
                  Continuous improvement; changing for the better.
                </p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

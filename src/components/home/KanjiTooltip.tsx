import { useEffect, useState } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { getKanji } from "@/api/kanji.api";
import { KanjiItem } from "@/types/api.types";

export function KanjiTooltip() {
    const [open, setOpen] = useState(false);
    const [kanji, setKanji] = useState<KanjiItem | null>(null);

    useEffect(() => {
        getKanji().then((data) => {
            setKanji(data[0]);
        });
    }, []);

    if (!kanji) return null;

    return (
        <div className="flex items-center justify-center mb-8">
            <TooltipProvider delayDuration={100}>
                <Tooltip open={open} onOpenChange={setOpen}>
                    <TooltipTrigger asChild>
                        <span
                            className="text-[8rem] md:text-[12rem] font-bold text-muted-foreground/20 leading-none tracking-tighter cursor-default select-none hover:text-muted-foreground/50 transition-colors"
                            onMouseEnter={() => setOpen(true)}
                            onMouseLeave={() => setOpen(false)}
                        >
                            {kanji.symbol}
                        </span>
                    </TooltipTrigger>

                    <TooltipContent
                        side="bottom"
                        sideOffset={8}
                        className="bg-card border border-border px-4 py-3 max-w-[220px]"
                    >
                        <div className="space-y-2">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-lg font-semibold text-foreground">
                                    {kanji.symbol}
                                </span>
                                <span className="text-sm text-muted-foreground italic">
                                    {kanji.reading}
                                </span>
                            </div>

                            <div>
                                <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                                    {kanji.partOfSpeech}
                                </span>
                                <p className="text-sm text-muted-foreground">
                                    {kanji.meaning}
                                </p>
                            </div>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

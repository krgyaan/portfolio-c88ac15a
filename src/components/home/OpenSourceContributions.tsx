import { GitPullRequest, GitMerge } from "lucide-react";
import { Section } from "../ui/Section";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const contributions = [
    {
        repo: "dodopayments/billingsdk",
        description: "Nestjs cli support for dodopayments and stripe for billingsdk",
        type: "merged" as const,
    },
    {
        repo: "vercel/next.js",
        description: "Add ShadCN UI Integration to create-next-app",
        type: "pr" as const,
    },
    {
        repo: "Dialectica-ai/dialectica-ai",
        description: "chore: add router functionality for navigation in LandingPage",
        type: "merged" as const,
    },
];

function ContributionItem({ item }: { item: typeof contributions[0] }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger className="flex items-center justify-between w-full py-3 text-left hover:bg-muted/30 transition-colors rounded px-2 -mx-2">
                <div className="flex items-center gap-3">
                    {item.type === "merged" ? (
                        <GitMerge className="h-4 w-4 text-purple-400" />
                    ) : (
                        <GitPullRequest className="h-4 w-4 text-green-400" />
                    )}
                    <span className="font-mono text-sm text-primary">{item.repo}</span>
                    <span className="text-sm text-muted-foreground hidden sm:inline">
                        {item.description}
                    </span>
                </div>
                <ChevronDown
                    className={cn(
                        "h-4 w-4 text-muted-foreground transition-transform duration-200",
                        isOpen && "rotate-180"
                    )}
                />
            </CollapsibleTrigger>
            <CollapsibleContent className="pl-7 pb-2">
                <p className="text-sm text-muted-foreground sm:hidden">
                    {item.description}
                </p>
            </CollapsibleContent>
        </Collapsible>
    );
}

export function OpenSourceContributions() {
    return (
        <Section>
            <div className="space-y-2">
                <h3 className="text-xl font-semibold mb-4">Open Source Contributions</h3>
                <div className="space-y-0">
                    {contributions.map((item) => (
                        <ContributionItem key={item.repo} item={item} />
                    ))}
                </div>
            </div>
        </Section>
    );
}

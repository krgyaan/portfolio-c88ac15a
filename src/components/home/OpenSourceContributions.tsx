import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "../ui/Section";

const contributions = [
    {
        repo: "dodopayments/billingsdk",
        description:
            "NestJS CLI support for Dodopayments and Stripe billing SDK",
    },
    {
        repo: "vercel/next.js",
        description: "Add shadcn/ui integration to create-next-app",
    },
    {
        repo: "Dialectica-ai/dialectica-ai",
        description:
            "Add router functionality for navigation in landing page",
    },
];

export function OpenSourceContributions() {
    return (
        <Section>
            <div className="space-y-4">
                <h3 className="text-xl font-semibold">Open Source Contributions</h3>

                <Accordion type="single" collapsible>
                    {contributions.map((item) => (
                        <AccordionItem key={item.repo} value={item.repo}>
                            <AccordionTrigger className="text-left">
                                <span className="font-mono">{item.repo}</span>
                            </AccordionTrigger>
                            <AccordionContent className="text-sm text-muted-foreground">
                                {item.description}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </Section>
    );
}

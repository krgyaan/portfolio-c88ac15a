import { useState } from "react";
import { Experience } from "@/types/api.types";
import { ChevronDown } from "lucide-react";
import clsx from "clsx";

interface ExperienceItemProps {
    experience: Experience;
    index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="py-5">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    {/* Left */}
                    <div className="flex items-center gap-3">
                        {experience.logoUrl ? (
                            <img
                                src={experience.logoUrl}
                                alt={experience.company}
                                className="w-8 h-8 rounded-full object-contain bg-muted"
                            />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                                <span className="text-xs font-mono text-muted-foreground">
                                    {experience.company.charAt(0)}
                                </span>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <span className="font-medium text-foreground">
                                    {experience.company}
                                </span>
                                <span className="text-muted-foreground">/</span>
                                <span className="text-muted-foreground text-base">
                                    {experience.role}
                                </span>
                            </div>
                            <span className="text-xs font-mono text-muted-foreground">
                                {experience.period}
                            </span>
                        </div>
                    </div>

                    {/* Right */}
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className="flex items-center gap-2 text-[10px] font-mono text-muted-foreground hover:text-foreground transition"
                    >
                        {open ? "Collapse details" : "Expand details"}
                        <ChevronDown
                            className={clsx(
                                "h-4 w-4 transition-transform",
                                open && "rotate-180"
                            )}
                        />
                    </button>
                </div>

                {/* Collapsible Content */}
                <div
                    className={clsx(
                        "grid transition-all duration-300 ease-in-out",
                        open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                    )}
                >
                    <div className="overflow-hidden">
                        {experience.highlights?.length > 0 && (
                            <ul className="space-y-2 pl-6">
                                {experience.highlights.map((highlight, idx) => (
                                    <li
                                        key={idx}
                                        className="text-base text-muted-foreground font-mono relative before:content-['•'] before:absolute before:-left-4 before:text-muted-foreground/50"
                                    >
                                        {highlight}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import { Experience } from "@/types";
import { Divider } from "@/components/ui/Divider";
import { ExternalLink } from "lucide-react";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  return (
    <div
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="py-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            {experience.logoUrl ? (
              <img
                src={experience.logoUrl}
                alt={experience.company}
                className="w-5 h-5 rounded-sm object-contain"
              />
            ) : (
              <div className="w-5 h-5 rounded-sm bg-muted flex items-center justify-center">
                <span className="text-xs font-mono text-muted-foreground">
                  {experience.company.charAt(0)}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <a
                href="#"
                className="font-medium text-accent hover:underline underline-offset-2 flex items-center gap-1"
              >
                {experience.company}
              </a>
              <span className="text-muted-foreground">/</span>
              <span className="text-muted-foreground text-sm">{experience.role}</span>
            </div>
          </div>
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
            {experience.period}
            <ExternalLink className="h-3 w-3" />
          </span>
        </div>

        {experience.highlights && experience.highlights.length > 0 && (
          <ul className="space-y-1.5 pl-8">
            {experience.highlights.map((highlight, idx) => (
              <li
                key={idx}
                className="text-sm text-muted-foreground font-mono relative before:content-['•'] before:absolute before:-left-4 before:text-muted-foreground/50"
              >
                {highlight}
              </li>
            ))}
          </ul>
        )}
      </div>
      <Divider />
    </div>
  );
}

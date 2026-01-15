import { useState } from "react";
import { Experience } from "@/types/api.types";
import { ChevronDown, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  experience: Experience;
  index: number;
}

export function ExperienceItem({ experience, index }: ExperienceItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="py-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          {/* Left - Logo and Info */}
          <div className="flex items-start gap-4">
            {/* Company Logo */}
            {experience.logoUrl ? (
              <img
                src={experience.logoUrl}
                alt={experience.company}
                className="w-12 h-12 rounded-lg object-contain bg-secondary border border-border"
              />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-semibold text-muted-foreground">
                  {experience.company.charAt(0)}
                </span>
              </div>
            )}

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-foreground">
                  {experience.company}
                </h3>
                {experience.employmentType && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border">
                    {experience.employmentType}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {experience.role}
              </p>
            </div>
          </div>

          {/* Right - Date, Location, and Toggle */}
          <div className="flex items-start gap-3 flex-shrink-0">
            <div className="text-right">
              <span className="text-xs font-mono text-muted-foreground">
                {experience.period}
              </span>
              {experience.location && (
                <div className="flex items-center justify-end gap-1 mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {experience.location}
                </div>
              )}
            </div>

            {/* Toggle Button - only chevron */}
            {experience.highlights && experience.highlights.length > 0 && (
              <button
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-secondary"
              >
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Content */}
        <div
          className={cn(
            "grid transition-all duration-300 ease-in-out",
            open ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            {experience.highlights && experience.highlights.length > 0 && (
              <ul className="space-y-2 pl-16 pr-4">
                {experience.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-muted-foreground relative before:content-['→'] before:absolute before:-left-5 before:text-muted-foreground/50"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Technology Tags */}
            {experience.technologies && experience.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pl-16">
                {experience.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider-line" />
    </div>
  );
}

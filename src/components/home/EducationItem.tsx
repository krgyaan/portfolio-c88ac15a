import { useState } from "react";
import { Education } from "@/types/api.types";
import { ChevronDown, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";

interface EducationItemProps {
  education: Education;
  index: number;
}

export function EducationItem({ education, index }: EducationItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="py-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          {/* Left - Icon and Info */}
          <div className="flex items-start gap-3">
            {/* Graduation Cap Icon */}
            <div className="w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center flex-shrink-0">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">
                {education.institution}
              </h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {education.degree}{education.field ? ` in ${education.field}` : ""}
              </p>
            </div>
          </div>

          {/* Right - Period and Toggle */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xs font-mono text-muted-foreground">
              {education.period}
            </span>

            {/* Toggle Button */}
            {education.highlights && education.highlights.length > 0 && (
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
            {education.highlights && education.highlights.length > 0 && (
              <ul className="space-y-2 pl-13 pr-4">
                {education.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-muted-foreground relative before:content-['•'] before:absolute before:-left-4 before:text-muted-foreground"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Skill Tags */}
            {education.skills && education.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-4 pl-13">
                {education.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {skill}
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

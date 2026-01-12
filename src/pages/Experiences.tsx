import { useEffect, useState } from "react";
import { getExperiences } from "@/api";
import { Experience } from "@/types/api.types";
import { MapPin, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Experiences = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getExperiences();
      setExperiences(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-40 bg-secondary rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {experiences.map((experience, index) => (
        <article
          key={experience.id}
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

              {/* Right - Date and Location */}
              <div className="text-right flex-shrink-0">
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
            </div>

            {/* Highlights - Always visible on this page */}
            {experience.highlights && experience.highlights.length > 0 && (
              <div className="mt-4">
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
            )}
          </div>

          {/* Divider */}
          {index < experiences.length - 1 && <div className="divider-line" />}
        </article>
      ))}
    </div>
  );
};

export default Experiences;

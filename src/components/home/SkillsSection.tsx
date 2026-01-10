import { useEffect, useState } from "react";
import { getSkills } from "@/api/skills.api";
import { SkillCategory } from "@/types/api.types";
import { List, Grid3X3 } from "lucide-react";
import { cn } from "@/lib/utils";

type ViewMode = 'badges' | 'detailed';

export function SkillsSection() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Persist user preference
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('skills-view-mode') as ViewMode) || 'badges';
    }
    return 'badges';
  });

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    localStorage.setItem('skills-view-mode', mode);
  };

  return (
    <section className="py-8">
      {/* Header with toggle */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-base font-semibold text-foreground">
          Skills
        </h2>
        
        {/* View mode toggle */}
        <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary">
          <button
            onClick={() => handleViewModeChange('badges')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
              viewMode === 'badges'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            Badges
          </button>
          <button
            onClick={() => handleViewModeChange('detailed')}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
              viewMode === 'detailed'
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <List className="h-3.5 w-3.5" />
            Detailed
          </button>
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'badges' ? (
        <BadgesView skills={skills} />
      ) : (
        <DetailedView skills={skills} />
      )}
    </section>
  );
}

function BadgesView({ skills }: { skills: SkillCategory[] }) {
  return (
    <div className="space-y-6">
      {skills.map((category) => (
        <div key={category.id}>
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-3">
            {category.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {category.skills.map((skill) => (
              <span
                key={skill.name}
                className="skill-badge"
                title={skill.description}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DetailedView({ skills }: { skills: SkillCategory[] }) {
  return (
    <div className="space-y-8">
      {skills.map((category) => (
        <div key={category.id}>
          <h3 className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
            {category.title}
          </h3>
          <div className="space-y-3">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-6"
              >
                <span className="font-mono text-sm text-foreground font-medium">
                  {skill.name}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
          <div className="divider-line mt-6" />
        </div>
      ))}
    </div>
  );
}

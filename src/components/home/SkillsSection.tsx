import { useEffect, useState } from "react";
import { LayoutGrid, List, Anchor, Swords, Flame, ScrollText, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillIcon } from "@/components/ui/SkillIcon";
import { getSkills } from "@/api";
import { SkillCategory } from "@/types/api.types";
import { useAnimeTheme } from "@/contexts/AnimeThemeContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Anchor, Swords, Flame, ScrollText, Target,
};

type ViewMode = "grid" | "list";

export const SkillsSection = () => {
  const { theme } = useAnimeTheme();
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");
  const [loading, setLoading] = useState(true);

  const SectionIcon = iconMap[theme.icons.skills] || Anchor;
  const categoryNames = theme.labels.skillCategories;
  const sectionTitle = theme.labels.sections.skills;

  useEffect(() => {
    async function fetchSkills() {
      const data = await getSkills();
      setSkills(data);
      setLoading(false);
    }
    fetchSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header flex items-center gap-2">
            <SectionIcon className="h-4 w-4" style={{ color: 'hsl(var(--theme-accent-1))' }} />
            {sectionTitle}
          </h2>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="section-header flex items-center gap-2">
          <SectionIcon className="h-4 w-4" style={{ color: 'hsl(var(--theme-accent-1))' }} />
          {sectionTitle}
        </h2>
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant={viewMode === "grid" ? "default" : "ghost"}
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            variant={viewMode === "list" ? "default" : "ghost"}
            className="h-8 w-8 p-0"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {skills.map((category) => (
          <div key={category.id} className="animate-fade-in">
            <h3 className="text-sm font-pirate text-muted-foreground mb-3 tracking-wide">
              {categoryNames[category.title] || category.title}
            </h3>

            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="group p-4 rounded-lg border bg-card/30 hover:bg-card/50 transition-all duration-200 ship-rock"
                    style={{ borderColor: 'hsl(var(--theme-accent-1) / 0.2)' }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                        <SkillIcon icon={skill.icon} size={18} />
                      </div>
                      <span className="font-medium text-foreground font-body">
                        {skill.name}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 font-body">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border bg-card/30 hover:bg-card/50 transition-all duration-200"
                    style={{ borderColor: 'hsl(var(--theme-accent-1) / 0.2)' }}
                  >
                    <SkillIcon icon={skill.icon} size={14} className="text-primary" />
                    <span className="text-sm font-medium text-foreground font-body">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

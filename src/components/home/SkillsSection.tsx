import { useEffect, useState } from "react";
import { getSkills } from "@/api/skills.api";
import { SkillCategory } from "@/types/api.types";
import { SkillIcon } from "@/components/ui/SkillIcon";

export function SkillsSection() {
  const [skills, setSkills] = useState<SkillCategory[]>([]);

  useEffect(() => {
    getSkills().then(setSkills);
  }, []);

  // Flatten all skills into a single array
  const allSkills = skills.flatMap((category) => category.skills);

  return (
    <section className="py-8">
      <h2 className="text-base font-semibold text-foreground mb-6">
        Skills
      </h2>
      
      <div className="flex flex-wrap gap-2 justify-center">
        {allSkills.map((skill) => (
          <span
            key={skill.name}
            className="skill-badge inline-flex items-center gap-1.5"
            title={skill.description}
          >
            <SkillIcon icon={skill.icon} size={14} className="opacity-70" />
            {skill.name}
          </span>
        ))}
      </div>
    </section>
  );
}

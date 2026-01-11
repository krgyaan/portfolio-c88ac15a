import { useEffect, useState } from "react";
import { getSkills } from "@/api/skills.api";
import { SkillCategory, Skill } from "@/types/api.types";
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
        Skills and Technologies.
      </h2>

      <div className="flex flex-wrap justify-center gap-2">
        {allSkills.map((skill) => (
          <SkillBadge key={skill.name} skill={skill} />
        ))}
      </div>
    </section>
  );
}

function SkillBadge({ skill }: { skill: Skill }) {
  return (
    <span
      className="skill-badge inline-flex items-center gap-1.5"
      title={skill.description}
    >
      <SkillIcon icon={skill.icon} size={14} />
      <span>{skill.name}</span>
    </span>
  );
}

import { useEffect, useState } from "react";
import { getSkills } from "@/api/skills.api";
import { SkillCategory } from "@/types/api.types";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";

export function SkillsSection() {
    const [skills, setSkills] = useState<SkillCategory[]>([]);

    useEffect(() => {
        getSkills().then(setSkills);
    }, []);

    return (
        <Section>
            <h2 className="text-base font-semibold text-foreground">
                Skills
            </h2>

            <div className="space-y-8">
                {skills.map((category) => (
                    <div key={category.id}>
                        {/* Category Title */}
                        <h3 className="text-xs uppercase tracking-wider text-muted-foreground my-4">
                            {category.title}
                        </h3>

                        {/* Skill Matrix */}
                        <div className="space-y-2">
                            {category.skills.map((skill) => (
                                <div
                                    key={skill.name}
                                    className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 md:gap-6"
                                >
                                    <span className="font-mono text-sm text-foreground">
                                        {skill.name}
                                    </span>
                                    <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                                        {skill.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <Divider className="mt-4" />
                    </div>
                ))}
            </div>
        </Section>
    );
}

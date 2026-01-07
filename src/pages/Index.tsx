import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Github, Linkedin, Mail, BadgeCheck, Code } from "lucide-react";
import { getProfile, getExperiences } from "@/api";
import { Profile, Experience } from "@/types/api.types";
import { KanjiTooltip } from "@/components/home/KanjiTooltip";
import { ExperienceItem } from "@/components/home/ExperienceItem";
import { CallToAction } from "@/components/home/CallToAction";
import { SkillsSection } from "@/components/home/SkillsSection";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Github, Linkedin, Mail, Code };

const Index = () => {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const [profileData, experienceData] = await Promise.all([
                getProfile(),
                getExperiences(),
            ]);
            setProfile(profileData);
            setExperiences(experienceData);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading || !profile) {
        return (
            <Section className="pt-10 md:pt-14">
                <div className="animate-pulse space-y-4">
                    <div className="h-24 w-24 rounded-full bg-muted" />
                    <div className="h-8 w-48 bg-muted rounded" />
                    <div className="h-4 w-64 bg-muted rounded" />
                </div>
            </Section>
        );
    }

    return (
        <>
            <Section className="pt-10 md:pt-14 relative overflow-hidden">
                {/* Large Kanji Background with Tooltip */}
                <KanjiTooltip />

                <div className="animate-fade-in relative z-10">
                    <div className="flex items-center gap-6 mb-6">
                        {/* Avatar */}
                        <div className="relative w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                            <img
                                src={profile.avatarUrl}
                                alt={profile.name}
                                className="w-full h-full rounded-full object-cover border-2 border-border"
                            />
                        </div>

                        {/* Name and Info */}
                        <div className="space-y-2">
                            <h1 className="text-2xl font-semibold leading-tight md:text-3xl flex items-center gap-2">
                                {profile.name}
                            </h1>
                            <p className="text-muted-foreground font-mono text-base">
                                {profile.age} · {profile.subtitle}
                            </p>
                            {/* Social Icons Row */}
                            <div className="flex items-center gap-3 pt-1">
                                {profile.socialLinks.map((link) => {
                                    const IconComponent = iconMap[link.icon];
                                    return (
                                        <a
                                            key={link.id}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                            aria-label={link.platform}
                                        >
                                            {IconComponent && <IconComponent className="h-4 w-4" />}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </Section>
            <Section>
                <h2 className="text-base font-semibold text-foreground">
                    About
                </h2>
                <p className="text-muted-foreground leading-relaxed font-mono text-sm">
                    {profile.about}
                </p>
            </Section>
            <Section>
                <h2 className="text-base font-semibold text-foreground">
                    Work Experience
                </h2>
                <div className="space-y-0">
                    {experiences.map((exp, index) => (
                        <ExperienceItem key={exp.id} experience={exp} index={index} />
                    ))}
                </div>
            </Section>
            <SkillsSection />
            <CallToAction socials={profile.socialLinks} />
        </>
    );
};

export default Index;

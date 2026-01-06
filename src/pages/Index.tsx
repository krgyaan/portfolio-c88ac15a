import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Card } from "@/components/ui/BrutalistCard";
import { ArrowRight, Github, Linkedin, Mail, Calendar, BadgeCheck, BookOpen } from "lucide-react";
import { getProfile, getExperiences } from "@/api";
import { Profile, Experience } from "@/types";
import { Button } from "@/components/ui/button";
import { KanjiTooltip } from "@/components/home/KanjiTooltip";
import { ExperienceItem } from "@/components/home/ExperienceItem";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail,
  BookOpen,
};

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
      <Section className="pt-20 md:pt-28">
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
      {/* Hero Section with Kanji Background */}
      <Section className="pt-20 md:pt-28 relative overflow-hidden">
        {/* Large Kanji Background with Tooltip */}
        <KanjiTooltip />

        <div className="animate-fade-in relative z-10">
          {/* Avatar + Name Row */}
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
                {profile.isVerified && (
                  <BadgeCheck className="h-5 w-5 text-blue-500 fill-blue-500/20" />
                )}
              </h1>
              <p className="text-muted-foreground font-mono text-sm">
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

      <Divider />

      {/* About Section */}
      <Section>
        <h2 className="mb-4 text-sm font-semibold text-foreground">
          About
        </h2>
        <p className="text-muted-foreground leading-relaxed max-w-2xl font-mono text-sm">
          {profile.about}
        </p>
      </Section>

      <Divider />

      {/* Work Experience Section */}
      <Section>
        <h2 className="mb-6 text-sm font-semibold text-foreground">
          Work Experience
        </h2>
        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </Section>

      <Divider />

      {/* CTA Card */}
      <Section className="pb-20">
        <Card className="text-center py-12 px-8 relative">
          {/* Corner decorations */}
          <span className="absolute top-4 left-4 text-muted-foreground/30 text-lg">+</span>
          <span className="absolute top-4 right-4 text-muted-foreground/30 text-lg">+</span>
          <span className="absolute bottom-4 left-4 text-muted-foreground/30 text-lg">+</span>
          <span className="absolute bottom-4 right-4 text-muted-foreground/30 text-lg">+</span>
          
          <h2 className="text-xl font-semibold mb-3">Let's work together</h2>
          <p className="text-muted-foreground text-sm mb-6">
            Have a project in mind? Let's create something amazing.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <a href={`mailto:${profile.email}`}>
                Email Me
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="gap-2"
            >
              <a href={profile.calendarUrl} target="_blank" rel="noopener noreferrer">
                Book a Call
                <ArrowRight className="h-3 w-3" />
              </a>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
};

export default Index;

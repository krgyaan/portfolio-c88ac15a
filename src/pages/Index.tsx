import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { Card, CardTitle, CardDescription } from "@/components/ui/BrutalistCard";
import { ArrowUpRight, Github, Twitter, Linkedin, Instagram, BadgeCheck, Mail, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { getProfile, getExperiences, getFeaturedProjects } from "@/api";
import { Profile, Experience, Project } from "@/types";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Twitter,
  Linkedin,
  Instagram,
};

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileData, experienceData, projectData] = await Promise.all([
        getProfile(),
        getExperiences(),
        getFeaturedProjects(3),
      ]);
      setProfile(profileData);
      setExperiences(experienceData);
      setProjects(projectData);
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
        {/* Large Kanji Background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span className="text-[20rem] md:text-[28rem] font-bold text-muted/[0.03] leading-none tracking-tighter">
            改善
          </span>
        </div>

        <div className="animate-fade-in space-y-6 relative z-10">
          {/* Avatar */}
          <div className="relative w-24 h-24 md:w-28 md:h-28">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full rounded-full object-cover border-2 border-border"
            />
          </div>

          {/* Name with Verification Badge */}
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold leading-tight md:text-4xl flex items-center gap-2">
              {profile.name}
              {profile.isVerified && (
                <BadgeCheck className="h-6 w-6 text-accent fill-accent/20" />
              )}
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              {profile.subtitle}
            </p>
          </div>

          {/* Social Icons Row */}
          <div className="flex items-center gap-4">
            {profile.socialLinks.map((link) => {
              const IconComponent = iconMap[link.icon];
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors p-2 -m-2 hover:bg-muted/50 rounded-lg"
                >
                  {IconComponent && <IconComponent className="h-5 w-5" />}
                </a>
              );
            })}
          </div>
        </div>
      </Section>

      <Divider />

      {/* About Section */}
      <Section>
        <h2 className="mb-6 text-sm font-mono uppercase tracking-wider text-muted-foreground">
          About
        </h2>
        <p className="text-foreground/90 leading-relaxed max-w-2xl">
          {profile.about}
        </p>
      </Section>

      <Divider />

      {/* Work Experience Section */}
      <Section>
        <h2 className="mb-8 text-sm font-mono uppercase tracking-wider text-muted-foreground">
          Work Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="group flex items-start justify-between gap-4 py-4 border-b border-border/50 last:border-0 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">{exp.company}</h3>
                <p className="text-sm text-muted-foreground">{exp.role}</p>
              </div>
              <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                {exp.period}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* Selected Work Section */}
      <Section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-sm font-mono uppercase tracking-wider text-muted-foreground">
            Selected Work
          </h2>
          <Link
            to="/projects"
            className="group flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            View all
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <div className="grid gap-4">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              to={`/projects/${project.slug}`}
              className="block animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card className="group">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {project.title}
                      <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      <Divider />

      {/* CTA Card */}
      <Section className="pb-20">
        <Card className="text-center py-12 px-8">
          <h2 className="text-2xl font-semibold mb-6">Let's work together</h2>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button
              asChild
              variant="outline"
              className="gap-2"
            >
              <a href={`mailto:${profile.email}`}>
                <Mail className="h-4 w-4" />
                Email Me
              </a>
            </Button>
            <Button
              asChild
              className="gap-2"
            >
              <a href={profile.calendarUrl} target="_blank" rel="noopener noreferrer">
                <Calendar className="h-4 w-4" />
                Book a Call
              </a>
            </Button>
          </div>
        </Card>
      </Section>
    </>
  );
};

export default Index;

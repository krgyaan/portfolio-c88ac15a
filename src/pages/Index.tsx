import { useEffect, useState } from "react";
import { getProfile, getExperiences, getSiteConfig } from "@/api";
import { Profile, Experience, SiteConfig } from "@/types/api.types";
import { ProfileCard } from "@/components/home/ProfileCard";
import { ExperienceItem } from "@/components/home/ExperienceItem";
import { CallToAction } from "@/components/home/CallToAction";
import { SkillsSection } from "@/components/home/SkillsSection";
import { OpenSourceContributions } from "@/components/home/OpenSourceContributions";
import { GitHubHeatmap } from "@/components/home/GitHubHeatmap";

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileData, experienceData, configData] = await Promise.all([
        getProfile(),
        getExperiences(),
        getSiteConfig(),
      ]);
      setProfile(profileData);
      setExperiences(experienceData);
      setConfig(configData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !profile) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-full bg-secondary" />
          <div className="space-y-3 flex-1">
            <div className="h-8 w-48 bg-secondary rounded" />
            <div className="h-4 w-64 bg-secondary rounded" />
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-36 bg-secondary rounded-lg" />
          <div className="h-10 w-32 bg-secondary rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Profile Section */}
      <ProfileCard profile={profile} config={config} />

      {/* Divider */}
      <div className="divider-line" />

      {/* About Section */}
      <section className="py-2">
        <h2 className="text-base font-semibold text-foreground mb-3">
          About
        </h2>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {profile.about}
        </p>
      </section>

      {/* Divider */}
      <div className="divider-line" />

      {/* Work Experience Section */}
      <section className="py-2">
        <h2 className="text-base font-semibold text-foreground mb-4">
          Work Experience
        </h2>
        <div>
          {experiences.map((exp, index) => (
            <ExperienceItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <SkillsSection />

      {/* Open Source Contributions */}
      <OpenSourceContributions />

      {/* GitHub Heatmap */}
      <GitHubHeatmap username="krgyaan" />

      {/* Call to Action */}
      <CallToAction socials={profile.socialLinks} />
    </div>
  );
};

export default Index;

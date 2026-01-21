import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, getExperiences, getSiteConfig, getFeaturedProjects, getEducation } from "@/api";
import { Profile, Experience, SiteConfig, Project, Education } from "@/types/api.types";
import { ProfileCard } from "@/components/home/ProfileCard";
import { ExperienceItem } from "@/components/home/ExperienceItem";
import { EducationItem } from "@/components/home/EducationItem";
import { GitHubHeatmap } from "@/components/home/GitHubHeatmap";
import { ProjectCard } from "@/components/home/ProjectCard";
import { SkillsSection } from "@/components/home/SkillsSection";
import { ArrowRight, Square } from "lucide-react";

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [education, setEducation] = useState<Education[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileData, experienceData, educationData, configData, projectsData] = await Promise.all([
        getProfile(),
        getExperiences(),
        getEducation(),
        getSiteConfig(),
        getFeaturedProjects(4),
      ]);
      setProfile(profileData);
      setExperiences(experienceData);
      setEducation(educationData);
      setConfig(configData);
      setProjects(projectsData);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading || !profile) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="flex items-start gap-5">
          <div className="h-20 w-20 rounded-xl bg-secondary" />
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

      {/* GitHub Heatmap - moved after profile */}
      <GitHubHeatmap username="krgyaan" />

      {/* Divider */}
      <div className="divider-line" />

      {/* Work Experience Section */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header flex items-center gap-2">
            <Square className="h-3 w-3 fill-current" />
            Experience
          </h2>
        </div>
        <div>
          {experiences.slice(0, 3).map((exp, index) => (
            <ExperienceItem key={exp.id} experience={exp} index={index} />
          ))}
        </div>
        {experiences.length > 3 && (
          <div className="flex justify-center mt-4">
            <Link to="/experiences" className="view-all-button">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </section>

      {/* Divider */}
      <div className="divider-line" />

      {/* Education Section */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header flex items-center gap-2">
            <Square className="h-3 w-3 fill-current" />
            Education
          </h2>
        </div>
        <div>
          {education.map((edu, index) => (
            <EducationItem key={edu.id} education={edu} index={index} />
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="divider-line" />

      {/* Projects Section */}
      {projects.length > 0 && (
        <>
          <section className="py-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-header flex items-center gap-2">
                <Square className="h-3 w-3 fill-current" />
                Projects
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link to="/projects" className="view-all-button">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </>
      )}

      {/* Divider */}
      <div className="divider-line" />

      {/* Skills Section */}
      <SkillsSection />
    </div>
  );
};

export default Index;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, getExperiences, getSiteConfig, getFeaturedProjects, getBlogPosts } from "@/api";
import { Profile, Experience, SiteConfig, Project, BlogPost } from "@/types/api.types";
import { ProfileCard } from "@/components/home/ProfileCard";
import { ExperienceItem } from "@/components/home/ExperienceItem";
import { CallToAction } from "@/components/home/CallToAction";
import { SkillsSection } from "@/components/home/SkillsSection";
import { OpenSourceContributions } from "@/components/home/OpenSourceContributions";
import { GitHubHeatmap } from "@/components/home/GitHubHeatmap";
import { ProjectCard } from "@/components/home/ProjectCard";
import { BlogCard } from "@/components/home/BlogCard";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [profileData, experienceData, configData, projectsData, blogData] = await Promise.all([
        getProfile(),
        getExperiences(),
        getSiteConfig(),
        getFeaturedProjects(4),
        getBlogPosts(),
      ]);
      setProfile(profileData);
      setExperiences(experienceData);
      setConfig(configData);
      setProjects(projectsData);
      setBlogPosts(blogData.slice(0, 3));
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

      {/* Work Experience Section */}
      <section className="py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="section-header">Experiences.</h2>
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

      {/* Projects Section */}
      {projects.length > 0 && (
        <>
          <section className="py-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="section-header">Projects.</h2>
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

          {/* Divider */}
          <div className="divider-line" />
        </>
      )}

      {/* Blog Section */}
      {blogPosts.length > 0 && (
        <>
          <section className="py-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="section-header">Blogs.</h2>
            </div>
            <div className="space-y-0">
              {blogPosts.map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Link to="/blog" className="view-all-button">
                View All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>

          {/* Divider */}
          <div className="divider-line" />
        </>
      )}

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

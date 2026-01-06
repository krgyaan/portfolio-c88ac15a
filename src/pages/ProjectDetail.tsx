import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { Divider } from "@/components/ui/Divider";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { getProjectBySlug } from "@/api";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProject() {
      if (!slug) {
        setError(true);
        setLoading(false);
        return;
      }
      const data = await getProjectBySlug(slug);
      if (!data) {
        setError(true);
      } else {
        setProject(data);
      }
      setLoading(false);
    }
    fetchProject();
  }, [slug]);

  if (loading) {
    return (
      <Section className="pt-20 md:pt-28">
        <div className="animate-pulse space-y-6">
          <div className="h-6 w-32 bg-muted rounded" />
          <div className="h-10 w-64 bg-muted rounded" />
          <div className="h-64 w-full bg-muted rounded" />
        </div>
      </Section>
    );
  }

  if (error || !project) {
    return (
      <Section className="pt-20 md:pt-28">
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-semibold">Project Not Found</h1>
          <p className="text-muted-foreground">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild variant="outline">
            <Link to="/projects">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Link>
          </Button>
        </div>
      </Section>
    );
  }

  return (
    <>
      <Section className="pt-20 md:pt-28">
        <Link
          to="/projects"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        <div className="space-y-6 animate-fade-in">
          <h1 className="text-3xl font-semibold md:text-4xl">
            {project.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {project.fullDescription || project.description}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            {project.liveUrl && (
              <Button asChild className="gap-2">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button asChild variant="outline" className="gap-2">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
          </div>
        </div>
      </Section>

      <Divider />

      {/* Hero Image */}
      <Section>
        <div className="overflow-hidden rounded-lg border border-border">
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full aspect-video object-cover"
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-card">
              <span className="font-mono text-sm text-muted-foreground">
                [ Project Preview ]
              </span>
            </div>
          )}
        </div>
      </Section>

      <Divider />

      {/* Project Meta */}
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Role
            </h3>
            <p className="text-foreground">{project.role || "Design & Development"}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Year
            </h3>
            <p className="text-foreground">{project.year}</p>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-mono rounded-sm border border-border bg-secondary/50 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Problem Section */}
      {project.problem && (
        <>
          <Divider />
          <Section>
            <h2 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              The Problem
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {project.problem}
            </p>
          </Section>
        </>
      )}

      {/* Solution Section */}
      {project.solution && (
        <>
          <Divider />
          <Section>
            <h2 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              The Solution
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {project.solution}
            </p>
          </Section>
        </>
      )}

      {/* Challenges Section */}
      {project.challenges && (
        <>
          <Divider />
          <Section>
            <h2 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Challenges
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {project.challenges}
            </p>
          </Section>
        </>
      )}

      {/* Outcome Section */}
      {project.outcome && (
        <>
          <Divider />
          <Section className="pb-20">
            <h2 className="mb-4 text-sm font-mono uppercase tracking-wider text-muted-foreground">
              Outcome
            </h2>
            <p className="text-foreground/90 leading-relaxed">
              {project.outcome}
            </p>
          </Section>
        </>
      )}
    </>
  );
};

export default ProjectDetail;

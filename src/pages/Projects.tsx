import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { getProjects } from "@/api";
import { Project } from "@/types";
import { Button } from "@/components/ui/button";

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      const data = await getProjects();
      setProjects(data);
      setLoading(false);
    }
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <Section className="pt-20 md:pt-28">
        <div className="mb-12 space-y-4">
          <div className="h-10 w-48 bg-muted rounded animate-pulse" />
          <div className="h-5 w-96 bg-muted rounded animate-pulse" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-muted rounded animate-pulse" />
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section className="pt-20 md:pt-28">
      <div className="mb-12 space-y-4 animate-fade-in">
        <h1 className="text-3xl font-semibold md:text-4xl">Projects</h1>
        <p className="text-muted-foreground">
          A collection of work spanning design systems, web applications, and
          creative experiments.
        </p>
      </div>

      <div className="space-y-6">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <Link
              to={`/projects/${project.slug}`}
              className="block"
            >
              <div className="flex flex-col md:flex-row gap-6 p-4 -mx-4 rounded-lg border border-transparent hover:border-border hover:bg-card/50 transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--glow-color)/0.1)]">
                {/* Thumbnail */}
                <div className="w-full md:w-48 h-32 md:h-32 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-mono text-xs text-muted-foreground">
                        [ Preview ]
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h2 className="text-lg font-medium text-foreground flex items-center gap-2">
                        {project.title}
                        <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </h2>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
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

                  {/* Buttons */}
                  <div className="flex items-center gap-3">
                    {project.liveUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.liveUrl, '_blank');
                        }}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-1.5 text-xs"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(project.githubUrl, '_blank');
                        }}
                      >
                        <Github className="h-3 w-3" />
                        GitHub
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </Section>
  );
};

export default Projects;

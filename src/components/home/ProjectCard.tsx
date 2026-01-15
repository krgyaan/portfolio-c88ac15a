import { Project } from "@/types/api.types";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusLabels = {
    live: "Live",
    building: "Building",
    "coming-soon": "soon..",
  };

  const isComingSoon = project.status === "coming-soon";

  return (
    <article
      className="group animate-fade-in-up rounded-xl border border-border p-4 bg-card hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header with Title and Status */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.status && (
          <span
            className={cn(
              "text-xs px-2 py-0.5 rounded-full border",
              isComingSoon
                ? "text-muted-foreground border-border bg-secondary"
                : "text-accent border-accent/30 bg-accent/10"
            )}
          >
            {statusLabels[project.status]}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.description}
      </p>

      {/* Links */}
      {!isComingSoon && (
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <SiGithub className="h-4 w-4" />
              GitHub
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </a>
          )}
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors ml-auto"
          >
            Details →
          </Link>
        </div>
      )}
    </article>
  );
}

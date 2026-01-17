import { Project } from "@/types/api.types";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusColors = {
    live: "bg-accent",
    building: "bg-amber-500",
    "coming-soon": "bg-muted-foreground",
  };

  const statusLabels = {
    live: "Live",
    building: "Building",
    "coming-soon": "Coming Soon",
  };

  const isComingSoon = project.status === "coming-soon";

  return (
    <article
      className="group animate-fade-in-up rounded-xl border border-border p-4 bg-card hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header with title and status */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        {project.status && (
          <div className="flex items-center gap-1.5">
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                statusColors[project.status]
              )}
            />
            <span className="text-xs text-muted-foreground">
              {statusLabels[project.status]}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
        {project.description}
      </p>

      {/* Tech Stack Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5 font-normal"
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}

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
              <Github className="h-4 w-4" />
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
        </div>
      )}
    </article>
  );
}

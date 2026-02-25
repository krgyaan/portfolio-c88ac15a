import { Project } from "@/types/api.types";
import { Github, Search, Compass, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const statusConfig = {
    live: { label: "Discovered", icon: Gem, color: "text-op-gold" },
    building: { label: "Charting...", icon: Compass, color: "text-op-ocean" },
    "coming-soon": { label: "Uncharted", icon: Compass, color: "text-muted-foreground" },
  };

  const status = statusConfig[project.status || "coming-soon"];
  const StatusIcon = status.icon;
  const isComingSoon = project.status === "coming-soon";

  return (
    <article
      className="group animate-fade-in-up ship-rock treasure-card"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Header with title and status */}
      <div className="flex items-center gap-2 mb-2">
        <h3 className="font-pirate text-lg text-foreground group-hover:text-primary transition-colors tracking-wide">
          {project.title}
        </h3>
        {project.status && (
          <div className="flex items-center gap-1.5">
            <StatusIcon className={cn("w-3 h-3", status.color)} />
            <span className={cn("text-xs font-body", status.color)}>
              {status.label}
            </span>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground line-clamp-2 mb-3 font-body">
        {project.description}
      </p>

      {/* Tech Stack Tags */}
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 5).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs px-2 py-0.5 font-normal border"
              style={{ borderColor: 'hsl(var(--op-gold) / 0.2)' }}
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
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
            >
              <Github className="h-4 w-4" />
              Chart
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-body"
            >
              <Search className="h-4 w-4" />
              Explore
            </a>
          )}
        </div>
      )}
    </article>
  );
}

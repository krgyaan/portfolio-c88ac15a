import { Project } from "@/types/api.types";
import { Link } from "react-router-dom";
import { ArrowUpRight, Pin } from "lucide-react";
import { cn } from "@/lib/utils";

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
      className="group animate-fade-in-up rounded-xl border border-border overflow-hidden bg-card hover:border-primary/30 transition-all duration-300"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative aspect-video overflow-hidden bg-secondary">
        {isComingSoon ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
              Stay Tuned
            </span>
            <span className="text-lg font-bold text-foreground">
              Coming Soon
            </span>
          </div>
        ) : project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-secondary to-muted">
            <span className="text-muted-foreground">No preview</span>
          </div>
        )}

        {/* Pin icon */}
        {project.isFeatured && (
          <div className="absolute top-3 right-3">
            <Pin className="h-4 w-4 text-foreground fill-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
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

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {project.description}
        </p>

        {!isComingSoon && (
          <Link
            to={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
          >
            View Project
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </article>
  );
}

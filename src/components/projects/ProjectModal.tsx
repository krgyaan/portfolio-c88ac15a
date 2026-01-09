import { useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GitHubRepoAPI } from "@/api/github.api";
import { ExternalLink, Github, Star, GitFork, Eye, Calendar, Scale, ChevronLeft, ChevronRight } from "lucide-react";
import { getLanguageColor } from "@/lib/languageColors";

interface ProjectModalProps {
  repo: GitHubRepoAPI | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate?: (direction: "prev" | "next") => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const ProjectModal = ({ repo, open, onOpenChange, onNavigate, hasPrev, hasNext }: ProjectModalProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!open || !onNavigate) return;
    
    if (e.key === "ArrowLeft" && hasPrev) {
      onNavigate("prev");
    } else if (e.key === "ArrowRight" && hasNext) {
      onNavigate("next");
    }
  }, [open, onNavigate, hasPrev, hasNext]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!repo) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-3">
            {repo.name}
            {repo.language && (
              <span className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getLanguageColor(repo.language) }}
                />
                {repo.language}
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {repo.description || "No description provided."}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Star className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-sm font-medium">{repo.stargazers_count}</p>
                <p className="text-xs text-muted-foreground">Stars</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <GitFork className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm font-medium">{repo.forks_count}</p>
                <p className="text-xs text-muted-foreground">Forks</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Eye className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm font-medium">{repo.watchers_count}</p>
                <p className="text-xs text-muted-foreground">Watchers</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <Scale className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm font-medium truncate">{repo.license?.name || "None"}</p>
                <p className="text-xs text-muted-foreground">License</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Created: {formatDate(repo.created_at)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>Updated: {formatDate(repo.updated_at)}</span>
            </div>
          </div>

          {/* Topics */}
          {repo.topics && repo.topics.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Topics</h4>
              <div className="flex flex-wrap gap-2">
                {repo.topics.map((topic) => (
                  <span
                    key={topic}
                    className="px-2.5 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          {onNavigate && (
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => onNavigate("prev")}
                disabled={!hasPrev}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <span className="text-xs text-muted-foreground">Use ← → arrows to navigate</span>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => onNavigate("next")}
                disabled={!hasNext}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button
              className="flex-1 gap-2"
              onClick={() => window.open(repo.html_url, "_blank")}
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            {repo.homepage && (
              <Button
                variant="outline"
                className="flex-1 gap-2"
                onClick={() => window.open(repo.homepage!, "_blank")}
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

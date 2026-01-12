import { BlogPost } from "@/types/api.types";
import { Calendar, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const handleClick = () => {
    if (post.externalUrl) {
      window.open(post.externalUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <article
      className={cn(
        "group animate-fade-in-up relative py-4 cursor-pointer",
        "hover:bg-secondary/30 -mx-4 px-4 rounded-lg transition-colors"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      {/* Dotted decoration on sides */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="w-1 h-1 rounded-full bg-border" />
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-1">
        <span className="w-1 h-1 rounded-full bg-border" />
        <span className="w-1 h-1 rounded-full bg-border" />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1 line-clamp-1">
            {post.title}
          </h3>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {post.date}
            </span>
            {post.claps !== undefined && (
              <span className="flex items-center gap-1">
                <svg
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.37 2.98c.26-.4.86-.4 1.12 0l2.04 3.18c.12.18.31.31.52.36l3.6.9c.48.12.65.71.32 1.08l-2.53 2.81c-.13.15-.2.35-.18.55l.35 3.66c.05.5-.42.87-.88.69l-3.36-1.36c-.19-.08-.4-.08-.59 0l-3.36 1.36c-.46.18-.93-.19-.88-.69l.35-3.66c.02-.2-.05-.4-.18-.55L5.18 8.5c-.33-.37-.16-.96.32-1.08l3.6-.9c.21-.05.4-.18.52-.36l2.04-3.18z" />
                </svg>
                {post.claps}
              </span>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
      </div>
    </article>
  );
}

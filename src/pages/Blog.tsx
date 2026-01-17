import { useEffect, useState } from "react";
import { getBlogPosts } from "@/api";
import { BlogPost } from "@/types/api.types";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const data = await getBlogPosts();
      setPosts(data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 bg-secondary rounded-lg" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post, index) => (
            <article
              key={post.id}
              className="group animate-fade-in-up rounded-xl border border-border p-4 bg-card hover:border-primary/30 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{post.date}</span>
                    {post.readTime && <span>· {post.readTime}</span>}
                  </div>
                </div>
                {post.externalUrl && (
                  <a
                    href={post.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {post.tags.map((tag) => (
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
            </article>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-12">
          No blog posts yet. Check back soon!
        </p>
      )}
    </div>
  );
};

export default Blog;

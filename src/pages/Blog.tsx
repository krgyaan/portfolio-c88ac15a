import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { getBlogPosts } from "@/api";
import { BlogPost } from "@/types/api.types";

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
            <Section className="pt-20 md:pt-28">
                <div className="mb-12 space-y-4">
                    <div className="h-10 w-32 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-96 bg-muted rounded animate-pulse" />
                </div>
            </Section>
        );
    }

    return (
        <Section className="pt-20 md:pt-28 min-h-[60vh]">
            <div className="space-y-4 animate-fade-in">
                <h1 className="text-3xl font-semibold md:text-4xl">Blogs</h1>
                <p className="text-muted-foreground">
                    Thoughts on software development, design, and more.
                </p>
            </div>

            {posts.length > 0 && (
                <div className="grid gap-4 mt-12">
                    {posts.map((post, index) => (
                        <article
                            key={post.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Future: Blog post cards */}
                        </article>
                    ))}
                </div>
            )}
        </Section>
    );
};

export default Blog;

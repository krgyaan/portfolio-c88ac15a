import { useEffect, useState } from "react";
import { getBlogPosts } from "@/api";
import { BlogPost } from "@/types/api.types";
import { BlogCard } from "@/components/home/BlogCard";

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
                <div className="space-y-0">
                    {posts.map((post, index) => (
                        <BlogCard key={post.id} post={post} index={index} />
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

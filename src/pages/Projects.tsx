import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { fetchTopGitHubRepos, GitHubRepoAPI } from "@/api/github.api";
import { Button } from "@/components/ui/button";

const GITHUB_USERNAME = "krgyaan";

const Projects = () => {
    const [repos, setRepos] = useState<GitHubRepoAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchRepos() {
            try {
                const data = await fetchTopGitHubRepos(GITHUB_USERNAME);
                setRepos(data);
            } catch (err) {
                setError("Failed to load repositories");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchRepos();
    }, []);

    if (loading) {
        return (
            <Section className="pt-20 md:pt-28">
                <div className="mb-12 space-y-4">
                    <div className="h-10 w-48 bg-muted rounded animate-pulse" />
                    <div className="h-5 w-96 bg-muted rounded animate-pulse" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="h-40 bg-muted rounded animate-pulse" />
                    ))}
                </div>
            </Section>
        );
    }

    if (error) {
        return (
            <Section className="pt-20 md:pt-28">
                <p className="text-muted-foreground">{error}</p>
            </Section>
        );
    }

    return (
        <Section className="pt-20 md:pt-28">
            <div className="mb-12 space-y-4 animate-fade-in">
                <h1 className="text-3xl font-semibold md:text-4xl">Projects</h1>
                <p className="text-muted-foreground">
                    My top open-source repositories on GitHub.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {repos.map((repo, index) => (
                    <article
                        key={repo.id}
                        className="group animate-fade-in rounded-lg border border-border/50 overflow-hidden hover:border-border transition-all duration-300 hover:shadow-[0_0_30px_-5px_hsl(var(--glow-color)/0.1)] bg-card/30 p-5"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-col h-full">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h2 className="text-lg font-semibold text-foreground truncate">
                                    {repo.name}
                                </h2>
                                <div className="flex items-center gap-3 text-muted-foreground text-sm flex-shrink-0">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4" />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="h-4 w-4" />
                                        {repo.forks_count}
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                                {repo.description || "No description provided."}
                            </p>

                            <div className="flex items-center justify-between">
                                {repo.language && (
                                    <span className="px-2 py-0.5 text-xs font-mono rounded border border-border bg-background text-muted-foreground">
                                        {repo.language}
                                    </span>
                                )}
                                <div className="flex items-center gap-2 ml-auto">
                                    {repo.homepage && (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-1.5 text-xs h-7 px-2"
                                            onClick={() => window.open(repo.homepage!, '_blank')}
                                        >
                                            <ExternalLink className="h-3 w-3" />
                                            Live
                                        </Button>
                                    )}
                                    <Button
                                        size="sm"
                                        variant="outline"
                                        className="gap-1.5 text-xs h-7 px-2"
                                        onClick={() => window.open(repo.html_url, '_blank')}
                                    >
                                        <Github className="h-3 w-3" />
                                        View
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* View all repos link */}
            <div className="flex justify-center pt-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
                <a
                    href={`https://github.com/${GITHUB_USERNAME}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                    View all repositories on GitHub
                    <ExternalLink className="h-3 w-3" />
                </a>
            </div>
        </Section>
    );
};

export default Projects;

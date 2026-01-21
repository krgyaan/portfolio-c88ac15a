import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Section } from "@/components/ui/Section";
import { ExternalLink, Github, Star, GitFork } from "lucide-react";
import { fetchTopGitHubRepos, GitHubRepoAPI } from "@/api/github.api";
import { Button } from "@/components/ui/button";
import { ProjectModal } from "@/components/projects/ProjectModal";
import { ProjectFilters } from "@/components/projects/ProjectFilters";
import { getLanguageColor } from "@/lib/languageColors";

const GITHUB_USERNAME = "krgyaan";

const Projects = () => {
    const [repos, setRepos] = useState<GitHubRepoAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedRepo, setSelectedRepo] = useState<GitHubRepoAPI | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const gridRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLElement | null)[]>([]);

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

    // Extract unique languages
    const languages = useMemo(() => {
        const langs = repos.map((r) => r.language).filter(Boolean) as string[];
        return [...new Set(langs)];
    }, [repos]);

    // Filtered repos (sorted by stars by default)
    const filteredRepos = useMemo(() => {
        const filtered = repos.filter((repo) => {
            return !selectedLanguage || repo.language === selectedLanguage;
        });

        // Sort by stars (default)
        return filtered.sort((a, b) => b.stargazers_count - a.stargazers_count);
    }, [repos, selectedLanguage]);

    const handleCardClick = (repo: GitHubRepoAPI) => {
        setSelectedRepo(repo);
        setModalOpen(true);
    };

    // Modal navigation
    const handleModalNavigate = useCallback((direction: "prev" | "next") => {
        if (!selectedRepo) return;
        const currentIndex = filteredRepos.findIndex((r) => r.id === selectedRepo.id);
        const newIndex = direction === "prev" ? currentIndex - 1 : currentIndex + 1;
        if (newIndex >= 0 && newIndex < filteredRepos.length) {
            setSelectedRepo(filteredRepos[newIndex]);
        }
    }, [selectedRepo, filteredRepos]);

    const currentRepoIndex = selectedRepo ? filteredRepos.findIndex((r) => r.id === selectedRepo.id) : -1;

    // Keyboard navigation for grid
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (modalOpen) return;
        
        const gridColumns = window.innerWidth >= 768 ? 2 : 1;
        const totalItems = filteredRepos.length;
        
        if (totalItems === 0) return;

        let newIndex = focusedIndex;

        switch (e.key) {
            case "ArrowRight":
                newIndex = Math.min(focusedIndex + 1, totalItems - 1);
                break;
            case "ArrowLeft":
                newIndex = Math.max(focusedIndex - 1, 0);
                break;
            case "ArrowDown":
                newIndex = Math.min(focusedIndex + gridColumns, totalItems - 1);
                break;
            case "ArrowUp":
                newIndex = Math.max(focusedIndex - gridColumns, 0);
                break;
            case "Enter":
                if (focusedIndex >= 0 && focusedIndex < totalItems) {
                    handleCardClick(filteredRepos[focusedIndex]);
                }
                return;
            case "Escape":
                setFocusedIndex(-1);
                return;
            default:
                return;
        }

        if (newIndex !== focusedIndex && newIndex >= 0) {
            e.preventDefault();
            setFocusedIndex(newIndex);
            cardRefs.current[newIndex]?.focus();
        }
    }, [focusedIndex, filteredRepos, modalOpen, handleCardClick]);

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Reset focus when language filter changes
    useEffect(() => {
        setFocusedIndex(-1);
    }, [selectedLanguage]);

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
                    My top open-source repositories on GitHub. Use arrow keys to navigate, Enter to open.
                </p>
            </div>

            <ProjectFilters
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                languages={languages}
            />

            {filteredRepos.length === 0 ? (
                <p className="text-muted-foreground text-center py-12">
                    No projects match your filters.
                </p>
            ) : (
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRepos.map((repo, index) => (
                        <article
                            key={repo.id}
                            ref={(el) => (cardRefs.current[index] = el)}
                            tabIndex={0}
                            onClick={() => handleCardClick(repo)}
                            onFocus={() => setFocusedIndex(index)}
                            className={`group animate-fade-in rounded-xl border border-border/40 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.15)] bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm cursor-pointer outline-none ${
                                focusedIndex === index ? "ring-2 ring-primary ring-offset-2 ring-offset-background" : ""
                            }`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {repo.name}
                                    </h2>
                                    <div className="flex items-center gap-3 text-muted-foreground text-sm flex-shrink-0">
                                        <span className="flex items-center gap-1 hover:text-amber-500 transition-colors">
                                            <Star className="h-4 w-4" />
                                            {repo.stargazers_count}
                                        </span>
                                        <span className="flex items-center gap-1 hover:text-primary transition-colors">
                                            <GitFork className="h-4 w-4" />
                                            {repo.forks_count}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1 leading-relaxed">
                                    {repo.description || "No description provided."}
                                </p>

                                {/* Topics/Tags */}
                                {repo.topics && repo.topics.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-4">
                                        {repo.topics.slice(0, 4).map((topic) => (
                                            <span
                                                key={topic}
                                                className="px-2 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                                            >
                                                {topic}
                                            </span>
                                        ))}
                                        {repo.topics.length > 4 && (
                                            <span className="px-2 py-0.5 text-xs text-muted-foreground">
                                                +{repo.topics.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}

                                <div className="flex items-center justify-between pt-3 border-t border-border/30">
                                    {repo.language && (
                                        <div className="flex items-center gap-2">
                                            <span
                                                className="w-2.5 h-2.5 rounded-full"
                                                style={{ backgroundColor: getLanguageColor(repo.language) }}
                                            />
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {repo.language}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 ml-auto">
                                        {repo.homepage && (
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="gap-1.5 text-xs h-8 px-3 hover:bg-primary/10 hover:text-primary"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(repo.homepage!, '_blank');
                                                }}
                                            >
                                                <ExternalLink className="h-3.5 w-3.5" />
                                                Live
                                            </Button>
                                        )}
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="gap-1.5 text-xs h-8 px-3 hover:bg-primary hover:text-primary-foreground hover:border-primary"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(repo.html_url, '_blank');
                                            }}
                                        >
                                            <Github className="h-3.5 w-3.5" />
                                            Code
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

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

            <ProjectModal
                repo={selectedRepo}
                open={modalOpen}
                onOpenChange={setModalOpen}
                onNavigate={handleModalNavigate}
                hasPrev={currentRepoIndex > 0}
                hasNext={currentRepoIndex < filteredRepos.length - 1}
            />
        </Section>
    );
};

export default Projects;

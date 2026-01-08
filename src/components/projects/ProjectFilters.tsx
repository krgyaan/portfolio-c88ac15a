import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { getLanguageColor } from "@/lib/languageColors";

interface ProjectFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  selectedTopic: string | null;
  onTopicChange: (topic: string | null) => void;
  languages: string[];
  topics: string[];
}

export const ProjectFilters = ({
  searchQuery,
  onSearchChange,
  selectedLanguage,
  onLanguageChange,
  selectedTopic,
  onTopicChange,
  languages,
  topics,
}: ProjectFiltersProps) => {
  const hasActiveFilters = searchQuery || selectedLanguage || selectedTopic;

  const clearFilters = () => {
    onSearchChange("");
    onLanguageChange(null);
    onTopicChange(null);
  };

  return (
    <div className="space-y-4 mb-8 animate-fade-in">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search projects..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background/50"
        />
      </div>

      {/* Language Filter */}
      {languages.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Languages</p>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                size="sm"
                variant={selectedLanguage === lang ? "default" : "outline"}
                className="gap-1.5 h-7 text-xs"
                onClick={() => onLanguageChange(selectedLanguage === lang ? null : lang)}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getLanguageColor(lang) }}
                />
                {lang}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Topic Filter */}
      {topics.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Topics</p>
          <div className="flex flex-wrap gap-2">
            {topics.slice(0, 12).map((topic) => (
              <Button
                key={topic}
                size="sm"
                variant={selectedTopic === topic ? "default" : "ghost"}
                className="h-7 text-xs px-2.5"
                onClick={() => onTopicChange(selectedTopic === topic ? null : topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={clearFilters}
        >
          <X className="h-3.5 w-3.5" />
          Clear filters
        </Button>
      )}
    </div>
  );
};

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { getLanguageColor } from "@/lib/languageColors";

interface ProjectFiltersProps {
  selectedLanguage: string | null;
  onLanguageChange: (language: string | null) => void;
  languages: string[];
}

export const ProjectFilters = ({
  selectedLanguage,
  onLanguageChange,
  languages,
}: ProjectFiltersProps) => {
  return (
    <div className="space-y-4 mb-8 animate-fade-in">
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

      {/* Clear Filters */}
      {selectedLanguage && (
        <Button
          variant="ghost"
          size="sm"
          className="gap-1.5 text-muted-foreground hover:text-foreground"
          onClick={() => onLanguageChange(null)}
        >
          <X className="h-3.5 w-3.5" />
          Clear filter
        </Button>
      )}
    </div>
  );
};

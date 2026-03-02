import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAnimeTheme } from "@/contexts/AnimeThemeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SubPageHeaderProps {
  title: string;
}

export function SubPageHeader({ title }: SubPageHeaderProps) {
  const { theme, setActiveTheme, allThemes } = useAnimeTheme();

  return (
    <header className="py-4 mb-4">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-pirate tracking-wide">{theme.labels.backLink}</span>
        </Link>

        <h1 className="text-xl font-pirate text-foreground tracking-wide">
          {title}
        </h1>

        <Popover>
          <PopoverTrigger asChild>
            <button
              className="flex h-8 items-center gap-1.5 px-2 rounded-lg text-xs font-pirate text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-secondary"
              aria-label="Switch anime theme"
            >
              <span>{theme.emoji}</span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-2" align="end">
            <div className="space-y-1">
              <p className="text-xs font-pirate text-muted-foreground px-2 py-1">Anime Theme</p>
              {allThemes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTheme(t.id)}
                  className={cn(
                    "flex items-center gap-2 w-full px-2 py-1.5 rounded-md text-sm transition-colors font-body",
                    t.id === theme.id
                      ? "bg-primary/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  )}
                >
                  <span>{t.emoji}</span>
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </PopoverContent>
        </Popover>
      </nav>

      <div className="divider-line mt-4" />
    </header>
  );
}

import { Link, useLocation } from "react-router-dom";
import { Skull, Anchor, Sun, Moon, Flame, ScrollText, Swords, Target, Compass, Ship, BookOpen, Gem } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAnimeTheme } from "@/contexts/AnimeThemeContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Skull, Anchor, Sun, Moon, Flame, ScrollText, Swords, Target, Compass, Ship, BookOpen, Gem,
};

export function Navbar() {
  const location = useLocation();
  const { theme, setActiveTheme, allThemes } = useAnimeTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header className="py-4 mb-4">
      <nav className="flex items-center justify-between">
        <ul className="flex items-center gap-6">
          {theme.labels.nav.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={cn(
                  "relative py-1 text-sm font-pirate tracking-wide transition-colors duration-200",
                  isActive(link.path)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {isActive(link.path) && (
                  <span 
                    className="absolute -bottom-[2px] left-0 h-[2px] w-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, hsl(var(--theme-accent-2)), hsl(var(--theme-accent-1)))`,
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="flex h-8 items-center gap-1.5 px-2 rounded-lg text-xs font-pirate text-muted-foreground transition-colors duration-200 hover:text-foreground hover:bg-secondary"
                aria-label="Switch anime theme"
              >
                <span>{theme.emoji}</span>
                <span className="hidden sm:inline">{theme.name}</span>
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
        </div>
      </nav>

      <div className="divider-line mt-4" />
    </header>
  );
}

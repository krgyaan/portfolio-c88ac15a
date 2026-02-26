import { Link, useLocation } from "react-router-dom";
import { Skull, Anchor } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { JollyRoger } from "@/components/ui/JollyRoger";

const navLinks = [
  { path: "/", label: "Crew" },
  { path: "/projects", label: "Treasure Map" },
  { path: "/blog", label: "Captain's Log" },
];

export function Navbar() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="py-4 mb-4">
      <nav className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-foreground hover:text-op-gold transition-colors duration-200" aria-label="Home">
            <JollyRoger className="w-7 h-7" />
          </Link>
          <ul className="flex items-center gap-6">
          {navLinks.map((link) => (
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
                      background: `linear-gradient(90deg, hsl(var(--op-red)), hsl(var(--op-gold)))`,
                    }}
                  />
                )}
              </Link>
            </li>
          ))}
          </ul>
        </div>

        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:text-op-gold hover:bg-secondary"
          aria-label="Toggle theme"
        >
          {/* Dark = Jolly Roger (Skull), Light = Marine (Anchor) */}
          <Anchor className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Skull className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </button>
      </nav>

      <div className="divider-line mt-4" />
    </header>
  );
}

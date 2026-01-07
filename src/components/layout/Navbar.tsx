import { Link, useLocation } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

const navLinks = [
    { path: "/", label: "Home" },
    { path: "/projects", label: "Projects" },
    { path: "/blog", label: "Blog" },
];

export function Navbar() {
    const location = useLocation();
    const { theme, setTheme } = useTheme();

    const isActive = (path: string) => {
        if (path === "/") {
            return location.pathname === "/";
        }
        return location.pathname.startsWith(path);
    };

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
            <nav className="content-container flex h-14 items-center justify-between">
                <ul className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={cn(
                                    "relative py-1 text-base font-medium transition-colors duration-200",
                                    isActive(link.path)
                                        ? "text-foreground"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {link.label}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-[1px] left-0 h-px w-full bg-foreground" />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>

                <button
                    onClick={toggleTheme}
                    className="flex h-8 w-8 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
                    aria-label="Toggle theme"
                >
                    <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
                </button>
            </nav>
        </header>
    );
}

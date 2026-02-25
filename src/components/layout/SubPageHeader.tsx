import { Link } from "react-router-dom";
import { ArrowLeft, Skull, Anchor } from "lucide-react";
import { useTheme } from "next-themes";

interface SubPageHeaderProps {
  title: string;
}

export function SubPageHeader({ title }: SubPageHeaderProps) {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="py-4 mb-4">
      <nav className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-pirate tracking-wide">Return to Port</span>
        </Link>

        <h1 className="text-xl font-pirate text-foreground tracking-wide">
          {title}
        </h1>

        <button
          onClick={toggleTheme}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:text-op-gold hover:bg-secondary"
          aria-label="Toggle theme"
        >
          <Anchor className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
          <Skull className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
        </button>
      </nav>

      <div className="divider-line mt-4" />
    </header>
  );
}

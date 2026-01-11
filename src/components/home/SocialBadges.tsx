import { SocialLink } from "@/types/api.types";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code, 
  Twitter,
  MoreHorizontal,
  ExternalLink
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GitHubHoverCard } from "./GitHubHoverCard";

interface SocialBadgesProps {
  socialLinks: SocialLink[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Github,
  Linkedin,
  Mail,
  Code,
  Twitter,
  X: Twitter,
};

// Extract GitHub username from URL
function extractGitHubUsername(url: string): string | null {
  const match = url.match(/github\.com\/([^\/]+)/);
  return match ? match[1] : null;
}

export function SocialBadges({ socialLinks }: SocialBadgesProps) {
  const primaryLinks = socialLinks.filter(link => link.isPrimary !== false);
  const secondaryLinks = socialLinks.filter(link => link.isPrimary === false);

  const renderLink = (link: SocialLink) => {
    const IconComponent = iconMap[link.icon];
    const isGitHub = link.platform.toLowerCase() === "github";
    const username = isGitHub ? extractGitHubUsername(link.url) : null;

    const badge = (
      <a
        key={link.id}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="social-badge"
      >
        {IconComponent && <IconComponent className="h-4 w-4" />}
        <span>{link.platform}</span>
      </a>
    );

    // Wrap GitHub badge with hover card
    if (isGitHub && username) {
      return (
        <GitHubHoverCard key={link.id} username={username}>
          {badge}
        </GitHubHoverCard>
      );
    }

    return badge;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {primaryLinks.map(renderLink)}

      {/* More dropdown for secondary links */}
      {secondaryLinks.length > 0 && (
        <DropdownMenu>
          <DropdownMenuTrigger className="social-badge">
            <MoreHorizontal className="h-4 w-4" />
            <span>More</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="min-w-[160px]">
            {secondaryLinks.map((link) => {
              const IconComponent = iconMap[link.icon];
              return (
                <DropdownMenuItem key={link.id} asChild>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    {IconComponent ? (
                      <IconComponent className="h-4 w-4" />
                    ) : (
                      <ExternalLink className="h-4 w-4" />
                    )}
                    <span>{link.platform}</span>
                  </a>
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}

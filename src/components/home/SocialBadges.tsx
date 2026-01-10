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
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

export function SocialBadges({ socialLinks }: SocialBadgesProps) {
  const primaryLinks = socialLinks.filter(link => link.isPrimary !== false);
  const secondaryLinks = socialLinks.filter(link => link.isPrimary === false);

  return (
    <div className="flex flex-wrap items-center gap-2">
      {primaryLinks.map((link) => {
        const IconComponent = iconMap[link.icon];
        return (
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
      })}

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

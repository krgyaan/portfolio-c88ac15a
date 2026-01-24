import { Profile, SiteConfig } from "@/types/api.types";
import { FileText, Mail, Github, Linkedin } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ProfileCardProps {
  profile: Profile;
  config: SiteConfig | null;
}

export function ProfileCard({ profile, config }: ProfileCardProps) {
  return (
    <div className="animate-fade-in-up relative">
      {/* Profile Header */}
      <div className="flex items-start gap-5 mb-6">
        {/* Avatar - Square with rounded corners */}
        <div className="relative flex-shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-2 border-border"
          />
        </div>

        {/* Name and Info */}
        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold leading-tight md:text-3xl text-foreground">
              {profile.name}
            </h1>
            {/* Status indicator - small circle next to name */}
            <div 
              className={`status-dot ${profile.status}`}
              title={`Status: ${profile.status}`}
            />
          </div>
          <p className="text-muted-foreground text-sm md:text-base mt-1">
            {profile.subtitle}
          </p>
          <p className="text-muted-foreground text-xs mt-1 font-mono">
            {profile.age} • New Delhi, India
          </p>
        </div>
      </div>

      {/* About - inline below header */}
      <p className="text-muted-foreground leading-relaxed text-sm">
        {profile.about}
      </p>

      {/* Social Actions */}
      <TooltipProvider delayDuration={100}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {/* Bordered buttons */}
          <a
            href="/resume.pdf"
            download="Gyan_Prakash_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-105 text-foreground transition-all duration-200"
          >
            <FileText className="h-4 w-4" />
            Resume
          </a>
          <a
            href="mailto:gyanprakashk55@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-105 text-foreground transition-all duration-200"
          >
            <Mail className="h-4 w-4" />
            Contact
          </a>

          {/* Icon-only buttons with tooltips */}
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://x.com/_gyaan_"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-110 text-foreground transition-all duration-200"
                aria-label="X (Twitter)"
              >
                <SiX className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>X (Twitter)</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/krgyaan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-110 text-foreground transition-all duration-200"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>GitHub</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="mailto:gyanprakashk55@gmail.com"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-110 text-foreground transition-all duration-200"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>Email</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://linkedin.com/in/krgyaan"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-border bg-transparent hover:bg-secondary hover:scale-110 text-foreground transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </TooltipTrigger>
            <TooltipContent>LinkedIn</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

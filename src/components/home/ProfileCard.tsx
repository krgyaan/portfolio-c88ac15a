import { Profile } from "@/types/api.types";
import { Skull, Mail, Github, Linkedin, Anchor, ScrollText, Flame } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAnimeTheme } from "@/contexts/AnimeThemeContext";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Skull, Anchor, ScrollText, Flame,
};

interface ProfileCardProps {
  profile: Profile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { theme } = useAnimeTheme();
  const ResumeIcon = iconMap[theme.icons.resume] || Skull;

  return (
    <div className="animate-fade-in-up relative">
      {/* Profile Header */}
      <div className="flex items-start gap-5 mb-6">
        <div className="relative flex-shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-xl object-cover border-[3px]"
            style={{ borderColor: 'hsl(var(--theme-accent-1))' }}
          />
          <div 
            className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 rounded-tr-sm"
            style={{ borderColor: 'hsl(var(--theme-accent-1))' }}
          />
          <div 
            className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 rounded-bl-sm"
            style={{ borderColor: 'hsl(var(--theme-accent-1))' }}
          />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-pirate leading-tight md:text-3xl text-foreground tracking-wide">
              {profile.name}
            </h1>
            <div 
              className={`status-dot ${profile.status}`}
              title={`Status: ${profile.status}`}
            />
          </div>
          <p className="text-muted-foreground text-sm md:text-base mt-1 font-body">
            {profile.subtitle}
          </p>
          <p className="text-muted-foreground text-xs mt-1 font-mono flex items-center gap-1">
            <span style={{ color: 'hsl(var(--theme-accent-1))' }} className="text-xs">{theme.emoji}</span>
            {profile.age} • New Delhi, India
          </p>
        </div>
      </div>

      <p className="text-muted-foreground leading-relaxed text-sm font-body">
        {profile.about}
      </p>

      <TooltipProvider delayDuration={100}>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a
            href="/resume.pdf"
            download="Gyan_Prakash_Kumar_Resume.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-pirate tracking-wide rounded-lg border bg-transparent hover:bg-secondary hover:scale-105 text-foreground transition-all duration-200"
            style={{ borderColor: 'hsl(var(--theme-accent-1) / 0.5)' }}
          >
            <ResumeIcon className="h-4 w-4" style={{ color: 'hsl(var(--theme-accent-1))' }} />
            {theme.labels.resume}
          </a>
          <a
            href="mailto:gyanprakashk55@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-pirate tracking-wide rounded-lg border bg-transparent hover:bg-secondary hover:scale-105 text-foreground transition-all duration-200"
            style={{ borderColor: 'hsl(var(--theme-accent-1) / 0.5)' }}
          >
            <Mail className="h-4 w-4" />
            {theme.labels.contact}
          </a>

          {/* Icon-only social buttons */}
          {[
            { href: "https://x.com/_gyaan_", icon: <SiX className="h-4 w-4" />, label: "X (Twitter)" },
            { href: "https://github.com/krgyaan", icon: <Github className="h-4 w-4" />, label: "GitHub" },
            { href: "mailto:gyanprakashk55@gmail.com", icon: <Mail className="h-4 w-4" />, label: "Email" },
            { href: "https://linkedin.com/in/krgyaan", icon: <Linkedin className="h-4 w-4" />, label: "LinkedIn" },
          ].map((social) => (
            <Tooltip key={social.label}>
              <TooltipTrigger asChild>
                <a
                  href={social.href}
                  target={social.href.startsWith('mailto') ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-10 w-10 rounded-lg border bg-transparent hover:bg-secondary hover:scale-110 text-foreground transition-all duration-200"
                  style={{ borderColor: 'hsl(var(--theme-accent-1) / 0.3)' }}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              </TooltipTrigger>
              <TooltipContent>{social.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </div>
  );
}

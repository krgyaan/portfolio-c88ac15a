import { Profile, SiteConfig } from "@/types/api.types";
import { SocialBadges } from "./SocialBadges";
import { CTAButtons } from "./CTAButtons";

interface ProfileCardProps {
  profile: Profile;
  config: SiteConfig | null;
}

export function ProfileCard({ profile, config }: ProfileCardProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Profile Header */}
      <div className="flex items-start gap-5 mb-6">
        {/* Avatar with status indicator */}
        <div className="relative flex-shrink-0">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-2 border-border"
          />
          {/* Status indicator */}
          <div 
            className={`status-dot ${profile.status} absolute bottom-1 right-1 border-2 border-background`}
            title={`Status: ${profile.status}`}
          />
          
          {/* Hire Me badge */}
          {config?.hireMe.enabled && profile.isAvailableForHire && (
            <span className="hire-badge">
              {config.hireMe.text}
            </span>
          )}
        </div>

        {/* Name and Info */}
        <div className="flex-1 min-w-0 pt-1">
          <h1 className="text-2xl font-semibold leading-tight md:text-3xl text-foreground mb-1">
            {profile.name}
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            {profile.subtitle}
          </p>
          <p className="text-muted-foreground text-xs mt-1 font-mono">
            {profile.age} years old
          </p>
        </div>
      </div>

      {/* CTA Buttons */}
      <CTAButtons profile={profile} config={config} />

      {/* Social Badges */}
      <div className="mt-6">
        <SocialBadges socialLinks={profile.socialLinks} />
      </div>
    </div>
  );
}

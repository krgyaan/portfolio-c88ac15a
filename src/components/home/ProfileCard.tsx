import { Profile, SiteConfig } from "@/types/api.types";
import { SocialBadges } from "./SocialBadges";

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
            {profile.age} years old
          </p>
        </div>
      </div>

      {/* About - inline below header */}
      <p className="text-muted-foreground leading-relaxed text-sm">
        {profile.about}
      </p>

      {/* Social Label and Badges */}
      <div className="mt-6">
        <p className="text-sm text-muted-foreground mb-3">
          Here are my <span className="font-semibold text-foreground">socials</span>
        </p>
        <SocialBadges socialLinks={profile.socialLinks} />
      </div>
    </div>
  );
}

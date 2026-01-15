import { Profile, SiteConfig } from "@/types/api.types";
import { SocialBadges } from "./SocialBadges";
import { BadgeCheck } from "lucide-react";

interface ProfileCardProps {
  profile: Profile;
  config: SiteConfig | null;
}

export function ProfileCard({ profile, config }: ProfileCardProps) {
  return (
    <div className="animate-fade-in-up">
      {/* Greeting with Wave */}
      <div className="mb-2">
        <span className="text-muted-foreground text-base">
          Hi, I'm <span className="inline-block animate-wave">👋</span>
        </span>
      </div>

      {/* Name with Verified Badge and Status */}
      <div className="flex items-center gap-2 mb-3">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {profile.name}
        </h1>
        {profile.isVerified && (
          <BadgeCheck className="h-6 w-6 text-blue-500 fill-blue-500/20" />
        )}
        <div 
          className={`status-dot ${profile.status}`}
          title={`Status: ${profile.status}`}
        />
      </div>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm md:text-base mb-2">
        {profile.subtitle}
      </p>

      {/* Age */}
      <p className="text-muted-foreground text-xs font-mono mb-6">
        {profile.age} years old
      </p>

      {/* About */}
      <p className="text-muted-foreground leading-relaxed text-sm mb-6">
        {profile.about}
      </p>

      {/* Social Label and Badges */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">
          Here are my <span className="font-semibold text-foreground">socials</span>
        </p>
        <SocialBadges socialLinks={profile.socialLinks} />
      </div>
    </div>
  );
}

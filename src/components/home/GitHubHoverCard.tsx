import { useState, useEffect, ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fetchGitHubProfile, GitHubProfile } from "@/api/github-profile.api";
import { MapPin, Users, FolderGit2 } from "lucide-react";

interface GitHubHoverCardProps {
  username: string;
  children: ReactNode;
}

export function GitHubHoverCard({ username, children }: GitHubHoverCardProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOpenChange = (open: boolean) => {
    if (open && !profile && !isLoading) {
      setIsLoading(true);
      fetchGitHubProfile(username)
        .then(setProfile)
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <HoverCard onOpenChange={handleOpenChange} openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-80 github-hover-card" side="top" align="start">
        {isLoading ? (
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-muted animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 bg-muted rounded animate-pulse w-24" />
              <div className="h-3 bg-muted rounded animate-pulse w-16" />
            </div>
          </div>
        ) : profile ? (
          <div className="space-y-3">
            {/* Header with avatar and name */}
            <div className="flex items-start gap-3">
              <img
                src={profile.avatar_url}
                alt={profile.name || profile.login}
                className="w-14 h-14 rounded-full border-2 border-border"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {profile.name || profile.login}
                </h4>
                <p className="text-sm text-muted-foreground">@{profile.login}</p>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Stats row */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  {profile.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <FolderGit2 className="h-3.5 w-3.5" />
                {profile.public_repos} repos
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {profile.followers} followers
              </span>
            </div>
          </div>
        ) : null}
      </HoverCardContent>
    </HoverCard>
  );
}

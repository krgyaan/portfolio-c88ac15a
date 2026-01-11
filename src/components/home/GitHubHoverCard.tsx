import { useState, useEffect, ReactNode } from "react";
import { fetchGitHubProfile } from "@/api/github-profile.api";
import { GitHubProfile } from "@/types/api.types";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MapPin, Folder, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubHoverCardProps {
  username: string;
  children: ReactNode;
}

export function GitHubHoverCard({ username, children }: GitHubHoverCardProps) {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const loadProfile = async () => {
    if (hasLoaded) return;
    
    setLoading(true);
    try {
      const data = await fetchGitHubProfile(username);
      setProfile(data);
      setHasLoaded(true);
    } catch (error) {
      console.error("Failed to load GitHub profile:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild onMouseEnter={loadProfile}>
        {children}
      </HoverCardTrigger>
      <HoverCardContent 
        className="w-80 p-4" 
        side="top" 
        align="start"
        sideOffset={8}
      >
        {loading ? (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        ) : profile ? (
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="h-12 w-12 rounded-full border border-border"
              />
              <div>
                <p className="font-semibold text-foreground">{profile.name}</p>
                <p className="text-sm text-muted-foreground">@{profile.login}</p>
              </div>
            </div>

            {/* Bio */}
            {profile.bio && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {profile.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{profile.location}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Folder className="h-3.5 w-3.5" />
                <span>{profile.public_repos} repos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span>{profile.followers} followers</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">Failed to load profile</p>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

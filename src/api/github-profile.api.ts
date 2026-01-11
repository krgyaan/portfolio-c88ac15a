import { GitHubProfile } from "@/types/api.types";

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  const response = await fetch(`https://api.github.com/users/${username}`);
  
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub profile");
  }
  
  const data = await response.json();
  
  return {
    login: data.login,
    name: data.name || data.login,
    avatar_url: data.avatar_url,
    bio: data.bio || "",
    location: data.location || "",
    public_repos: data.public_repos,
    followers: data.followers,
    following: data.following,
  };
}

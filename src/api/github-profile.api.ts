export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

let cachedProfile: GitHubProfile | null = null;

export async function fetchGitHubProfile(username: string): Promise<GitHubProfile> {
  // Return cached profile if available
  if (cachedProfile && cachedProfile.login === username) {
    return cachedProfile;
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch GitHub profile');
    }
    
    const data = await response.json();
    cachedProfile = data;
    return data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    // Return mock data as fallback
    return {
      login: username,
      name: username,
      avatar_url: `https://github.com/${username}.png`,
      bio: null,
      location: null,
      public_repos: 0,
      followers: 0,
      following: 0,
      html_url: `https://github.com/${username}`,
    };
  }
}

import { ReactNode } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { ExternalLink, Mail, Linkedin } from "lucide-react";
import { SiX } from "@icons-pack/react-simple-icons";

interface SocialHoverCardProps {
  children: ReactNode;
  type: "x" | "linkedin" | "email";
  username?: string;
  email?: string;
}

export function SocialHoverCard({ children, type, username, email }: SocialHoverCardProps) {
  const getContent = () => {
    switch (type) {
      case "x":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <SiX className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">@{username}</p>
                <p className="text-xs text-muted-foreground">X (Twitter)</p>
              </div>
            </div>
            <a
              href={`https://x.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              View Profile
            </a>
          </div>
        );
      case "linkedin":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{username}</p>
                <p className="text-xs text-muted-foreground">LinkedIn</p>
              </div>
            </div>
            <a
              href={`https://linkedin.com/in/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              View Profile
            </a>
          </div>
        );
      case "email":
        return (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{email}</p>
                <p className="text-xs text-muted-foreground">Email</p>
              </div>
            </div>
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Mail className="h-3 w-3" />
              Send Email
            </a>
          </div>
        );
    }
  };

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent 
        className="w-64 github-hover-card" 
        align="center" 
        sideOffset={8}
      >
        {getContent()}
      </HoverCardContent>
    </HoverCard>
  );
}

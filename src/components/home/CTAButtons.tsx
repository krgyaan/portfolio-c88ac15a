import { Profile, SiteConfig } from "@/types/api.types";
import { Button } from "@/components/ui/button";
import { Calendar, Mail } from "lucide-react";

interface CTAButtonsProps {
  profile: Profile;
  config: SiteConfig | null;
}

export function CTAButtons({ profile, config }: CTAButtonsProps) {
  if (!config) return null;

  const { bookCall, sendEmail } = config.ctaButtons;

  return (
    <div className="flex flex-wrap gap-3">
      {bookCall.enabled && (
        <Button
          asChild
          variant="default"
          size="sm"
          className="gap-2"
        >
          <a href={profile.calendarUrl} target="_blank" rel="noopener noreferrer">
            <Calendar className="h-4 w-4" />
            {bookCall.text}
          </a>
        </Button>
      )}
      
      {sendEmail.enabled && (
        <Button
          asChild
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <a href={`mailto:${profile.email}`}>
            <Mail className="h-4 w-4" />
            {sendEmail.text}
          </a>
        </Button>
      )}
    </div>
  );
}

import { Github, Linkedin, Mail, FileText, Twitter } from "lucide-react";
import { Section } from "../ui/Section";
import { SocialLink } from "@/types/api.types";

interface CallToActionProps {
    heading?: string;
    subHeading?: string;
    socials?: SocialLink[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Github,
    Linkedin,
    Mail,
    FileText,
    Twitter,
};

const labelMap: Record<string, string> = {
    Github: "GitHub",
    Twitter: "Twitter",
    Linkedin: "LinkedIn",
    Mail: "Mail",
    FileText: "Resume",
};

export function CallToAction({
    heading = "Let's connect",
    subHeading = "Find me on these platforms",
    socials = [],
}: CallToActionProps) {
    return (
        <Section>
            <div className="space-y-4">
                <p className="text-lg md:text-xl text-muted-foreground italic">
                    {heading}
                </p>
                <p className="text-sm md:text-base text-foreground">
                    {subHeading}
                </p>
                <div className="flex flex-wrap gap-3 items-center">
                    {socials?.map((link) => {
                        const IconComponent = iconMap[link.icon];
                        const label = labelMap[link.icon] || link.platform;
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition"
                                aria-label={link.platform}
                            >
                                {IconComponent && <IconComponent className="h-4 w-4" />}
                                <span>{label}</span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

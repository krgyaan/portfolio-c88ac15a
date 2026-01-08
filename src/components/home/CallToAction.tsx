import { Github, Linkedin, Mail, FileText, Code } from "lucide-react";
import { Section } from "../ui/Section";
import { SocialLink } from "@/types/api.types";

interface CallToActionProps {
    heading?: string;
    subHeading?: string;
    socials?: SocialLink[];
}

// Custom X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Github,
    Linkedin,
    Mail,
    FileText,
    X: XIcon,
    Code,
};

const labelMap: Record<string, string> = {
    Github: "GitHub",
    X: "X",
    Linkedin: "LinkedIn",
    Mail: "Mail",
    FileText: "Resume",
    Code: "LeetCode",
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

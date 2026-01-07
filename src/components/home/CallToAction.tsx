import { useEffect, useState } from "react";
import { getProfile } from "@/api";
import { Github, Linkedin, Mail, Code } from "lucide-react";
import { Section } from "../ui/Section";

interface CallToActionProps {
    heading?: string;
    subHeading?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { Github, Linkedin, Mail, Code };

export function CallToAction({
    heading = "If you've read this far, you might be interested in what I do.",
    subHeading = "Find me on these platforms",
    socials,
}: CallToActionProps) {
    const [avatar, setAvatar] = useState<string>("");

    useEffect(() => {
        getProfile().then(profile => setAvatar(profile.avatarUrl));
    }, []);
    return (
        <Section>
            <div className="space-y-4 text-center">
                <p className="text-lg md:text-xl text-muted-foreground italic">
                    {heading}
                </p>
                <p className="text-sm md:text-base text-foreground">
                    {subHeading}
                </p>
                <div className="flex flex-wrap gap-3 items-center justify-center">
                    {socials?.map((link) => {
                        const IconComponent = iconMap[link.icon];
                        return (
                            <a
                                key={link.id}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 rounded-full bg-muted/60 px-4 py-2 text-base text-muted-foreground hover:text-foreground hover:bg-muted transition"
                                aria-label={link.platform}
                                tooltip={link.platform}
                            >
                                {IconComponent && <IconComponent className="h-4 w-4" />}
                            </a>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}

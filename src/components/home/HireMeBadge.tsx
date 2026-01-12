import { cn } from "@/lib/utils";

interface HireMeBadgeProps {
  text: string;
  className?: string;
}

export function HireMeBadge({ text, className }: HireMeBadgeProps) {
  return (
    <div className={cn("absolute -left-4 md:-left-16 top-0 z-10", className)}>
      <div className="relative">
        {/* Handwritten text */}
        <span 
          className="text-sm md:text-base font-bold text-accent rotate-[-8deg] block whitespace-nowrap"
          style={{ 
            fontFamily: "'Caveat', cursive",
            fontSize: "1.1rem",
          }}
        >
          {text}
        </span>
        
        {/* Curved arrow pointing right */}
        <svg
          className="absolute -right-8 top-2 w-8 h-8 text-accent"
          viewBox="0 0 32 32"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 16 C 12 8, 20 8, 28 16" />
          <path d="M22 12 L 28 16 L 24 22" />
        </svg>
      </div>
    </div>
  );
}

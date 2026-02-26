import { cn } from "@/lib/utils";

interface JollyRogerProps {
  className?: string;
}

export function JollyRoger({ className }: JollyRogerProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("w-6 h-6", className)}
    >
      {/* Straw Hat */}
      <ellipse cx="50" cy="28" rx="30" ry="8" fill="hsl(var(--op-straw))" stroke="currentColor" strokeWidth="2" />
      <path
        d="M30 28 Q32 12 50 10 Q68 12 70 28"
        fill="hsl(var(--op-straw))"
        stroke="currentColor"
        strokeWidth="2"
      />
      <line x1="30" y1="24" x2="70" y2="24" stroke="hsl(var(--op-red))" strokeWidth="4" />

      {/* Skull */}
      <circle cx="50" cy="48" r="16" fill="currentColor" />
      <circle cx="50" cy="48" r="14" fill="hsl(var(--background))" />
      <circle cx="50" cy="48" r="13" fill="currentColor" />

      {/* Eyes */}
      <circle cx="44" cy="46" r="4" fill="hsl(var(--background))" />
      <circle cx="56" cy="46" r="4" fill="hsl(var(--background))" />

      {/* Nose */}
      <ellipse cx="50" cy="52" rx="1.5" ry="2" fill="hsl(var(--background))" />

      {/* Mouth / Grin */}
      <path
        d="M42 56 Q46 62 50 56 Q54 62 58 56"
        fill="none"
        stroke="hsl(var(--background))"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Crossbones */}
      <line x1="22" y1="68" x2="78" y2="88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="78" y1="68" x2="22" y2="88" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />

      {/* Bone ends */}
      <circle cx="20" cy="67" r="3.5" fill="currentColor" />
      <circle cx="24" cy="69" r="3.5" fill="currentColor" />
      <circle cx="80" cy="67" r="3.5" fill="currentColor" />
      <circle cx="76" cy="69" r="3.5" fill="currentColor" />
      <circle cx="20" cy="89" r="3.5" fill="currentColor" />
      <circle cx="24" cy="87" r="3.5" fill="currentColor" />
      <circle cx="80" cy="89" r="3.5" fill="currentColor" />
      <circle cx="76" cy="87" r="3.5" fill="currentColor" />
    </svg>
  );
}

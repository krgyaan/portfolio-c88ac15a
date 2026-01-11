export function DottedPattern() {
  return (
    <div className="absolute top-0 left-0 right-0 h-32 md:h-40 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 dotted-grid-pattern" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

type Props = { className?: string; showText?: boolean };

export function Logo({ className = "h-10 w-auto", showText = true }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 56 56" className="h-10 w-10" aria-hidden="true">
        {/* circular soft backdrop */}
        <circle cx="28" cy="28" r="27" fill="var(--primary-soft)" />
        {/* Left vertical leaf */}
        <path
          d="M14 12 C 10 22, 10 34, 14 44 C 18 38, 19 30, 18 22 C 17 18, 16 15, 14 12 Z"
          fill="var(--primary)"
        />
        {/* Right vertical leaf */}
        <path
          d="M42 12 C 46 22, 46 34, 42 44 C 38 38, 37 30, 38 22 C 39 18, 40 15, 42 12 Z"
          fill="var(--accent)"
        />
        {/* Crossbar with small leaf vein */}
        <rect x="17" y="26" width="22" height="4" rx="2" fill="var(--primary)" />
        {/* Number 1 */}
        <path
          d="M44 18 L48 16 L48 42"
          stroke="var(--primary)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
      {showText && (
        <div className="leading-tight">
          <div className="font-serif text-xl font-medium text-foreground">Homeofirst</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Homeopathy · Hajipur
          </div>
        </div>
      )}
    </div>
  );
}

import logoImg from "@/assets/HomeoFirstLogo.jpg";

type Props = { className?: string; showText?: boolean };

export function Logo({ className = "h-10 w-auto", showText = true }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoImg}
        alt="Homeofirst Logo"
        className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-soft"
      />
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

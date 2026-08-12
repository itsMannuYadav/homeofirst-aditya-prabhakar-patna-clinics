import logoImg from "@/public/assets/HomeoFirstLogo.jpg";
import Image from "next/image";

type Props = { className?: string; showText?: boolean };

export function Logo({ className = "h-10 w-auto", showText = true }: Props) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src={logoImg}
        alt="Homeofirst Homeopathy Clinic"
        className="h-10 w-10 rounded-full object-cover ring-2 ring-primary-soft"
      />
      {showText && (
        <div className="leading-tight">
          <div className="font-heading text-xl font-medium text-foreground">Homeofirst</div>
          <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Homeopathy
          </div>
        </div>
      )}
    </div>
  );
}
type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export function SectionHeading({ eyebrow, title, description, align = "center", light = false }: Props) {
  const a = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={`max-w-2xl ${a}`}>
      {eyebrow && (
        <div className={`mb-3 text-xs font-semibold uppercase tracking-[0.2em] ${light ? "text-primary-soft" : "text-accent"}`}>
          {eyebrow}
        </div>
      )}
      <h2 className={`font-serif text-3xl md:text-4xl lg:text-5xl ${light ? "text-white" : "text-foreground"}`}>{title}</h2>
      {description && (
        <p className={`mt-4 text-base md:text-lg ${light ? "text-white/70" : "text-muted-foreground"}`}>{description}</p>
      )}
      <span className={`leaf-divider mt-6 ${align === "center" ? "mx-auto" : ""} ${light ? "opacity-50 brightness-200" : ""}`} />
    </div>
  );
}

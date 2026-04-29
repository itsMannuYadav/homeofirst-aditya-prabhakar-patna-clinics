type Props = { value: string; label: string; sub?: string };

export function Stat({ value, label, sub }: Props) {
  return (
    <div className="text-center">
      <div className="font-serif text-4xl text-primary md:text-5xl">{value}</div>
      <div className="mt-1 text-sm font-medium text-foreground">{label}</div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </div>
  );
}

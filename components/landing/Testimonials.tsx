import { TESTIMONIALS } from "@/data/landing";
import { SectionHeading } from "../SectionHeading";
import { Star } from "lucide-react";

export function Testimonials() {
    return (
        <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Patient stories"
            title="Trusted by families across Bihar"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure
                key={t.name}
                className="rounded-2xl border border-border bg-card p-7 shadow-soft"
              >
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 font-serif text-lg leading-snug text-foreground">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-5 border-t border-border pt-4 text-sm">
                  <div className="font-medium text-foreground">{t.name}</div>
                  <div className="text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    )
}
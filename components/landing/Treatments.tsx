import { TREATMENTS } from "@/data/landing";
import { SectionHeading } from "../SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Treatments() {
    return (
        <section className="py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="What we treat"
            title="A gentle path to wellness"
            description="Homeopathy works with your body's natural intelligence. We carefully treat a wide range of acute and chronic conditions."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {TREATMENTS.map((t) => (
              <div
                key={t.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">
                  {t.icon}
                </div>
                <h3 className="font-serif text-xl text-foreground">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/treatments"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              See all treatments <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    )
}
import { TREATMENTS } from "@/data/landing";
import { SectionHeading } from "../SectionHeading";
import Link from "next/link";
import Image from "next/image";
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
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TREATMENTS.map((t) => (
            <div
              key={t.title}
              className="group rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="mb-4 overflow-hidden rounded-xl bg-primary-soft">
                <Image
                  src={t.image}
                  alt={t.imageAlt}
                  width={384}
                  height={384}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="aspect-square h-auto w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
              <h3 className="font-serif text-lg text-foreground sm:text-xl">{t.title}</h3>
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
  );
}

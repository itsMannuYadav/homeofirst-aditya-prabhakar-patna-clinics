import { SectionHeading } from "@/components/SectionHeading";
import flatlay from "@/public/assets/treatments-flatlay.jpg";
import { SITE } from "@/lib/site";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { GROUPS } from "@/data/treatments";

export default function Treatments() {
  return (
    <>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Treatments"
              title="Care across every stage of life"
              description="Homeopathy is a complete system of medicine. From a child's recurring cough to a grandparent's joint pain, we treat with patience, precision, and gentleness."
              align="left"
            />
          </div>
          <div className="overflow-hidden rounded-4xl shadow-soft">
            <Image
              src={flatlay}
              alt="Homeopathic remedies with fresh leaves"
              width={1600}
              height={1000}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GROUPS.map((g) => (
            <div key={g.title} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-2xl">
                {g.color}
              </div>
              <h3 className="font-serif text-xl text-foreground">{g.title}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {g.items.map((i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="rounded-4xl bg-primary px-8 py-14 text-center text-primary-foreground md:px-16">
          <h2 className="font-serif text-3xl md:text-4xl">Don't see your condition?</h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Many conditions respond well to homeopathy. Message us on WhatsApp and we'll guide you.
          </p>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
          >
            <MessageCircle className="h-4 w-4" /> Ask Dr. Paramjeet
          </a>
        </div>
      </section>
    </>
  );
}

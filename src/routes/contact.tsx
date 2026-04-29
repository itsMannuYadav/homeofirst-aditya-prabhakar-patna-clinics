import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Homeofirst — Visit Our Clinic in Hajipur, Bihar" },
      {
        name: "description",
        content:
          "Visit Homeofirst clinic in Hajipur, Bihar. Call, WhatsApp, or stop by for a homeopathy consultation with Dr. Paramjeet Prabhakar.",
      },
      { property: "og:title", content: "Contact Homeofirst — Hajipur" },
    ],
  }),
  component: ContactPage,
});

const STORIES = [
  {
    name: "Sunita Devi",
    where: "Hajipur",
    condition: "Chronic migraine",
    text: "I had migraines for 12 years. Painkillers stopped working. After 8 months with Dr. Prabhakar, my episodes have almost vanished. I sleep peacefully again.",
  },
  {
    name: "Ramesh Kumar",
    where: "Vaishali",
    condition: "Childhood asthma",
    text: "My son's inhaler use has dropped dramatically. Dr. Paramjeet treats him like family — patient with every question we ask.",
  },
  {
    name: "Priya Singh",
    where: "Patna",
    condition: "PCOS",
    text: "I travel 30 km because I trust no one else. My cycle is regular, my skin is clearing, and I feel hopeful about my health.",
  },
  {
    name: "Anil Sharma",
    where: "Muzaffarpur",
    condition: "Knee arthritis",
    text: "I was told I'd need knee replacement. Two years on Homeofirst's treatment, and I'm walking 4 km every morning without pain.",
  },
  {
    name: "Meera Devi",
    where: "Hajipur",
    condition: "Eczema",
    text: "Years of cortisone creams gave me only short relief. Dr. Prabhakar's remedies addressed the root — my skin has been clear for 14 months.",
  },
  {
    name: "Rahul Kumar",
    where: "Vaishali",
    condition: "Recurring tonsillitis",
    text: "Surgery was suggested for my daughter. Six months of homeopathy and her tonsils have stopped flaring. We are so grateful.",
  },
];

function ContactPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Get in touch"
            title="Visit the clinic, or just say hello"
            description="We're easiest to reach on WhatsApp. Walk-ins are welcome — appointments preferred."
          />
        </div>
      </section>

      <section className="py-16">
        <div className="container-page grid gap-10 lg:grid-cols-[5fr_6fr]">
          <div>
            <h3 className="font-serif text-2xl">Clinic details</h3>
            <span className="leaf-divider mt-3" />

            <div className="mt-7 space-y-5">
              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Address</div>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.address}</p>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Phone</div>
                  <a href={SITE.phoneHref} className="mt-1 block text-sm text-muted-foreground">
                    {SITE.phone}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Email</div>
                  <a href={`mailto:${SITE.email}`} className="mt-1 block text-sm text-muted-foreground">
                    {SITE.email}
                  </a>
                </div>
              </div>

              <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <div className="font-medium text-foreground">Hours</div>
                  <p className="mt-1 text-sm text-muted-foreground">{SITE.hours}</p>
                </div>
              </div>
            </div>

            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Book on WhatsApp
            </a>
          </div>

          <div>
            <h3 className="font-serif text-2xl">Find us</h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-7 overflow-hidden rounded-[2rem] border border-border shadow-soft">
              <iframe
                title="Homeofirst clinic location in Hajipur"
                src="https://www.google.com/maps?q=Hajipur+Bihar&output=embed"
                width="100%"
                height="520"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                style={{ border: 0, display: "block" }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Map shows Hajipur city centre. Exact pin will be added once shared.
            </p>
          </div>
        </div>
      </section>

      {/* PATIENT STORIES */}
      <section className="bg-primary-soft/30 py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Patient stories"
            title="Real journeys. Real healing."
            description="Read how families across Bihar have found lasting relief under our care."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {STORIES.map((s) => (
              <article key={s.name} className="relative rounded-2xl border border-border bg-card p-7 shadow-soft">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-primary-soft" />
                <div className="flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 font-serif text-lg leading-snug text-foreground">"{s.text}"</p>
                <div className="mt-6 border-t border-border pt-4">
                  <div className="font-medium text-foreground">{s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {s.where} · Treated for {s.condition}
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-12 text-center text-[10px] text-muted-foreground uppercase tracking-widest">
            * Individual results may vary. Patient details shared with consent.
          </p>
        </div>
      </section>
    </>
  );
}

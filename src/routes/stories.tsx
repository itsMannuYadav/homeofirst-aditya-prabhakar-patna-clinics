import { createFileRoute } from "@tanstack/react-router";
import { Star, Quote } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Patient Stories — Real Healing Journeys · Homeofirst" },
      {
        name: "description",
        content:
          "Read patient stories from Homeofirst, Hajipur — families who found lasting relief through homeopathy under Dr. Paramjeet Prabhakar.",
      },
      { property: "og:title", content: "Patient Stories — Homeofirst" },
    ],
  }),
  component: StoriesPage,
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

function StoriesPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Patient stories"
            title="Real journeys. Real healing."
            description="A small selection of the families who have walked through our doors — and the quiet, steady recoveries they've found."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </section>

      <section className="container-page pb-20">
        <p className="text-center text-xs text-muted-foreground">
          * Patient names and details shared with consent. Individual results may vary.
        </p>
      </section>
    </>
  );
}

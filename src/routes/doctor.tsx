import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, Users, Calendar, Phone, MessageCircle } from "lucide-react";
import drImg from "@/assets/dr-paramjeet.jpg";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Dr. Paramjeet Prabhakar — Homeopathy Specialist · Hajipur" },
      {
        name: "description",
        content:
          "Meet Dr. Paramjeet Prabhakar, BHMS — homeopathy specialist with 26+ years of practice in Hajipur, Bihar. 2 lakh+ patients treated.",
      },
      { property: "og:title", content: "Dr. Paramjeet Prabhakar — Homeopath, Hajipur" },
      { property: "og:image", content: drImg },
    ],
  }),
  component: DoctorPage,
});

const TIMELINE = [
  { year: "1998", text: "Completed BHMS and began private practice in Hajipur." },
  { year: "2005", text: "Crossed 25,000 consultations; specialised focus on chronic disease." },
  { year: "2012", text: "Established the present clinic at Station Road, Hajipur." },
  { year: "2018", text: "Reached 1 lakh patients treated across Bihar." },
  { year: "Today", text: "26+ years in practice, 2 lakh+ patients, 5★ patient rating." },
];

function DoctorPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-page grid items-center gap-12 lg:grid-cols-[5fr_6fr]">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-glow">
              <img
                src={drImg}
                alt="Portrait of Dr. Paramjeet Prabhakar"
                width={1024}
                height={1280}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Homeopathy Specialist · Hajipur, Bihar
            </div>
            <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
              Dr. Paramjeet Prabhakar
            </h1>
            <span className="leaf-divider mt-5" />
            <p className="mt-6 text-lg text-muted-foreground">
              For more than two decades, Dr. Paramjeet has been the quiet backbone of homeopathic
              care in Hajipur. His practice is defined by long, careful consultations, classical
              prescribing, and a deep respect for each patient's story.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <GraduationCap className="h-5 w-5 text-accent" />
                <div className="mt-2 font-serif text-2xl">BHMS</div>
                <div className="text-xs text-muted-foreground">Qualified Practitioner</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <Award className="h-5 w-5 text-accent" />
                <div className="mt-2 font-serif text-2xl">26+ yrs</div>
                <div className="text-xs text-muted-foreground">Clinical experience</div>
              </div>
              <div className="rounded-2xl border border-border bg-card p-4">
                <Users className="h-5 w-5 text-accent" />
                <div className="mt-2 font-serif text-2xl">2 Lakh+</div>
                <div className="text-xs text-muted-foreground">Patients treated</div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Book consultation
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium"
              >
                <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl">Approach to care</h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                Dr. Paramjeet practises classical homeopathy — one carefully chosen remedy at a
                time, prescribed after a detailed case-taking that may last 45 minutes or more.
              </p>
              <p>
                He believes that symptoms are messages, not enemies. The goal is never to suppress
                them but to gently restore the body's balance so they fade naturally.
              </p>
              <p>
                Patients often describe their consultations as unhurried and thorough — a rarity in
                modern medicine, and the reason families return to him across generations.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-3xl">Areas of focus</h3>
            <span className="leaf-divider mt-3" />
            <ul className="mt-6 grid gap-2 text-foreground sm:grid-cols-2">
              {[
                "Chronic skin disorders",
                "Joint pain & arthritis",
                "Asthma & allergies",
                "Digestive conditions",
                "Women's health & PCOS",
                "Pediatric immunity",
                "Diabetes & thyroid",
                "Migraine & sleep issues",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary-soft/40 py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Journey" title="A career devoted to homeopathy" />
          <div className="mx-auto mt-14 max-w-3xl">
            {TIMELINE.map((t, i) => (
              <div key={t.year} className="relative grid grid-cols-[80px_1fr] gap-6 pb-8">
                <div className="text-right">
                  <div className="font-serif text-xl text-primary">{t.year}</div>
                </div>
                <div className="relative border-l border-border pl-6">
                  <span className="absolute -left-[7px] top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary ring-4 ring-primary-soft" />
                  <p className="text-foreground">{t.text}</p>
                  {i === TIMELINE.length - 1 && (
                    <div className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> Still accepting new patients
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

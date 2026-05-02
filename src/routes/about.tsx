import { createFileRoute } from "@tanstack/react-router";
import { Leaf, Heart, Award, Users } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import leavesBg from "@/assets/leaves-bg.jpg";
import kapilVideo from "@/assets/Receiving Award from Kapil Dev Video.mp4";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Homeofirst — Our Philosophy of Care" },
      {
        name: "description",
        content:
          "Homeofirst is a homeopathy clinic in Hajipur built on listening, individualised remedies, and 26+ years of experience under Dr. Paramjeet Prabhakar.",
      },
      { property: "og:title", content: "About Homeofirst" },
      { property: "og:description", content: "Our philosophy: gentle homeopathy, lasting healing." },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { icon: Heart, title: "Patient First", desc: "We listen deeply. Every treatment plan begins with truly understanding you." },
  { icon: Leaf, title: "Natural & Safe", desc: "Homeopathic remedies are gentle, non-toxic, and free from side effects." },
  { icon: Award, title: "Proven Practice", desc: "Backed by 26+ years of clinical experience and continuous learning." },
  { icon: Users, title: "Family Care", desc: "From newborns to grandparents — care for every member of your family." },
];

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `url(${leavesBg})`, backgroundSize: "cover" }}
        />
        <div className="container-page relative">
          <SectionHeading
            eyebrow="About us"
            title="A clinic built on listening"
            description="Homeofirst was founded with a simple belief — that healing begins when a doctor truly hears you. For over two decades, we've cared for families across Hajipur and Bihar with quiet, attentive medicine."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl text-foreground">Our story</h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-base text-muted-foreground">
              <p>
                Homeofirst grew from Dr. Paramjeet Prabhakar's lifelong commitment to homeopathy — a
                medicine he sees not as an alternative, but as a complete system of healing rooted
                in observation, individualisation, and respect for the body's wisdom.
              </p>
              <p>
                Over 26+ years and more than 2 lakh consultations, the clinic has become a quiet
                landmark in Hajipur — a place where patients are remembered by name, where children
                grow up under one doctor's watch, and where chronic conditions are treated with
                patience rather than haste.
              </p>
              <p>
                We don't believe in quick fixes. We believe in remedies chosen carefully, follow-ups
                that matter, and the kind of healing that lasts.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] bg-ink shadow-glow">
              <video
                src={kapilVideo}
                className="h-full w-full object-cover"
                controls
                muted
                loop
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-ink/40 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-background p-5 shadow-soft ring-1 ring-border">
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-serif text-lg leading-none">Distinction</div>
                  <div className="text-xs text-muted-foreground">Received from Kapil Dev</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-card py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="font-serif text-3xl text-foreground">Our philosophy</h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-base text-muted-foreground">
              <p>
                Homeopathy works on the principle of <em>similia similibus curentur</em> — like
                cures like. A substance that produces symptoms in a healthy person can, in
                minute potencies, stimulate healing in someone unwell.
              </p>
              <p>
                But the science is only half the story. The other half is the art of case-taking —
                of understanding the person behind the patient, their constitution, their
                emotions, and their daily life.
              </p>
              <p>
                That's how we work. Slowly, carefully, and always with the whole person in mind.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[2rem] bg-primary-soft/30 p-8">
            <div className="max-w-xs text-center">
              <Heart className="mx-auto h-12 w-12 text-primary" />
              <h4 className="mt-6 font-serif text-2xl">Holistic Healing</h4>
              <p className="mt-3 text-sm text-muted-foreground">
                We believe in treating the person, not just the disease. Our approach is gentle, deep, and individualised.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary-soft/40 py-20">
        <div className="container-page">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="rounded-2xl bg-card p-7 shadow-soft">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                  <v.icon className="h-5 w-5" />
                </div>
                <h4 className="mt-5 font-serif text-xl">{v.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

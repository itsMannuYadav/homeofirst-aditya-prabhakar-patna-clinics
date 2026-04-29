import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ShieldCheck, Sparkles, Leaf, ArrowRight, Phone, MessageCircle } from "lucide-react";
import heroImg from "@/assets/hero-homeopathy.jpg";
import drImg from "@/assets/dr-paramjeet.jpg";
import leavesBg from "@/assets/leaves-bg.jpg";
import { Stat } from "@/components/Stat";
import { SectionHeading } from "@/components/SectionHeading";
import { SocialGallery } from "@/components/SocialGallery";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Homeofirst — Homeopathy Clinic in Hajipur · Dr. Paramjeet Prabhakar" },
      {
        name: "description",
        content:
          "Trusted homeopathy clinic in Hajipur, Bihar. 26+ years of experience, 2 lakh+ patients, 5★ rated. Gentle, safe, individualised treatment.",
      },
      { property: "og:title", content: "Homeofirst — Homeopathy in Hajipur" },
      {
        property: "og:description",
        content: "Gentle homeopathy. Lasting healing. Led by Dr. Paramjeet Prabhakar.",
      },
    ],
  }),
  component: HomePage,
});

const TREATMENTS = [
  { icon: "🌿", title: "Skin & Hair", desc: "Eczema, psoriasis, acne, hair fall, vitiligo." },
  { icon: "🦴", title: "Joints & Arthritis", desc: "Knee pain, rheumatoid arthritis, gout, sciatica." },
  { icon: "🫁", title: "Respiratory", desc: "Asthma, allergic rhinitis, sinusitis, recurring cough." },
  { icon: "🍃", title: "Digestive", desc: "Acidity, IBS, constipation, ulcers, liver care." },
  { icon: "🌸", title: "Women's Health", desc: "PCOS, menstrual issues, fertility, menopause." },
  { icon: "🧒", title: "Pediatric Care", desc: "Recurring infections, immunity, growth, behavior." },
  { icon: "💭", title: "Lifestyle Disorders", desc: "Diabetes, thyroid, hypertension, obesity." },
  { icon: "🌙", title: "Chronic Ailments", desc: "Migraine, anxiety, sleep issues, autoimmune." },
];

const TESTIMONIALS = [
  {
    name: "Sunita Devi",
    role: "Patient · Hajipur",
    text: "After years of struggling with chronic migraines, Dr. Prabhakar's treatment gave me my life back. Gentle, patient, and truly listens.",
  },
  {
    name: "Ramesh Kumar",
    role: "Patient · Vaishali",
    text: "My son's recurring asthma is now under control without harsh medicines. We are deeply grateful to Homeofirst.",
  },
  {
    name: "Priya Singh",
    role: "Patient · Patna",
    text: "I travel from Patna because there's no one like Dr. Paramjeet. His diagnosis and care feel personal, not rushed.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: `url(${leavesBg})`, backgroundSize: "cover" }}
        />
        <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border">
              <Leaf className="h-3.5 w-3.5 text-accent" />
              Homeopathy Clinic · Hajipur, Bihar
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
              Gentle homeopathy.<br />
              <span className="text-primary italic">Lasting healing.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              At Homeofirst, Dr. Paramjeet Prabhakar treats the person — not just the disease. Safe,
              individualised remedies guided by 26+ years of clinical practice.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
              >
                <MessageCircle className="h-4 w-4" />
                Book on WhatsApp
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted"
              >
                <Phone className="h-4 w-4 text-accent" />
                Call clinic
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span><strong className="text-foreground">5.0</strong> patient rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>BHMS · Reg. Practitioner</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-[2rem] shadow-glow">
              <img
                src={heroImg}
                alt="Homeopathic globules in a wooden bowl with fresh green leaves"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-5 shadow-soft ring-1 ring-border md:block">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-serif text-lg leading-none">2 Lakh+</div>
                  <div className="text-xs text-muted-foreground">patients treated</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 animate-float rounded-full bg-primary-soft" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border bg-card">
        <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <Stat value={SITE.stats.years} label="Years of practice" />
          <Stat value={SITE.stats.patients} label="Patients treated" />
          <Stat value={SITE.stats.rating + "★"} label="Average rating" />
          <Stat value="100%" label="Safe & natural" sub="No side effects" />
        </div>
      </section>

      {/* TREATMENTS */}
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
              to="/treatments"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              See all treatments <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* DOCTOR */}
      <section className="bg-primary-soft/40 py-20 md:py-28">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-soft">
              <img
                src={drImg}
                alt="Dr. Paramjeet Prabhakar"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-6 rounded-2xl bg-background px-6 py-4 shadow-soft ring-1 ring-border">
              <div className="font-serif text-3xl text-primary">26+</div>
              <div className="text-xs text-muted-foreground">years of practice</div>
            </div>
          </div>
          <div>
            <SectionHeading
              eyebrow="Meet your doctor"
              title="Dr. Paramjeet Prabhakar"
              description="A homeopathy specialist serving Hajipur and the wider Vaishali district. Known for his attentive consultations, careful case-taking, and remedies that honour each patient's individual constitution."
              align="left"
            />
            <ul className="mt-7 space-y-3 text-sm text-foreground">
              {[
                "BHMS · Bachelor of Homeopathic Medicine & Surgery",
                "26+ years of clinical practice",
                "2 lakh+ patients treated across Bihar",
                "Specialises in chronic and lifestyle conditions",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Leaf className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              to="/doctor"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Read full profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
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

      {/* SOCIAL GALLERY */}
      <SocialGallery />

      {/* CTA */}
      <section className="container-page pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{ backgroundImage: `url(${leavesBg})`, backgroundSize: "cover" }}
          />
          <div className="relative">
            <h2 className="font-serif text-3xl md:text-5xl">Begin your healing journey today</h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
              Book a consultation with Dr. Paramjeet Prabhakar. We'll listen, understand, and care.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Book on WhatsApp
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium"
              >
                <Phone className="h-4 w-4" /> {SITE.phone}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

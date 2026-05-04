import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap, Award, Users, Calendar, Phone, MessageCircle } from "lucide-react";
import drImg from "@/assets/dr Paramjeet Prabhakar.jpeg";
import { SectionHeading } from "@/components/SectionHeading";
import kapilVideo from "@/assets/kapil dev award.mp4"
import newsAvardVideo from "@/assets/zee news interview.mp4"
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/doctor")({
  head: () => ({
    meta: [
      { title: "Dr. Paramjeet Prabhakar — Homeopathy Specialist · Hajipur" },
      {
        name: "description",
        content:
          "Meet Dr. Paramjeet Prabhakar — homeopathy specialist at Prabhakar's Clinic, Hajipur. 26+ years of practice, 2 lakh+ patients treated.",
      },
      { property: "og:title", content: "Dr. Paramjeet Prabhakar — Homeopath, Hajipur" },
      { property: "og:image", content: drImg },
    ],
  }),
  component: DoctorPage,
});

const TIMELINE = [
  { year: "1998", text: "Began private practice in Hajipur as a Homeopathy Specialist." },
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
            <div className="overflow-hidden rounded-4xl shadow-glow">
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
              Prabhakar's Clinic · Hajipur, Bihar
            </div>
            <h1 className="mt-3 font-serif text-4xl text-foreground md:text-5xl lg:text-6xl">
              Dr. Paramjeet Prabhakar
            </h1>
            <span className="leaf-divider mt-5" />
            <p className="mt-6 text-lg text-muted-foreground">
              For more than two decades, Dr. Paramjeet has been the quiet backbone of homeopathic
              care at Prabhakar's Clinic, Hajipur. His practice is defined by long, careful
              consultations, classical prescribing, and a deep respect for each patient's story.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4">
                <GraduationCap className="h-5 w-5 text-accent" />
                <div className="mt-2 font-serif text-2xl leading-tight">Homeopathy Specialist</div>
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
                In today’s fast-paced lifestyle, unhealthy eating habits, mental stress, and environmental pollution are leading to a rapid increase in chronic diseases, hormonal imbalances, skin and hair problems, and gynecological disorders among women.
              </p>
              <p>In such times, homeopathy has emerged as a safe, natural, and long-lasting form of treatment.</p>

              <p>
                In this field, Dr. Paramjeet Prabhakar is an experienced and dedicated Homeopathy Specialist. She focuses not just on treating symptoms but on identifying and addressing the root cause of diseases. Her goal is not only to provide relief but to guide patients toward complete wellness.
              </p>
            </div>
          </div>
          <div>
            <h3 className="font-serif text-3xl">Areas of focus</h3>
            <span className="leaf-divider mt-3" />
            <div className="flex-col">
              <div className="mt-6">
                <ul className="grid gap-2 text-foreground sm:grid-cols-2">
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
              <div className="mt-6">
                <p>
                  Dr. Paramjeet Prabhakar believes:
                </p>

                <p className="bg-background mt-1">
                  “Every disease is a result of imbalance in the body, mind, and lifestyle.”
                </p>
                
                <p className="mt-4">
                Based on this philosophy, he:

                Conducts a deep analysis of the patient’s physical, mental, and emotional condition
                Creates personalized (individualized) treatment plans for each patient
                Provides lifestyle guidance along with medicines
                Key Benefits of Homeopathy
                No side effects
                Non-addictive medicines
                Strengthens the body’s natural immunity
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container-page grid gap-8 lg:grid-col-2">
          
          <div>
            <h3 className="font-serif text-3xl">
              1. Treatment of Skin Disorders
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>The skin reflects internal health, and any imbalance often appears externally.</p>

              <p>Conditions Treated:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Acne / Pimples",
                  "Allergies",
                  "Eczema",
                  "Psoriasis",
                  "Fungal infections",
                  "Skin pigmentation",
                  "Spots and blemishes"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              
              <p>Treatment Method:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Blood purification",
                  "Strengthening the immune system",
                  "Hormonal balance"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent " />
                        {s}
                    </li>
                  ))}
              </ul>
              <p>Homeopathy treats skin diseases from within, reducing the chances of recurrence.</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-3xl">
              2. Treatment of Hair Disorders
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Hair-related issues are increasingly common across all age groups. Dr. Paramjeet Prabhakar treats:</p>

              <p>Common Problems:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Excessive hair fall",
                  "Baldness (Alopecia Areata / Pattern Baldness)",
                  "Dandruff",
                  "Premature greying",
                  "Weak and thin hair",
                  "Scalp infections"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              
              <p>Treatment Approach:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Correcting hormonal imbalance",
                  "Addressing nutritional deficiencies",
                  "Managing stress and sleep issues"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent " />
                        {s}
                    </li>
                  ))}
              </ul>
              <p>Homeopathic treatment strengthens hair from the roots and promotes natural regrowth over time.</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-3xl">
              3. Leucoderma (Vitiligo / White Patches)
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Leucoderma is a complex skin condition where patches of skin lose their natural color. It can affect mental well-being as much as physical appearance.</p>

              <p>Treatment Highlights:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Activating pigment-producing cells",
                  "Addressing autoimmune causes",
                  "Gradual restoration of natural skin color"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              <p>Treatment focuses on patience, consistency, and precise medicine selection, which has helped many patients achieve positive results.</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-3xl">
              4. Gynecological Disorders
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Dr. Paramjeet Prabhakar is especially dedicated to women’s health.</p>

              <p>Conditions Treated:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["PCOD (Polycystic Ovarian Disease)",
                  "PCOS (Polycystic Ovarian Syndrome)",
                  "Irregular periods",
                  "Heavy or scanty bleeding",
                  "Hormonal imbalance",
                  "Infertility",
                  "Menopause-related issues"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              
              <p>Benefits of Homeopathy in PCOD/PCOS:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Naturally balances hormones",
                  "Helps manage weight",
                  "Regulates menstrual cycles",
                  "Improves chances of conception"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent " />
                        {s}
                    </li>
                  ))}
              </ul>
              <p>This treatment is safe and avoids hormonal medications or invasive procedures.</p>
            </div>
          </div>

          <div>
            <h3 className="font-serif text-3xl">
              5. Joint Pain & Bone Disorders
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Joint pain is now common across all age groups.</p>

              <p>Conditions Treated:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Arthritis",
                  "Knee pain",
                  "Back pain",
                  "Cervical issues / Slip disc",
                  "Sciatica"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              
              <p>Why Homeopathy is Effective:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Reduces inflammation",
                  "Treats pain at the root level",
                  "Provides long-term relief"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent " />
                        {s}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="font-serif text-3xl">
              6. Management of Chronic Diseases
            </h3>
            <span className="leaf-divider mt-3" />
            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>Dr. Paramjeet Prabhakar provides specialized care for chronic conditions.</p>

              <p>Chronic Conditions:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Asthma",
                  "Allergies",
                  "Migraine",
                  "Thyroid disorders",
                  "Diabetes (supportive treatment)",
                  "High blood pressure (supportive treatment)"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
              
              <p>Benefits:</p>
              <ul className="grid gap-2 text-foreground sm:grid-cols-2">
                {["Reduces dependency on medicines",
                  "Lowers disease severity",
                  "Improves overall quality of life"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent " />
                        {s}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
      <section className="py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-4xl bg-ink shadow-glow">
              <video
                src={kapilVideo}
                className="h-full w-full object-cover"
                controls
                muted
                loop
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-ink/40 to-transparent" />
            </div>
            
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-4xl bg-ink shadow-glow">
              <video
                src={newsAvardVideo}
                className="h-full w-full object-cover"
                controls
                muted
                loop
                autoPlay
                playsInline
              />
              <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-ink/40 to-transparent" />
            </div>
            
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
                  <span className="absolute -left-1.75 top-1.5 inline-flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary ring-4 ring-primary-soft" />
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
      <section className="container-page mt-10 pb-20">
        <div className="rounded-4xl bg-primary px-8 py-10 text-center text-primary-foreground md:px-16">
          <div className="mt-4 space-y-4 mx-auto max-w-xl text-primary-foreground/85">
              <p className="font-serif text-3xl md:text-4xl">If you are:</p>
              <ul className="grid gap-2 ">
                {["Looking for natural treatment",
                  "Seeking a long-term solution without side effects",
                  "Struggling with chronic health issues"].map((s) => (
                    <li key={s} className="flex items-center gap-2 text-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                      {s}
                    </li>
                  ))}
              </ul>
            </div>

          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/85">
            Then Dr. Paramjeet Prabhakar is a trusted name who can guide you toward better health, balance, and a healthier life through homeopathy.
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

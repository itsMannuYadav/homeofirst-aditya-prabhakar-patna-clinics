import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageCircle, Star, Sparkles, ArrowRight, Building2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { SITE } from "@/lib/site";
import leavesBg from "@/assets/leaves-bg.jpg";

export const Route = createFileRoute("/clinics")({
  head: () => ({
    meta: [
      { title: "Our Clinics — Homeofirst Network of Care" },
      {
        name: "description",
        content:
          "Find a Homeofirst clinic near you. Featuring Prabhakar's Clinic in Hajipur and our upcoming expansion across Bihar.",
      },
    ],
  }),
  component: ClinicsPage,
});

function ClinicsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `url(${leavesBg})`, backgroundSize: "cover" }}
        />
        <div className="container-page relative text-center">
          <SectionHeading
            eyebrow="Our Network"
            title="Clinics you can trust"
            description="Homeofirst brings elite homeopathic care to your doorstep. We are starting with our flagship legacy in Hajipur and expanding across Bihar."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          {SITE.clinics.map((clinic) => (
            <div
              key={clinic.id}
              className={`relative overflow-hidden rounded-[2rem] border p-8 transition-all md:p-12 ${
                clinic.status === "active"
                  ? "border-primary/20 bg-card shadow-soft"
                  : "border-border bg-muted/30 opacity-80"
              }`}
            >
              {clinic.isFlagship && (
                <div className="absolute right-8 top-8 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                  Flagship Location
                </div>
              )}
              
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <Building2 className="h-8 w-8" />
              </div>

              <h3 className="mt-8 font-serif text-3xl text-foreground md:text-4xl">
                {clinic.name}
              </h3>
              <p className="mt-2 text-lg font-medium text-accent">{clinic.location}</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 text-muted-foreground">
                  <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                  <p className="text-sm">{clinic.address}</p>
                </div>
                
                {clinic.status === "active" && (
                  <>
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <Star className="h-5 w-5 text-gold fill-gold" />
                      <p className="text-sm font-medium text-foreground">5.0 Patient Satisfaction</p>
                    </div>
                    
                    <div className="mt-10 flex flex-wrap gap-4">
                      <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-soft"
                      >
                        <MessageCircle className="h-4 w-4" /> Book at this branch
                      </a>
                      <a
                        href={SITE.phoneHref}
                        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium"
                      >
                        <Phone className="h-4 w-4" /> Call Clinic
                      </a>
                    </div>
                  </>
                )}
                
                {clinic.status === "upcoming" && (
                  <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
                    <Sparkles className="h-4 w-4" /> Expansion Underway
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-24">
        <div className="rounded-[3rem] bg-ink px-8 py-16 text-center text-white md:px-20 md:py-24">
          <SectionHeading
            eyebrow="The Homeofirst Vision"
            title="Expansion across Bihar"
            description="Our mission is to bring Dr. Paramjeet Prabhakar's standard of gentle, individualised care to every major city. We are currently scouting locations in Patna and Muzaffarpur."
            align="center"
          />
          <div className="mt-10 flex justify-center">
             <Link to="/contact" className="inline-flex items-center gap-2 text-primary-soft hover:gap-3 transition-all font-medium">
                Inquire about new locations <ArrowRight className="h-4 w-4" />
             </Link>
          </div>
        </div>
      </section>
    </>
  );
}

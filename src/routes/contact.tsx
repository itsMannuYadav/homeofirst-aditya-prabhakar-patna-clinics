import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";
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
    </>
  );
}

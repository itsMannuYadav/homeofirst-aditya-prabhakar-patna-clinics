import drImg from "@/public/assets/dr Paramjeet Prabhakar.jpeg";
import Link from "next/link";
import { SectionHeading } from "../SectionHeading";
import { Leaf, ArrowRight } from "lucide-react";
import Image from "next/image";
export function Doctors() {
    return (
        <section className="bg-primary-soft/40 py-20 md:py-28 relative overflow-hidden bg-gradient-hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{ backgroundImage: "url('/assets/independence-day-bg.png')", backgroundSize: "cover" }}
        />

        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div className="relative">
            <div className="overflow-hidden rounded-4xl shadow-soft h-150 sm:h-250">
              <Image
                src={drImg}
                alt="Dr. Paramjeet Prabhakar"
                width={1024}
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
              description="The Chief Specialist at Prabhakar's Clinic, Hajipur. Known for his attentive consultations, careful case-taking, and remedies that honour each patient's individual constitution."
              align="left"
            />
            <ul className="mt-7 space-y-3 text-sm text-foreground font-inter">
              {[
                "Homeopathy Specialist",
                "26+ years of clinical practice",
                "2 lakh+ patients treated across Bihar",
                "Specialises in chronic and lifestyle conditions",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/doctor"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-primary px-5 py-2.5 text-sm font-medium text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Read full profile <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    )
}
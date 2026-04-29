import { createFileRoute } from "@tanstack/react-router";
import { SocialGallery } from "@/components/SocialGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Instagram, Camera, Video } from "lucide-react";
import drImg from "@/assets/dr-paramjeet.jpg";
import heroImg from "@/assets/hero-homeopathy.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Clinic Highlights & Health Tips · Homeofirst" },
      {
        name: "description",
        content: "Explore Homeofirst's gallery. Watch health tip videos, see our clinic, and learn about homeopathy through our social media updates.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="Life at Homeofirst"
            description="A glimpse into our clinic, patient education videos, and our community impact."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-page">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-8 border-b border-border pb-8">
            <div className="flex items-center gap-2 text-primary">
              <Video className="h-5 w-5" />
              <span className="font-medium">Videos & Reels</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Camera className="h-5 w-5" />
              <span className="font-medium">Photos</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Instagram className="h-5 w-5" />
              <span className="font-medium">Social Wall</span>
            </div>
          </div>

          <SocialGallery showHeading={false} />
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
             {/* Static Photo Gallery Section */}
             <div className="group relative overflow-hidden rounded-2xl bg-muted aspect-square">
                <img src={drImg} alt="Clinic" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
             </div>
             <div className="group relative overflow-hidden rounded-2xl bg-muted aspect-square">
                <img src={heroImg} alt="Medicine" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
             </div>
             <div className="group relative overflow-hidden rounded-2xl bg-muted aspect-square">
                <img src={drImg} alt="Consultation" className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
             </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-20 text-center">
        <p className="text-muted-foreground">
          Follow us on Instagram for daily updates and health tips.
        </p>
        <a
          href="https://www.instagram.com/homeofirst/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
        >
          <Instagram className="h-5 w-5" />
          Connect with @homeofirst
        </a>
      </section>
    </>
  );
}

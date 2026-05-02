import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SocialGallery } from "@/components/SocialGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Instagram, Camera, Video } from "lucide-react";
import drImg from "@/assets/dr-paramjeet.jpg";
import heroImg from "@/assets/Hero Section Slide Show Image 1.jpg";
import slide3 from "@/assets/Hero Section Slide Show Image  3.jpg";
import slide5 from "@/assets/Hero Section Slide Show Image 5.jpg";
import { SITE } from "@/lib/site";

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

const PHOTOS = [
  { id: "p1", img: drImg, alt: "Dr. Paramjeet at the clinic" },
  { id: "p2", img: heroImg, alt: "Homeopathic medicine focus" },
  { id: "p3", img: slide3, alt: "Clinic award showcase" },
  { id: "p4", img: slide5, alt: "Consultation room" },
];

function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "videos" | "photos">("all");

  return (
    <>
      <section className="bg-gradient-hero pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="container-page">
          <SectionHeading
            eyebrow="Gallery"
            title="Life at Homeofirst"
            description="A glimpse into our clinic, patient education videos, and our community impact."
          />
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-page">
          <div className="mb-12 flex flex-wrap items-center justify-center gap-6 border-b border-border pb-8 md:gap-12">
            <button 
              onClick={() => setFilter("videos")}
              className={`flex items-center gap-2 transition-all duration-300 ${filter === "videos" ? "text-primary border-b-2 border-primary pb-2 scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Video className="h-5 w-5" />
              <span className="text-sm font-medium">Videos & Reels</span>
            </button>
            <button 
              onClick={() => setFilter("photos")}
              className={`flex items-center gap-2 transition-all duration-300 ${filter === "photos" ? "text-primary border-b-2 border-primary pb-2 scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Camera className="h-5 w-5" />
              <span className="text-sm font-medium">Photos</span>
            </button>
            <button 
              onClick={() => setFilter("all")}
              className={`flex items-center gap-2 transition-all duration-300 ${filter === "all" ? "text-primary border-b-2 border-primary pb-2 scale-105" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Instagram className="h-5 w-5" />
              <span className="text-sm font-medium">Social Wall</span>
            </button>
          </div>

          {(filter === "all" || filter === "videos") && (
            <SocialGallery showHeading={false} noPadding showViewAll={false} className="mb-12" />
          )}
          
          {(filter === "all" || filter === "photos") && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
               {PHOTOS.map((photo) => (
                 <div key={photo.id} className="group relative overflow-hidden rounded-2xl bg-muted aspect-square shadow-soft ring-1 ring-border">
                    <img src={photo.img} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink/20 opacity-0 transition-opacity group-hover:opacity-100" />
                 </div>
               ))}
            </div>
          )}
        </div>
      </section>

      <section className="border-t border-border bg-card py-20 text-center">
        <div className="container-page">
          <p className="text-muted-foreground">
            Follow us on Instagram for daily updates and health tips.
          </p>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            <Instagram className="h-5 w-5" />
            Connect with @homeofirst._
          </a>
        </div>
      </section>
    </>
  );
}

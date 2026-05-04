import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SocialGallery } from "@/components/SocialGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { Instagram, Camera, Video, X, Maximize2 } from "lucide-react";
import drImg from "@/assets/dr-paramjeet.jpg";
import slide1 from "@/assets/Hero Section Slide Show Image 1.jpg";
import slide2 from "@/assets/Hero Section Slide Show Image 2.jpg";
import slide3 from "@/assets/Hero Section Slide Show Image  3.jpg";
import slide4 from "@/assets/Hero Section Slide Show Image 4.jpg";
import slide5 from "@/assets/Hero Section Slide Show Image 5.jpg";
import slide6 from "@/assets/Hero Section Slide Show Image 6.jpg";
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
  { id: "p2", img: slide1, alt: "Prestigious homeopathy award ceremony" },
  { id: "p3", img: slide2, alt: "Excellence in Homeopathy award" },
  { id: "p4", img: slide3, alt: "Recognition for 26+ years of service" },
  { id: "p5", img: slide4, alt: "Awarded by renowned medical professionals" },
  { id: "p6", img: slide5, alt: "Honored for contribution to natural healing" },
  { id: "p7", img: slide6, alt: "Homeofirst clinic achievement award" },
];

function GalleryPage() {
  const [filter, setFilter] = useState<"all" | "videos" | "photos">("all");
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (selectedImg) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedImg]);

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
                 <button 
                    key={photo.id} 
                    onClick={() => setSelectedImg(photo.img)}
                    className="group relative overflow-hidden rounded-2xl bg-muted aspect-square shadow-soft ring-1 ring-border"
                 >
                    <img src={photo.img} alt={photo.alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                       <Maximize2 className="text-white h-8 w-8 scale-75 group-hover:scale-100 transition-transform duration-300" />
                    </div>
                 </button>
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

      {/* LIGHTBOX MODAL */}
      {selectedImg && (
        <div 
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/95 p-4 md:p-10 transition-all animate-in fade-in duration-300"
          onClick={() => setSelectedImg(null)}
        >
          <button 
            className="absolute right-6 top-6 z-110 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={(e) => { e.stopPropagation(); setSelectedImg(null); }}
          >
            <X className="h-6 w-6" />
          </button>
          
          <div 
            className="relative max-h-full max-w-full overflow-hidden rounded-xl shadow-2xl animate-in zoom-in-95 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImg} 
              alt="Gallery Preview" 
              className="max-h-[90vh] w-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}

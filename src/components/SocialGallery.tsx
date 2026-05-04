import { Play, Instagram, ArrowRight } from "lucide-react";
import drImg from "@/assets/dr-paramjeet.jpg";
import heroImg from "@/assets/Hero Section Slide Show Image 1.jpg";
import { SectionHeading } from "./SectionHeading";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

const REELS = [
  {
    id: "1",
    thumbnail: drImg,
    title: "Understanding Homeopathy",
    link: "https://www.instagram.com/homeofirst._?igsh=NDQ0YnYxb2RrN2xv",
  },
  {
    id: "2",
    thumbnail: heroImg,
    title: "Gentle Healing Process",
    link: "https://www.instagram.com/homeofirst._?igsh=NDQ0YnYxb2RrN2xv",
  },
  {
    id: "3",
    thumbnail: drImg,
    title: "Patient Success Stories",
    link: "https://www.instagram.com/homeofirst._?igsh=NDQ0YnYxb2RrN2xv",
  },
  {
    id: "4",
    thumbnail: heroImg,
    title: "Clinic Highlights",
    link: "https://www.instagram.com/homeofirst._?igsh=NDQ0YnYxb2RrN2xv",
  },
];

export function SocialGallery({ 
  showHeading = true, 
  noPadding = false,
  showViewAll = true,
  className = ""
}: { 
  showHeading?: boolean;
  noPadding?: boolean;
  showViewAll?: boolean;
  className?: string;
}) {
  return (
    <section className={`${noPadding ? "" : "py-20 md:py-28"} ${className}`}>
      <div className="container-page">
        {showHeading && (
          <SectionHeading
            eyebrow="Social Media"
            title="Follow our healing journey"
            description="Stay updated with health tips, patient stories, and clinic life on Instagram."
          />
        )}

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REELS.map((reel) => (
            <a
              key={reel.id}
              href={reel.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-9/16 overflow-hidden rounded-2xl bg-muted shadow-soft ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-glow"
            >
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background/20 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 fill-white text-white" />
                </div>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-2 text-xs font-medium text-primary-foreground/80">
                  <Instagram className="h-3.5 w-3.5" />
                  Instagram Reel
                </div>
                <h3 className="mt-1 font-serif text-lg text-white">{reel.title}</h3>
              </div>
            </a>
          ))}
        </div>

        {showViewAll && (
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-ink/90"
            >
              <Instagram className="h-4 w-4" />
              Follow @homeofirst._
            </a>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
              View full gallery
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

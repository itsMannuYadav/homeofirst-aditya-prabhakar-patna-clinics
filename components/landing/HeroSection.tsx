"use client"
import { HERO_SLIDES } from "@/data/landing";
import { SITE } from "@/lib/site";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { Leaf, Maximize2, MessageCircle, PartyPopper, Phone, ShieldCheck, Sparkles, Star, StarHalf, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import Image, { type StaticImageData } from "next/image";
import { Stat } from "../Stats";
//import intro from "@/public/assets/";
import { SectionHeading } from "../SectionHeading";

export default function HeroSection() {
    const [emblaRef] = useEmblaCarousel({ loop: true, duration: 30 }, [
        Autoplay({ delay: 3000, stopOnInteraction: false }),
    ]);

    const [selectedImg, setSelectedImg] = useState<string | StaticImageData | null>(null);

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
    <section className="relative overflow-hidden bg-gradient-hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/assets/leaves-bg.jpg')", backgroundSize: "cover" }}
        />
        <div className="container-page relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-2 lg:py-28">
          <div className="reveal">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/70 px-3 py-1.5 text-xs font-medium text-foreground ring-1 ring-border">
              <Leaf className="h-3.5 w-3.5 text-accent" />
              Homeofirst Homeopathy Clinic · Hajipur
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
              Homeofirst homeopathy.<br />
              <span className="text-primary italic">Lasting healing.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Online and in-clinic homeopathic care with Dr. Paramjeet Prabhakar at homeofirst.in — personalized treatment and medicine delivery across India.
            </p>
            <div className="mt-5 max-w-xl text-lg text-muted-foreground">
              <div className="flex gap-2"><PartyPopper color="#225a39" strokeWidth={2.25}/> <span>First consultation absolutely free </span></div>
              <div className="flex gap-2"><Truck color="#225a39" strokeWidth={2.5}/>  <span>Doorstep Delivery of Medicines</span></div>
            </div>

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
                    i === 4 ? <StarHalf key={i} className="h-4 w-4 fill-gold text-gold" />:<Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <span><strong className="text-foreground">4.7</strong> patient rating</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" />
                <span>Prabhakar's Clinic, Hajipur</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="embla overflow-hidden rounded-4xl shadow-glow" ref={emblaRef}>
              <div className="embla__container flex">
                {HERO_SLIDES.map((slide, index) => (
                  <div key={index} className="embla__slide min-w-0 flex-[0_0_100%]">
                    <button 
                       onClick={() => setSelectedImg(slide.img)}
                       className="group relative block w-full h-full cursor-zoom-in"
                    >
                      <Image
                        src={slide.img}
                        alt={slide.alt}
                        width={1600}
                        height={1200}
                        className="aspect-4/3 w-full object-fit"
                      />
                      <div className="absolute inset-0 bg-ink/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="text-white h-10 w-10 scale-75 group-hover:scale-100 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl bg-background p-5 shadow-soft ring-1 ring-border md:block">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-accent" />
                <div>
                  <div className="font-serif text-lg leading-none">Recognized</div>
                  <div className="text-xs text-muted-foreground">for excellence</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 h-24 w-24 animate-float rounded-full bg-primary-soft" />
          </div>
        </div>
      </section>
      {/* stats */}
      <section className="border-y border-border bg-card">
        <div className="container-page grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          <Stat value={SITE.stats.years} label="Years of practice" />
          <Stat value={SITE.stats.patients} label="Patients treated" />
          <Stat value={SITE.stats.rating + "★"} label="Average rating" />
          <Stat value="100%" label="Safe & natural" sub="No side effects" />
        </div>
      </section>

      {/* INTRO VEDIO */}
      <section className="bg-primary-soft/40 py-20 relative overflow-hidden bg-gradient-hero">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{ backgroundImage: "url('/assets/leaves-bg.jpg')", backgroundSize: "cover" }}
        />
        <div className="container-page">
          <SectionHeading eyebrow="Why Choose Homeofirst" title="Dr. Paramjeet Prabhakar" />
          <div className="relative">
            <div className="relative overflow-hidden rounded-4xl bg-ink shadow-glow">
              <video
                src="/assets/intro-video.mp4"
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
            <Image
                src={selectedImg} 
                alt="Hero Preview" 
                className="max-h-[90vh] w-auto object-contain"
            />
            </div>
        </div>
        )}
    </>
    )
}
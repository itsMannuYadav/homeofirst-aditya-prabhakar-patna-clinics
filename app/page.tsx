import { Cta } from "@/components/landing/CTA";
import { Doctors } from "@/components/landing/Doctors";
import HeroSection from "@/components/landing/HeroSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Treatments } from "@/components/landing/Treatments";
import { SocialGallery } from "@/components/SocialGallery";

export default function Home() {
    return (
      <>
        <HeroSection />
         <Treatments />
         <Doctors />
         <Testimonials />
         <SocialGallery />
         <Cta />
      </>
    )
}

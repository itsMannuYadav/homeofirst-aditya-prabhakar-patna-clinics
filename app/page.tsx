import { Cta } from "@/components/landing/CTA";
import { Doctors } from "@/components/landing/Doctors";
import HeroSection from "@/components/landing/HeroSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Treatments } from "@/components/landing/Treatments";
import { SocialGallery } from "@/components/SocialGallery";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Homeofirst Homeopathy Clinic · Hajipur & Online",
  description:
    "Homeofirst (homeofirst.in) — trusted homeopathy clinic in Hajipur, Bihar led by Dr. Paramjeet Prabhakar. Online consultation, in-clinic care at Prabhakar's Clinic, and doorstep medicine delivery across India.",
  url: "/",
  keywords: [
    "homeopathy clinic Hajipur",
    "homeopathic doctor online",
    "best homeopathy clinic Bihar",
    "skin hair arthritis homeopathy",
  ],
});

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

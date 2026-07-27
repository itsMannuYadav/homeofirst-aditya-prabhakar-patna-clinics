import { Cta } from "@/components/landing/CTA";
import { Doctors } from "@/components/landing/Doctors";
import HeroSection from "@/components/landing/HeroSection";
import { Testimonials } from "@/components/landing/Testimonials";
import { Treatments } from "@/components/landing/Treatments";
import { SocialGallery } from "@/components/SocialGallery";
import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Best Homeopathic Clinic in Patna",

  description:
    "Consult experienced homeopathic doctors online. Get treatment for skin diseases, hair fall, arthritis, allergies and more.",

  url: "/",

  keywords: [
    "homeopathy",
    "homeopathic doctor",
    "patna",
    "online consultation",
    "skin treatment",
    "hair fall",
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

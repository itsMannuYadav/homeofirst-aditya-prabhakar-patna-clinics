import slide1 from "@/public/assets/Hero Section Slide Show Image 1.jpeg";
import slide2 from "@/public/assets/Hero Section Slide Show Image 2.jpeg";
import slide3 from "@/public/assets/Hero Section Slide Show Image 3.jpeg";
import slide4 from "@/public/assets/Hero Section Slide Show Image 4.jpeg";
import slide5 from "@/public/assets/Hero Section Slide Show Image 5.jpeg";
import slide6 from "@/public/assets/Hero Section Slide Show Image 6.jpeg";
import skinHair from "@/public/assets/treatments/treatment-skin-hair--generated-by-mannu-yadav.webp";
import jointsBones from "@/public/assets/treatments/treatment-joints-bones--generated-by-mannu-yadav.webp";
import respiratory from "@/public/assets/treatments/treatment-respiratory--generated-by-mannu-yadav.webp";
import digestive from "@/public/assets/treatments/treatment-digestive--generated-by-mannu-yadav.webp";
import womensHealth from "@/public/assets/treatments/treatment-womens-health--generated-by-mannu-yadav.webp";
import pediatric from "@/public/assets/treatments/treatment-pediatric--generated-by-mannu-yadav.webp";
import lifestyle from "@/public/assets/treatments/treatment-lifestyle--generated-by-mannu-yadav.webp";
import chronicMind from "@/public/assets/treatments/treatment-chronic-mind--generated-by-mannu-yadav.webp";
import type { StaticImageData } from "next/image";

export const HERO_SLIDES = [
  { img: slide1, alt: "Dr. Paramjeet Prabhakar receiving prestigious homeopathy award" },
  { img: slide2, alt: "Excellence in Homeopathy award ceremony" },
  { img: slide3, alt: "Recognition for 26+ years of clinical service" },
  { img: slide4, alt: "Awarded by renowned medical professionals" },
  { img: slide5, alt: "Honored for contribution to natural healing" },
  { img: slide6, alt: "Homeofirst clinic achievement award" },
];

export const TREATMENTS: {
  image: StaticImageData;
  imageAlt: string;
  title: string;
  desc: string;
}[] = [
  { image: skinHair, imageAlt: "Skin and hair care illustration", title: "Skin & Hair", desc: "Eczema, psoriasis, acne, hair fall, vitiligo." },
  { image: jointsBones, imageAlt: "Joints and arthritis care illustration", title: "Joints & Arthritis", desc: "Knee pain, rheumatoid arthritis, gout, sciatica." },
  { image: respiratory, imageAlt: "Respiratory care illustration", title: "Respiratory", desc: "Asthma, allergic rhinitis, sinusitis, recurring cough." },
  { image: digestive, imageAlt: "Digestive care illustration", title: "Digestive", desc: "Acidity, IBS, constipation, ulcers, liver care." },
  { image: womensHealth, imageAlt: "Women's health care illustration", title: "Women's Health", desc: "PCOS, menstrual issues, fertility, menopause." },
  { image: pediatric, imageAlt: "Pediatric care illustration", title: "Pediatric Care", desc: "Recurring infections, immunity, growth, behavior." },
  { image: lifestyle, imageAlt: "Lifestyle disorders care illustration", title: "Lifestyle Disorders", desc: "Diabetes, thyroid, hypertension, obesity." },
  { image: chronicMind, imageAlt: "Chronic ailments care illustration", title: "Chronic Ailments", desc: "Migraine, anxiety, sleep issues, autoimmune." },
];

export const TESTIMONIALS = [
  {
    name: "Sunita Devi",
    role: "Patient · Hajipur",
    text: "After years of struggling with chronic migraines, Dr. Prabhakar's treatment gave me my life back. Gentle, patient, and truly listens.",
  },
  {
    name: "Ramesh Kumar",
    role: "Patient · Vaishali",
    text: "My son's recurring asthma is now under control without harsh medicines. We are deeply grateful to Homeofirst.",
  },
  {
    name: "Priya Singh",
    role: "Patient · Patna",
    text: "I travel from Patna because there's no one like Dr. Paramjeet. His diagnosis and care feel personal, not rushed.",
  },
];
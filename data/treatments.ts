import skinHair from "@/public/assets/treatments/treatment-skin-hair--generated-by-mannu-yadav.webp";
import jointsBones from "@/public/assets/treatments/treatment-joints-bones--generated-by-mannu-yadav.webp";
import respiratory from "@/public/assets/treatments/treatment-respiratory--generated-by-mannu-yadav.webp";
import digestive from "@/public/assets/treatments/treatment-digestive--generated-by-mannu-yadav.webp";
import womensHealth from "@/public/assets/treatments/treatment-womens-health--generated-by-mannu-yadav.webp";
import pediatric from "@/public/assets/treatments/treatment-pediatric--generated-by-mannu-yadav.webp";
import lifestyle from "@/public/assets/treatments/treatment-lifestyle--generated-by-mannu-yadav.webp";
import chronicMind from "@/public/assets/treatments/treatment-chronic-mind--generated-by-mannu-yadav.webp";
import type { StaticImageData } from "next/image";

export type TreatmentGroup = {
  title: string;
  image: StaticImageData;
  imageAlt: string;
  items: string[];
};

export const GROUPS: TreatmentGroup[] = [
  {
    title: "Skin & Hair",
    image: skinHair,
    imageAlt: "Skin and hair care illustration",
    items: ["Eczema & dermatitis", "Psoriasis", "Acne & rosacea", "Vitiligo", "Hair fall & alopecia", "Fungal infections"],
  },
  {
    title: "Joints & Bones",
    image: jointsBones,
    imageAlt: "Joints and bones care illustration",
    items: ["Knee osteoarthritis", "Rheumatoid arthritis", "Sciatica", "Cervical spondylosis", "Gout", "Frozen shoulder"],
  },
  {
    title: "Respiratory",
    image: respiratory,
    imageAlt: "Respiratory care illustration",
    items: ["Asthma", "Allergic rhinitis", "Sinusitis", "Recurring cough & cold", "Tonsillitis", "Bronchitis"],
  },
  {
    title: "Digestive",
    image: digestive,
    imageAlt: "Digestive care illustration",
    items: ["Acidity & GERD", "IBS", "Chronic constipation", "Peptic ulcer", "Liver & gallbladder", "Piles & fissure"],
  },
  {
    title: "Women's Health",
    image: womensHealth,
    imageAlt: "Women's health care illustration",
    items: ["PCOS / PCOD", "Irregular periods", "Menstrual pain", "Fertility support", "Menopause", "Leucorrhoea"],
  },
  {
    title: "Pediatric Care",
    image: pediatric,
    imageAlt: "Pediatric care illustration",
    items: ["Recurring infections", "Low immunity", "Childhood asthma", "Bedwetting", "Behavioural issues", "Growth concerns"],
  },
  {
    title: "Lifestyle Disorders",
    image: lifestyle,
    imageAlt: "Lifestyle disorders care illustration",
    items: ["Diabetes (type 2)", "Hypertension", "Thyroid disorders", "Obesity & weight", "High cholesterol", "Stress fatigue"],
  },
  {
    title: "Chronic & Mind",
    image: chronicMind,
    imageAlt: "Chronic and mind care illustration",
    items: ["Migraine & headaches", "Anxiety", "Sleep disorders", "Depression support", "Autoimmune conditions", "Chronic fatigue"],
  },
];

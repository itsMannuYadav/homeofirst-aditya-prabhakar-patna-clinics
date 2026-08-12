import { SITE } from "@/lib/site";

const logoUrl = `${SITE.url}/assets/HomeoFirstLogo.jpg`;
const doctorImageUrl = `${SITE.url}/assets/dr-paramjeet.jpg`;

/**
 * Entity graph for Google: clearly a homeopathy medical clinic on homeofirst.in,
 * distinct from similarly named housing-finance brands on .com domains.
 */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["MedicalClinic", "MedicalOrganization", "LocalBusiness"],
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  legalName: SITE.legalName,
  alternateName: [
    "Homeofirst Homeopathy",
    "Homeofirst Homeopathy Clinic",
    "Homeofirst.in",
    "Prabhakar's Clinic Hajipur",
  ],
  url: SITE.url,
  logo: logoUrl,
  image: [logoUrl, doctorImageUrl],
  description: SITE.entityDescription,
  disambiguatingDescription:
    "Indian homeopathy (homeopathic medicine) clinic and online consultation platform at homeofirst.in — unrelated to Homefirst India / homefirstindia.com housing finance.",
  telephone: SITE.phoneHref.replace("tel:", ""),
  email: SITE.email,
  foundingLocation: {
    "@type": "Place",
    name: "Hajipur, Bihar, India",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Near Gandhi Chowk, Station Road",
    addressLocality: "Hajipur",
    addressRegion: "Bihar",
    postalCode: "844101",
    addressCountry: "IN",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Bihar" },
    { "@type": "City", name: "Hajipur" },
    { "@type": "City", name: "Patna" },
  ],
  medicalSpecialty: "Homeopathic",
  priceRange: "₹₹",
  openingHours: "Mo-Sa 09:00-20:00",
  sameAs: [SITE.instagram, "https://www.facebook.com/homeofirst._"],
  knowsAbout: [
    "Homeopathy",
    "Homeopathic medicine",
    "Chronic disease homeopathy",
    "Online homeopathy consultation",
  ],
  employee: {
    "@type": "Physician",
    "@id": `${SITE.url}/doctor#physician`,
    name: SITE.doctor,
    url: `${SITE.url}/doctor`,
    image: doctorImageUrl,
    jobTitle: "Homeopathy Specialist",
    worksFor: { "@id": `${SITE.url}/#organization` },
    medicalSpecialty: "Homeopathic",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Near Gandhi Chowk, Station Road",
      addressLocality: "Hajipur",
      addressRegion: "Bihar",
      postalCode: "844101",
      addressCountry: "IN",
    },
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  name: SITE.brandFull,
  alternateName: ["Homeofirst", "homeofirst.in"],
  url: SITE.url,
  description: SITE.entityDescription,
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE.url}/#organization` },
  about: {
    "@type": "Thing",
    name: "Homeopathy",
    description: "Homeopathic medical care and online consultation",
  },
};

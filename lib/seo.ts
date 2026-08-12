import { Metadata } from "next";
import { SITE } from "@/lib/site";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
};

const SITE_NAME = SITE.brandFull;
const BASE_URL = SITE.url;

/** Brand + category keywords that help Google separate Homeofirst from similarly named .com brands */
export const BRAND_KEYWORDS = [
  "Homeofirst",
  "Homeofirst Homeopathy",
  "homeofirst.in",
  "Homeofirst clinic",
  "homeopathy clinic Hajipur",
  "homeopathic doctor Bihar",
  "Dr Paramjeet Prabhakar",
  "Prabhakar's Clinic Hajipur",
  "online homeopathy consultation India",
];

export function generateSEO({
  title,
  description,
  keywords = [],
  image = "/assets/HomeoFirstLogo.jpg",
  url = "",
  noIndex = false,
}: SEOProps): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const fullURL = `${BASE_URL}${url}`;
  const mergedKeywords = Array.from(new Set([...BRAND_KEYWORDS, ...keywords]));

  return {
    metadataBase: new URL(BASE_URL),
    title: fullTitle,
    description,
    keywords: mergedKeywords,
    authors: [{ name: SITE.legalName, url: BASE_URL }],
    creator: SITE.doctor,
    publisher: SITE.legalName,
    applicationName: SITE.brandFull,
    category: "Health",
    classification: "Homeopathy Clinic",
    alternates: {
      canonical: fullURL,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: fullTitle,
      description,
      url: fullURL,
      siteName: SITE.brandFull,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${SITE.brandFull} — ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
    other: {
      "geo.region": "IN-BR",
      "geo.placename": "Hajipur",
    },
  };
}

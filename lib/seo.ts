import { Metadata } from "next";

type SEOProps = {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  noIndex?: boolean;
};

const SITE_NAME = "Homeofirst";
const BASE_URL = "https://homeofirst.in";

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

  return {
    metadataBase: new URL(BASE_URL),

    title: fullTitle,

    description,

    keywords,

    alternates: {
      canonical: fullURL,
    },

    robots: {
      index: !noIndex,
      follow: !noIndex,
    },

    openGraph: {
      title: fullTitle,
      description,
      url: fullURL,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
}
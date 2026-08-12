import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { MyFirstCareWidget } from "@/components/chat/MyFirstCareWidget";
import { BookingFormProvider } from "@/components/BookingFormModal";
import { TrackShipmentProvider } from "@/components/TrackShipmentModal";
import { organizationSchema, websiteSchema } from "@/lib/schema/organisations";
import { BRAND_KEYWORDS } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.brandFull} | Online Homeopathy Clinic · Hajipur, Bihar`,
    template: `%s | ${SITE.brandFull}`,
  },
  description: SITE.entityDescription,
  keywords: BRAND_KEYWORDS,
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.doctor,
  publisher: SITE.legalName,
  applicationName: SITE.brandFull,
  category: "Health",
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: `${SITE.brandFull} | Online Homeopathy Clinic · Hajipur`,
    description: SITE.entityDescription,
    url: SITE.url,
    siteName: SITE.brandFull,
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/assets/HomeoFirstLogo.jpg",
        width: 1200,
        height: 630,
        alt: "Homeofirst Homeopathy Clinic logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.brandFull} | Online Homeopathy Clinic`,
    description: SITE.entityDescription,
    images: ["/assets/HomeoFirstLogo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-BR",
    "geo.placename": "Hajipur",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <BookingFormProvider>
          <TrackShipmentProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
            <MyFirstCareWidget />
          </TrackShipmentProvider>
        </BookingFormProvider>
      </body>
    </html>
  );
}

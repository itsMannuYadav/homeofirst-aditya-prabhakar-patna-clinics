import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { organizationSchema } from "@/lib/schema/organisations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "Homeofirst - Online Homeopathy Consultation with Expert Doctors",
  description:
    "Homeofirst is a trusted homeopathy clinic in Hajipur, Bihar led by Dr. Paramjeet Prabhakar. Consult experienced homeopathic doctors online from the comfort of your home. Get personalized treatment, expert guidance, and doorstep medicine delivery anywhere in India through Homeofirst.",
  keywords:
    "online homeopathy consultation, homeopathic doctor online, homeopathy treatment India, homeopathy consultation from home, online homeopathy clinic, homeopathic medicine delivery, best homeopathic doctors in India",
  authors: [{ name: "Homeofirst" }],
  openGraph: {
    title: "Homeofirst - Online Homeopathy Consultation with Expert Doctors",
    description:
      "Access leading homeopathic doctors online and receive personalized treatment and medicine delivery from the comfort of your home.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Online Homeopathy Consultation in India | Homeofirst",
    description:
      "Consult experienced homeopathic doctors online and get personalized treatment from the comfort of your home.",
  },
  alternates: {
    canonical: "https://homeofirst.in",
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
      lang="en"
      className={`${inter.variable} ${manrope.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
         <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

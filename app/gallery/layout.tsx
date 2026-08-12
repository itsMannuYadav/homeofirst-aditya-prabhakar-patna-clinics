import { generateSEO } from "@/lib/seo";

export const metadata = generateSEO({
  title: "Gallery · Homeofirst Homeopathy Clinic",
  description:
    "Photos and moments from Homeofirst (homeofirst.in) — Dr. Paramjeet Prabhakar, awards, and clinic life at Prabhakar's Clinic, Hajipur, Bihar.",
  url: "/gallery",
  keywords: ["Homeofirst gallery", "Dr Paramjeet awards", "homeopathy clinic photos Hajipur"],
});

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

import React from "react";
import { generateSEO } from "@/lib/seo";
import { getAllBlogs, getFeaturedBlogs, getAllCategories, getAllTags } from "@/lib/blog/blog";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogSearchFilter } from "@/components/blog/BlogSearchFilter";
import { BookOpen, Sparkles } from "lucide-react";

export const metadata = generateSEO({
  title: "Homeopathy Blog by Homeofirst",
  description:
    "Evidence-based homeopathy guides from Homeofirst (homeofirst.in) and Dr. Paramjeet Prabhakar — psoriasis, hair fall, arthritis, skin disease, and holistic health.",
  url: "/blogs",
  keywords: [
    "homeopathy blog",
    "homeopathic treatment guides",
    "Homeofirst blog",
  ],
});

export default function BlogsListingPage() {
  const allBlogs = getAllBlogs();
  const featuredBlogs = getFeaturedBlogs();
  const categories = getAllCategories();
  const tags = getAllTags();

  const primaryFeatured = featuredBlogs[0] || allBlogs[0];
  const remainingBlogs = allBlogs.filter((b) => b.slug !== primaryFeatured?.slug);

  return (
    <main className="min-h-screen py-10 md:py-16 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">
      <div className="container-page space-y-12">
        {/* Header Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            <BookOpen className="w-4 h-4 text-emerald-700" />
            <span>Homeofirst Knowledge Hub</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-emerald-950 tracking-tight leading-tight">
            Medical Guides & Homeopathic Health Insights
          </h1>

          <p className="text-base md:text-lg text-emerald-900/80 leading-relaxed">
            In-depth clinical articles, symptom explanations, and root-cause homeopathic recovery guides by expert doctors.
          </p>
        </div>

        {/* Phase 5 Section: Featured Article */}
        {primaryFeatured && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-900">
                Spotlight Article
              </h2>
            </div>
            <BlogCard post={primaryFeatured} featured />
          </section>
        )}

        {/* Phase 5 Sections: Search, Categories, Latest Articles, Popular Topics */}
        <section>
          <BlogSearchFilter
            posts={remainingBlogs.length > 0 ? remainingBlogs : allBlogs}
            categories={categories}
            tags={tags}
          />
        </section>
      </div>
    </main>
  );
}

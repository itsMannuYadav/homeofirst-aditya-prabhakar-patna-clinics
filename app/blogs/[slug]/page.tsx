import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

import { generateSEO } from "@/lib/seo";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blog/blog";
import { renderMDX } from "@/lib/blog/mdx";

import { TableOfContents } from "@/components/blog/TableOfContents";
import { CallToAction } from "@/components/blog/CallToAction";
import { FAQ } from "@/components/blog/FAQ";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { AuthorBox } from "@/components/blog/AuthorBox";

import { Calendar, Clock, ChevronRight, User, Folder, Tag } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate static params for all blogs at build time
 */
export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

/**
 * Dynamic metadata generation for SEO
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return generateSEO({
      title: "Article Not Found",
      description: "The requested medical blog post could not be found.",
    });
  }

  return generateSEO({
    title: blog.title,
    description: blog.description,
    url: `/blogs/${blog.slug}`,
    keywords: blog.tags,
    image: blog.cover,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { content } = await renderMDX(blog.content);
  const relatedPosts = getRelatedBlogs(blog.slug, blog.category, blog.tags);

  // Article JSON-LD Structured Data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: blog.title,
    description: blog.description,
    image: [blog.cover],
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt || blog.publishedAt,
    author: {
      "@type": "Person",
      name: blog.author,
      jobTitle: "Senior Homeopathic Consultant",
    },
    publisher: {
      "@type": "Organization",
      name: "Homeofirst",
      logo: {
        "@type": "ImageObject",
        url: "https://homeofirst.in/assets/HomeoFirstLogo.jpg",
      },
    },
    about: {
      "@type": "MedicalCondition",
      name: blog.category,
    },
  };

  return (
    <article className="min-h-screen py-8 md:py-14 bg-gradient-to-b from-emerald-50/40 via-white to-emerald-50/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="container-page space-y-10">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm text-emerald-800/70 font-medium overflow-x-auto pb-2 scrollbar-none"
        >
          <Link href="/" className="hover:text-emerald-950 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
          <Link href="/blogs" className="hover:text-emerald-950 transition-colors">
            Blogs
          </Link>
          <ChevronRight className="w-3.5 h-3.5 shrink-0 opacity-50" />
          <span className="text-emerald-950 font-semibold underline underline-offset-4 decoration-emerald-200">
            {blog.category}
          </span>
        </nav>

        {/* Header Header Info: Category, Title, Meta, Cover */}
        <header className="space-y-6 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200">
              {blog.category}
            </span>
            {blog.tags?.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-100"
              >
                #{tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold font-heading text-emerald-950 tracking-tight leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg md:text-xl text-emerald-900/80 leading-relaxed">
            {blog.description}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-emerald-800/80 pt-2 border-t border-emerald-100">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-emerald-950">{blog.author}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <span>Published: {blog.publishedAt}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-emerald-700" />
              <span>{blog.readingTime}</span>
            </div>
          </div>
        </header>

        {/* Cover Image */}
        <div className="relative w-full h-[280px] sm:h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-lg border border-emerald-100">
          <Image
            src={blog.cover}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* Content Layout with Sticky Sidebar TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="prose prose-emerald max-w-none">
              {content}
            </div>

            {/* Optional MDX frontmatter FAQ render if present */}
            {blog.faq && blog.faq.length > 0 && <FAQ items={blog.faq} />}

            {/* Call To Action */}
            <CallToAction />

            {/* Author Box */}
            <AuthorBox authorName={blog.author} />

            {/* Related Posts */}
            <RelatedPosts posts={relatedPosts} />
          </div>

          {/* Table of Contents Sticky Sidebar (4 cols) */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <TableOfContents toc={blog.toc} />
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}

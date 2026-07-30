import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPostMeta } from "@/lib/blog/blog";
import { Calendar, Clock, ArrowUpRight, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPostMeta;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  if (featured) {
    return (
      <div className="group relative rounded-3xl bg-white border border-emerald-100/90 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden grid grid-cols-1 md:grid-cols-12 gap-0">
        <div className="relative md:col-span-6 min-h-[260px] md:min-h-[360px] overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-100 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
              Featured
            </span>
          </div>
        </div>

        <div className="md:col-span-6 p-6 md:p-8 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs font-medium text-emerald-700">
              <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 font-semibold">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-heading text-emerald-950 group-hover:text-emerald-700 transition-colors leading-snug">
              <Link href={`/blogs/${post.slug}`} className="focus:outline-none">
                {post.title}
              </Link>
            </h3>

            <p className="text-emerald-900/80 text-sm leading-relaxed line-clamp-3">
              {post.description}
            </p>
          </div>

          <div className="pt-4 border-t border-emerald-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-emerald-800/70">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.publishedAt}</span>
              <span>•</span>
              <span>{post.author}</span>
            </div>

            <Link
              href={`/blogs/${post.slug}`}
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 group-hover:text-emerald-900 transition-colors"
            >
              Read Article
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group flex flex-col rounded-2xl bg-white border border-emerald-100/80 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
      <div className="relative w-full h-48 overflow-hidden bg-emerald-50 shrink-0">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-0.5 rounded-md bg-white/95 text-emerald-900 text-xs font-semibold tracking-wide shadow-sm backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-emerald-700/80">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
            <span>•</span>
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishedAt}</span>
          </div>

          <h3 className="text-base font-bold font-heading text-emerald-950 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
            <Link href={`/blogs/${post.slug}`}>
              {post.title}
            </Link>
          </h3>

          <p className="text-emerald-900/70 text-xs md:text-sm line-clamp-2 leading-relaxed">
            {post.description}
          </p>
        </div>

        <div className="pt-3 border-t border-emerald-50 flex items-center justify-between text-xs">
          <span className="text-emerald-800/70 font-medium">{post.author}</span>

          <Link
            href={`/blogs/${post.slug}`}
            className="inline-flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
          >
            Read <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}

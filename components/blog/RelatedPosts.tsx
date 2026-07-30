import React from "react";
import { BlogPostMeta } from "@/lib/blog/blog";
import { BlogCard } from "./BlogCard";
import { Sparkles } from "lucide-react";

interface RelatedPostsProps {
  posts: BlogPostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="my-12 space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-800">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-bold font-heading text-emerald-950">
            Related Health Articles
          </h3>
          <p className="text-xs md:text-sm text-emerald-800/70">
            More medical insights from Homeofirst doctors
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}

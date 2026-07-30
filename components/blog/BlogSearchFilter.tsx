"use client";

import React, { useState, useMemo } from "react";
import { BlogPostMeta } from "@/lib/blog/blog";
import { BlogCard } from "./BlogCard";
import { Search, Tag, Folder, Sparkles, Filter } from "lucide-react";

interface BlogSearchFilterProps {
  posts: BlogPostMeta[];
  categories: { name: string; count: number }[];
  tags: string[];
}

export function BlogSearchFilter({
  posts,
  categories,
  tags,
}: BlogSearchFilterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (
        selectedCategory !== "All" &&
        post.category.toLowerCase() !== selectedCategory.toLowerCase()
      ) {
        return false;
      }

      // Tag filter
      if (
        selectedTag &&
        !post.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      ) {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = post.title.toLowerCase().includes(query);
        const matchesDesc = post.description.toLowerCase().includes(query);
        const matchesCategory = post.category.toLowerCase().includes(query);
        const matchesTags = post.tags.some((t) => t.toLowerCase().includes(query));

        return matchesTitle || matchesDesc || matchesCategory || matchesTags;
      }

      return true;
    });
  }, [posts, selectedCategory, selectedTag, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search & Category Filter Header Bar */}
      <div className="rounded-3xl bg-white border border-emerald-100 p-6 md:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-600" />
            <input
              type="text"
              placeholder="Search articles by title, disease, symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 text-sm text-emerald-950 placeholder:text-emerald-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-emerald-700 hover:text-emerald-950 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 ${
                selectedCategory === "All" && !selectedTag
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-100"
              }`}
            >
              All Articles ({posts.length})
            </button>

            {categories.map((cat) => {
              const isSelected =
                selectedCategory.toLowerCase() === cat.name.toLowerCase();
              return (
                <button
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setSelectedTag(null);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all shrink-0 ${
                    isSelected
                      ? "bg-emerald-800 text-white shadow-sm"
                      : "bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border border-emerald-100"
                  }`}
                >
                  {cat.name} ({cat.count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected tag alert banner if active */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-2 text-xs font-semibold text-emerald-800">
            <Tag className="w-3.5 h-3.5 text-emerald-600" />
            <span>Filtering by tag: <strong className="text-emerald-950">#{selectedTag}</strong></span>
            <button
              onClick={() => setSelectedTag(null)}
              className="ml-2 text-emerald-600 underline hover:text-emerald-950"
            >
              Remove filter
            </button>
          </div>
        )}
      </div>

      {/* Articles Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-emerald-950 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            {selectedCategory !== "All"
              ? `${selectedCategory} Articles`
              : selectedTag
              ? `Articles tagged #${selectedTag}`
              : "Latest Articles"}
          </h2>
          <span className="text-xs md:text-sm text-emerald-800/70 font-medium">
            Showing {filteredPosts.length} post{filteredPosts.length === 1 ? "" : "s"}
          </span>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <div className="p-12 text-center bg-white rounded-3xl border border-emerald-100 space-y-3">
            <p className="text-emerald-950 font-bold text-lg">No articles found</p>
            <p className="text-sm text-emerald-800/70">
              Try adjusting your search keywords or clearing filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
                setSelectedTag(null);
              }}
              className="mt-2 inline-flex items-center px-4 py-2 rounded-xl bg-emerald-800 text-white text-xs font-bold hover:bg-emerald-900 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Popular Topics / Tags Cloud */}
      {tags.length > 0 && (
        <div className="rounded-3xl bg-emerald-950 p-6 md:p-8 text-white space-y-4">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold uppercase tracking-wider text-emerald-200">
              Popular Topics & Conditions
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => {
              const isActive = selectedTag?.toLowerCase() === tag.toLowerCase();
              return (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(isActive ? null : tag)
                  }
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-emerald-400 text-emerald-950 font-bold"
                      : "bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/15"
                  }`}
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getReadingTime } from "./reading-time";
import { getTableOfContents, TocItem } from "./toc";

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  slug: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  cover: string;
  tags: string[];
  featured?: boolean;
  draft?: boolean;
  faq?: Array<{ question: string; answer: string }>;
}

export interface BlogPostMeta extends BlogPostFrontmatter {
  readingTime: string;
  filePath: string;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
  toc: TocItem[];
}

const BLOGS_DIR = path.join(process.cwd(), "blogs");

/**
 * Helper to recursively search all .mdx files inside blogs/ directory
 */
function getMdxFilePaths(dir: string = BLOGS_DIR): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let files: string[] = [];

  for (const entry of entries) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(getMdxFilePaths(res));
    } else if (entry.isFile() && entry.name.endsWith(".mdx")) {
      files.push(res);
    }
  }

  return files;
}

/**
 * Returns metadata of all published blogs ordered by publishedAt date
 */
export function getAllBlogs(): BlogPostMeta[] {
  const filePaths = getMdxFilePaths();

  const posts: BlogPostMeta[] = filePaths
    .map((filePath) => {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data, content } = matter(fileContent);

      const frontmatter = data as BlogPostFrontmatter;

      return {
        ...frontmatter,
        slug: frontmatter.slug || path.basename(filePath, ".mdx"),
        readingTime: getReadingTime(content),
        filePath,
      };
    })
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

  return posts;
}

/**
 * Get single blog by slug with raw content body and TOC
 */
export function getBlogBySlug(slug: string): BlogPostFull | null {
  const filePaths = getMdxFilePaths();

  for (const filePath of filePaths) {
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);

    const frontmatter = data as BlogPostFrontmatter;
    const postSlug = frontmatter.slug || path.basename(filePath, ".mdx");

    if (postSlug === slug || slug.endsWith(postSlug)) {
      if (frontmatter.draft && process.env.NODE_ENV === "production") {
        return null;
      }

      return {
        ...frontmatter,
        slug: postSlug,
        readingTime: getReadingTime(content),
        filePath,
        content,
        toc: getTableOfContents(content),
      };
    }
  }

  return null;
}

/**
 * Get featured blog posts
 */
export function getFeaturedBlogs(): BlogPostMeta[] {
  return getAllBlogs().filter((blog) => blog.featured);
}

/**
 * Get blogs matching a category
 */
export function getBlogsByCategory(category: string): BlogPostMeta[] {
  const normalizedCategory = category.toLowerCase().trim();
  return getAllBlogs().filter(
    (blog) => blog.category.toLowerCase().trim() === normalizedCategory
  );
}

/**
 * Get related blogs by category and matching tags
 */
export function getRelatedBlogs(
  currentSlug: string,
  category: string,
  tags: string[] = [],
  limit: number = 3
): BlogPostMeta[] {
  const allBlogs = getAllBlogs().filter((b) => b.slug !== currentSlug);

  // Score posts based on matching category and shared tags
  const scored = allBlogs.map((post) => {
    let score = 0;
    if (post.category.toLowerCase() === category.toLowerCase()) {
      score += 5;
    }
    const sharedTags = post.tags.filter((t) =>
      tags.map((tag) => tag.toLowerCase()).includes(t.toLowerCase())
    );
    score += sharedTags.length * 2;

    return { post, score };
  });

  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.post)
    .slice(0, limit);
}

/**
 * Get list of all unique tags
 */
export function getAllTags(): string[] {
  const allBlogs = getAllBlogs();
  const tagSet = new Set<string>();

  allBlogs.forEach((blog) => {
    blog.tags?.forEach((tag) => tagSet.add(tag.toLowerCase()));
  });

  return Array.from(tagSet);
}

/**
 * Get list of all unique categories with counts
 */
export function getAllCategories(): { name: string; count: number }[] {
  const allBlogs = getAllBlogs();
  const categoryMap: { [key: string]: number } = {};

  allBlogs.forEach((blog) => {
    const cat = blog.category;
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });

  return Object.entries(categoryMap).map(([name, count]) => ({ name, count }));
}

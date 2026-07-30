/**
 * Calculates reading time in minutes for a given text content.
 * Average reading speed: 200 words per minute.
 */
export function getReadingTime(content: string): string {
  if (!content) return "1 min read";

  // Remove MDX/HTML tags, code blocks, frontmatter
  const cleanText = content
    .replace(/---[\s\S]*?---/, "") // Remove frontmatter
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/<[^>]*>/g, "") // Remove HTML/MDX tags
    .replace(/[#*`_~]/g, "") // Remove markdown syntax formatting
    .trim();

  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.ceil(words / 200);

  return `${minutes} min read`;
}

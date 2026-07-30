export interface TocItem {
  id: string;
  text: string;
  level: number;
}

/**
 * Converts a string heading to a URL-friendly slug ID
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extracts H2 and H3 headings from raw MDX/Markdown content
 */
export function getTableOfContents(content: string): TocItem[] {
  if (!content) return [];

  // Match H2 and H3 markdown headings: ## Heading or ### Heading
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const toc: TocItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length; // 2 for H2, 3 for H3
    let rawText = match[2].trim();

    // Clean inline markdown tags like bold, italic, code or JSX elements
    rawText = rawText
      .replace(/<[^>]*>/g, "")
      .replace(/[*_`]/g, "")
      .trim();

    if (rawText) {
      toc.push({
        id: slugify(rawText),
        text: rawText,
        level,
      });
    }
  }

  return toc;
}

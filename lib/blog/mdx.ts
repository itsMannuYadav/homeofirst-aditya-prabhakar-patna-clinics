import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  HomeAppointmentCTA,
  DoctorCard,
  RelatedDisease,
} from "@/components/blog/MdxEmbedded";
import { CallToAction } from "@/components/blog/CallToAction";
import { FAQ } from "@/components/blog/FAQ";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { slugify } from "./toc";

// Custom MDX component overrides using React.createElement for pure .ts compatibility
export const mdxComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) =>
    React.createElement("h1", {
      className:
        "text-3xl md:text-4xl font-extrabold font-heading text-emerald-950 mt-10 mb-5 leading-tight tracking-tight border-b border-emerald-100 pb-3",
      ...props,
    }),

  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = props.id || slugify(text);
    return React.createElement(
      "h2",
      {
        id,
        className:
          "text-2xl md:text-3xl font-bold font-heading text-emerald-950 mt-10 mb-4 scroll-mt-24 border-l-4 border-emerald-600 pl-3 leading-snug",
        ...props,
      },
      children
    );
  },

  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = typeof children === "string" ? children : "";
    const id = props.id || slugify(text);
    return React.createElement(
      "h3",
      {
        id,
        className:
          "text-xl md:text-2xl font-bold font-heading text-emerald-900 mt-8 mb-3 scroll-mt-24",
        ...props,
      },
      children
    );
  },

  p: (props: React.HTMLAttributes<HTMLParagraphElement>) =>
    React.createElement("p", {
      className:
        "text-base md:text-lg text-emerald-950/85 leading-relaxed mb-6 font-normal",
      ...props,
    }),

  ul: (props: React.HTMLAttributes<HTMLUListElement>) =>
    React.createElement("ul", {
      className:
        "list-disc list-inside space-y-2 mb-6 text-base md:text-lg text-emerald-950/85 pl-2",
      ...props,
    }),

  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) =>
    React.createElement("ol", {
      className:
        "list-decimal list-inside space-y-2 mb-6 text-base md:text-lg text-emerald-950/85 pl-2",
      ...props,
    }),

  li: (props: React.LiHTMLAttributes<HTMLLIElement>) =>
    React.createElement("li", {
      className: "leading-relaxed font-medium",
      ...props,
    }),

  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) =>
    React.createElement("blockquote", {
      className:
        "my-6 p-5 border-l-4 border-amber-500 bg-amber-50/60 rounded-r-2xl italic text-emerald-900 font-serif text-lg leading-relaxed shadow-sm",
      ...props,
    }),

  code: (props: React.HTMLAttributes<HTMLElement>) =>
    React.createElement("code", {
      className:
        "px-2 py-0.5 rounded-md bg-emerald-100/70 text-emerald-900 font-mono text-sm font-semibold",
      ...props,
    }),

  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) =>
    React.createElement("a", {
      className:
        "text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-4 decoration-emerald-400 hover:decoration-emerald-700 transition-colors",
      ...props,
    }),

  hr: () =>
    React.createElement("hr", {
      className: "my-10 border-t border-emerald-100",
    }),

  table: (props: React.TableHTMLAttributes<HTMLTableElement>) =>
    React.createElement(
      "div",
      { className: "my-8 overflow-x-auto rounded-xl border border-emerald-100 shadow-sm" },
      React.createElement("table", {
        className: "w-full text-left text-sm text-emerald-950",
        ...props,
      })
    ),

  th: (props: React.ThHTMLAttributes<HTMLTableCellElement>) =>
    React.createElement("th", {
      className:
        "bg-emerald-100/70 p-3 font-bold text-emerald-900 uppercase text-xs tracking-wider",
      ...props,
    }),

  td: (props: React.TdHTMLAttributes<HTMLTableCellElement>) =>
    React.createElement("td", {
      className: "p-3 border-t border-emerald-100 font-medium",
      ...props,
    }),

  // MDX embedded components
  HomeAppointmentCTA,
  DoctorCard,
  RelatedDisease,
  CallToAction,
  FAQ,
  AuthorBox,
};

/**
 * Compiles MDX source text into React server component element
 */
export async function renderMDX(source: string) {
  const { content, frontmatter } = await compileMDX<{ [key: string]: any }>({
    source,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      blockJS: false,
    },
  });

  return { content, frontmatter };
}

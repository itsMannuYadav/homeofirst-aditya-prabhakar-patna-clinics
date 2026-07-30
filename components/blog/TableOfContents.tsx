"use client";

import React, { useEffect, useState } from "react";
import { TocItem } from "@/lib/blog/toc";
import { List, ChevronRight } from "lucide-react";

interface TableOfContentsProps {
  toc: TocItem[];
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (toc.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -60% 0px", threshold: 0.1 }
    );

    toc.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [toc]);

  if (!toc || toc.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="p-5 rounded-2xl bg-gradient-to-b from-white to-emerald-50/40 border border-emerald-100 shadow-sm space-y-4"
    >
      <div className="flex items-center gap-2 pb-3 border-b border-emerald-100">
        <List className="w-4 h-4 text-emerald-700" />
        <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-950">
          Table of Contents
        </h3>
      </div>

      <ul className="space-y-2 text-xs md:text-sm">
        {toc.map((item) => {
          const isActive = activeId === item.id;
          const isSub = item.level === 3;

          return (
            <li key={item.id} className={isSub ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById(item.id);
                  if (target) {
                    target.scrollIntoView({ behavior: "smooth", block: "start" });
                    setActiveId(item.id);
                  }
                }}
                className={`group flex items-start gap-1.5 py-1 transition-colors leading-relaxed ${
                  isActive
                    ? "font-bold text-emerald-700"
                    : "text-emerald-900/70 hover:text-emerald-950 font-medium"
                }`}
              >
                <ChevronRight
                  className={`w-3.5 h-3.5 mt-0.5 shrink-0 transition-transform ${
                    isActive
                      ? "text-emerald-600 translate-x-0.5"
                      : "opacity-40 group-hover:opacity-100 group-hover:text-emerald-600"
                  }`}
                />
                <span>{item.text}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  // Schema.org FAQPage data
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="my-10 rounded-2xl bg-white border border-emerald-100 p-6 md:p-8 shadow-sm">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-emerald-100/80 text-emerald-800">
          <HelpCircle className="w-5 h-5" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold font-heading text-emerald-950">
          {title}
        </h3>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="border border-emerald-100/80 rounded-xl overflow-hidden transition-all duration-200"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 p-4 text-left font-semibold text-emerald-950 hover:bg-emerald-50/50 transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-base leading-snug">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-emerald-600 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 pt-1 text-sm text-emerald-900/80 leading-relaxed border-t border-emerald-50 bg-emerald-50/20">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

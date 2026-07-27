"use client";
import { useState } from "react";
import { SectionHeading } from "./SectionHeading";
import { Minus, Plus } from "lucide-react";

const FAQS = [
  {
    q: "Is homeopathy safe for children and the elderly?",
    a: "Yes. Homeopathic medicines are highly diluted and act gently. They're safe for newborns, pregnant women, the elderly, and can be taken alongside most conventional medicines.",
  },
  {
    q: "How long does treatment usually take?",
    a: "It depends on the condition. Acute issues like cold or fever respond within days. Chronic conditions (skin, arthritis, asthma) typically improve over 3–9 months of consistent treatment.",
  },
  {
    q: "Are there any side effects?",
    a: "Properly prescribed homeopathic remedies have no toxic side effects. Some patients experience a brief 'aggravation' early on — a sign that healing has begun.",
  },
  {
    q: "Can I take homeopathy with my regular medication?",
    a: "Yes, in most cases. Dr. Paramjeet will review your current medicines and guide you on safe co-administration. Never stop prescribed medication without consulting your doctor.",
  },
  {
    q: "Do I need to follow any dietary restrictions?",
    a: "We typically recommend avoiding strong substances like raw onion, garlic, coffee, mint, and tobacco around the time of taking remedies. Specific guidance is given during consultation.",
  },
  {
    q: "What happens during the first consultation?",
    a: "The first visit is detailed — usually 45 minutes to an hour. Dr. Paramjeet will ask about your symptoms, medical history, lifestyle, sleep, and emotional state to find the most suitable remedy.",
  },
  {
    q: "Do you offer follow-up consultations online?",
    a: "Yes. Follow-up consultations can be arranged via WhatsApp call for patients who travel from outside Hajipur. The first visit is preferred in person.",
  },
  {
    q: "How do I book an appointment?",
    a: "The fastest way is WhatsApp. You can also call the clinic directly during working hours. Walk-ins are welcome but appointments are prioritised.",
  },
];

export function FAQ() {
    const [openFaq, setOpenFaq] = useState(0);
    return (
        <section className="py-20 border-t border-border">
        <div className="container-page max-w-4xl">
          <SectionHeading
            eyebrow="FAQs"
            title="Questions about Homeopathy"
            description="Clear answers to common questions about treatment, safety, and our process."
            align="left"
          />
          <div className="mt-12 grid gap-0">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className="border-b border-border">
                  <button
                    className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-primary"
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-lg text-foreground md:text-xl">{f.q}</span>
                    <span className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary-soft text-primary'}`}>
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-6' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <p className="pr-12 text-muted-foreground">{f.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )
}
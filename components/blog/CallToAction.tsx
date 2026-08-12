"use client";

import React from "react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Calendar, PhoneCall, MessageSquare, ShieldCheck } from "lucide-react";
import { useBookingForm } from "@/components/BookingFormModal";

export function CallToAction() {
  const { openForm } = useBookingForm();

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 md:p-10 text-white shadow-xl relative overflow-hidden">
      {/* Decorative leaf/glow accents */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-teal-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md border border-white/15">
          <ShieldCheck className="w-4 h-4 text-emerald-300" />
          <span>Holistic Homeopathic Care</span>
        </div>

        <h3 className="text-2xl md:text-4xl font-bold font-heading text-white tracking-tight leading-tight">
          Ready for a Root-Cause Cure for Your Health Condition?
        </h3>

        <p className="text-emerald-100 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
          Consult with {SITE.doctor} ({SITE.stats.years} years of experience, {SITE.stats.patients} treated). Get customized, gentle, side-effect-free homeopathic remedies tailored for you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-400 text-emerald-950 font-semibold text-sm hover:bg-emerald-300 transition-all shadow-lg hover:shadow-emerald-400/30 transform hover:-translate-y-0.5"
          >
            <MessageSquare className="w-4 h-4" />
            Book WhatsApp Consultation
          </Link>

          <button
            type="button"
            onClick={openForm}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all backdrop-blur-sm"
          >
            <Calendar className="w-4 h-4" />
            Fill Patient Form
          </button>

          <a
            href={SITE.phoneHref}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-sm border border-white/20 transition-all backdrop-blur-sm"
          >
            <PhoneCall className="w-4 h-4" />
            Call Clinic
          </a>
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";
import { Calendar, Phone, ArrowRight, ShieldCheck, Stethoscope, HeartPulse } from "lucide-react";

export function HomeAppointmentCTA() {
  return (
    <div className="my-8 p-6 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white shadow-lg border border-emerald-700/50">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Guaranteed Personalized Remedy</span>
          </div>
          <h4 className="text-xl font-bold font-heading text-white">
            Schedule Homeopathic Consultation
          </h4>
          <p className="text-sm text-emerald-100/90 max-w-md">
            Get personalized treatment plans crafted by {SITE.doctor} with no harsh side effects.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <Link
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-400 text-emerald-950 font-bold text-xs uppercase tracking-wider hover:bg-emerald-300 transition-colors shadow-md"
          >
            <Calendar className="w-4 h-4" />
            Book Now
          </Link>
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Doctor
          </a>
        </div>
      </div>
    </div>
  );
}

export function DoctorCard() {
  return (
    <div className="my-8 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-center gap-5">
      <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-emerald-600 shadow-sm shrink-0">
        <Image
          src="/assets/dr-paramjeet.jpg"
          alt={SITE.doctor}
          fill
          className="object-cover"
        />
      </div>
      <div className="space-y-1 text-center sm:text-left">
        <div className="flex items-center justify-center sm:justify-start gap-2">
          <Stethoscope className="w-4 h-4 text-emerald-700" />
          <h5 className="font-bold font-heading text-emerald-950 text-base">
            {SITE.doctor}
          </h5>
        </div>
        <p className="text-xs text-emerald-800 font-medium">
          BHMS, MD (Homeopathy) • {SITE.stats.years} Clinical Experience
        </p>
        <p className="text-xs text-emerald-900/70 pt-1 leading-relaxed">
          Pioneer in constitution-based homeopathic treatment for chronic skin, hair, and joint ailments in Bihar.
        </p>
      </div>
    </div>
  );
}

export function RelatedDisease() {
  const diseases = [
    { name: "Eczema & Dermatitis", href: "/treatments" },
    { name: "Psoriatic Arthritis", href: "/treatments" },
    { name: "Alopecia Areata", href: "/treatments" },
    { name: "Chronic Urticaria", href: "/treatments" },
  ];

  return (
    <div className="my-8 p-5 rounded-2xl bg-white border border-emerald-100 shadow-sm space-y-3">
      <div className="flex items-center gap-2 text-emerald-950 font-bold text-sm">
        <HeartPulse className="w-4 h-4 text-emerald-600" />
        <span>Related Conditions & Treatments:</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {diseases.map((d, index) => (
          <Link
            key={index}
            href={d.href}
            className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50/50 hover:bg-emerald-100/60 text-xs font-semibold text-emerald-900 border border-emerald-100/60 transition-colors group"
          >
            <span>{d.name}</span>
            <ArrowRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </div>
  );
}

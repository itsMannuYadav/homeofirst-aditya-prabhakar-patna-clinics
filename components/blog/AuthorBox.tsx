import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { Award, MapPin, CheckCircle2, ArrowRight } from "lucide-react";

interface AuthorBoxProps {
  authorName?: string;
}

export function AuthorBox({ authorName }: AuthorBoxProps) {
  const name = authorName || SITE.doctor;

  return (
    <div className="my-10 rounded-2xl bg-gradient-to-br from-emerald-50/80 via-amber-50/30 to-white p-6 md:p-8 border border-emerald-100 shadow-sm relative">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
          <Image
            src="/assets/dr-paramjeet.jpg"
            alt={name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 text-center sm:text-left space-y-3">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
              Senior Homeopathic Consultant
            </span>
            <span className="text-xs text-amber-700 font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              {SITE.stats.years} Exp
            </span>
          </div>

          <h4 className="text-xl font-bold font-heading text-emerald-950">
            Medical Review & Written by {name}
          </h4>

          <p className="text-sm text-emerald-800/80 leading-relaxed max-w-2xl">
            {name} is the founder of Prabhakar&apos;s Clinic & Homeofirst. With over {SITE.stats.years} of clinical expertise and over {SITE.stats.patients} successfully treated patients, Dr. Prabhakar specializes in chronic skin disorders, joint problems, hair restoration, and holistic health.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-emerald-900 font-medium">
            <span className="inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              {SITE.stats.rating} ★ Patient Satisfaction
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              {SITE.mainClinic}, {SITE.city}
            </span>
            <Link
              href="/doctor"
              className="inline-flex items-center gap-1 text-emerald-700 hover:text-emerald-900 font-semibold underline underline-offset-4"
            >
              Read Full Bio <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

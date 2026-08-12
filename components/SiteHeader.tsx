'use client'
import Link from "next/link";
import {usePathname} from "next/navigation";
import { useState } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import { useBookingForm } from "./BookingFormModal";
import { useTrackShipment } from "./TrackShipmentModal";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/doctor", label: "Doctor" },
  { to: "/treatments", label: "Treatments" },
  { to: "/blogs", label: "Blogs" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { openForm } = useBookingForm();
  const { openTracker } = useTrackShipment();

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center gap-4 py-2 xl:gap-6">
        <Link
          href="/"
          aria-label="Homeofirst home"
          onClick={() => setOpen(false)}
          className="shrink-0"
        >
          <Logo />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex 2xl:gap-2">
          {NAV.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              className={
                pathname === n.to
                  ? "rounded-full px-2.5 py-1.5 text-[13px] font-medium text-foreground 2xl:px-3"
                  : "rounded-full px-2.5 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground 2xl:px-3"
              }
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden shrink-0 items-center gap-1.5 xl:flex 2xl:gap-2">
          <a
            href={SITE.phoneHref}
            aria-label={`Call ${SITE.phone}`}
            title={SITE.phone}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            <Phone className="h-4 w-4 text-accent" />
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            aria-label="Book on WhatsApp"
            title="Book on WhatsApp"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-muted"
          >
            <MessageCircle className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={openTracker}
            className="inline-flex items-center justify-center rounded-full border border-border px-3.5 py-2 text-[13px] font-medium text-foreground transition-colors hover:bg-muted 2xl:px-4"
          >
            Track Order
          </button>
          <button
            type="button"
            onClick={openForm}
            className="inline-flex items-center justify-center rounded-full bg-primary px-3.5 py-2 text-[13px] font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02] 2xl:px-4"
          >
            Book Appointment
          </button>
        </div>

        <button
          aria-label="Toggle menu"
          className="ml-auto inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border xl:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                onClick={() => setOpen(false)}
                className={
                  pathname === n.to
                    ? "rounded-md px-3 py-2.5 text-sm font-medium text-foreground bg-primary-soft"
                    : "rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              >
                {n.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-border pt-3">
              <a href={SITE.phoneHref} className="rounded-md px-3 py-2 text-sm font-medium">
                Call {SITE.phone}
              </a>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Book on WhatsApp
              </a>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openTracker();
                }}
                className="rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium text-foreground"
              >
                Track Order
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openForm();
                }}
                className="rounded-full bg-primary px-4 py-2.5 text-center text-sm font-medium text-primary-foreground"
              >
                Book Appointment
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

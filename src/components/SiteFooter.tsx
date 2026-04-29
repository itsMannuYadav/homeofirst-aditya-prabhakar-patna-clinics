import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="rounded-2xl bg-background p-4 inline-block">
            <Logo />
          </div>
          <p className="mt-5 max-w-xs text-sm text-primary-foreground/75">
            A homeopathy clinic in Hajipur dedicated to gentle, individualised healing — guided by
            Dr. Paramjeet Prabhakar.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg text-primary-foreground">Visit</h4>
          <span className="leaf-divider mt-3 mb-4 bg-primary-foreground/40" />
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />{SITE.address}</li>
            <li className="flex gap-3"><Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />{SITE.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg">Reach us</h4>
          <span className="leaf-divider mt-3 mb-4 bg-primary-foreground/40" />
          <ul className="space-y-3 text-sm text-primary-foreground/80">
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5" /><a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5" /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex rounded-full bg-background/10 px-4 py-2 text-sm font-medium ring-1 ring-primary-foreground/30 hover:bg-background/20"
              >
                Chat on WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg">Explore</h4>
          <span className="leaf-divider mt-3 mb-4 bg-primary-foreground/40" />
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-primary-foreground/80">
            <li><Link to="/about">About</Link></li>
            <li><Link to="/doctor">The Doctor</Link></li>
            <li><Link to="/treatments">Treatments</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-5 text-xs text-primary-foreground/70 md:flex-row">
          <p>© {new Date().getFullYear()} Homeofirst. All rights reserved.</p>
          <p>Made with care in Hajipur, Bihar.</p>
        </div>
      </div>
    </footer>
  );
}

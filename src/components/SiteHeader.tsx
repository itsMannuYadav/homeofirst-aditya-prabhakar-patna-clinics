import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/treatments", label: "Treatments" },
  {
    label: "Success Stories",
    children: [
      { to: "/stories", label: "Patient Stories" },
      { to: "/gallery", label: "Social Gallery" },
    ],
  },
  {
    label: "About Clinic",
    children: [
      { to: "/about", label: "Our Mission" },
      { to: "/doctor", label: "Dr. Paramjeet" },
      { to: "/faqs", label: "FAQs" },
    ],
  },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-18 items-center justify-between py-3">
        <Link to="/" aria-label="Homeofirst home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV.map((n) => {
            if ("children" in n) {
              return (
                <DropdownMenu key={n.label}>
                  <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground outline-none cursor-pointer">
                    {n.label}
                    <ChevronDown className="h-3 w-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    {n.children.map((child) => (
                      <DropdownMenuItem key={child.to} asChild>
                        <Link to={child.to} className="w-full cursor-pointer">
                          {child.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }
            return (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
          >
            <Phone className="h-4 w-4 text-accent" />
            <span className="xl:inline hidden">{SITE.phone}</span>
          </a>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.02]"
          >
            Book <span className="sm:inline hidden ml-1">on WhatsApp</span>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border lg:hidden"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            <Link to="/" onClick={() => setOpen(false)} className="rounded-md px-3 py-2.5 text-sm font-medium">Home</Link>
            {NAV.map((n) => {
               if ("children" in n) {
                 return (
                   <div key={n.label} className="flex flex-col gap-1">
                     <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">{n.label}</div>
                     {n.children.map(child => (
                       <Link
                        key={child.to}
                        to={child.to}
                        onClick={() => setOpen(false)}
                        className="rounded-md px-6 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                       >
                         {child.label}
                       </Link>
                     ))}
                   </div>
                 )
               }
               return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  activeProps={{ className: "bg-primary-soft text-foreground" }}
                >
                  {n.label}
                </Link>
              )
            })}
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
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

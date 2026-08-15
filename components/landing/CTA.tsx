import { SITE } from "@/lib/site";
import { SocialGallery } from "../SocialGallery";
import { MessageCircle, Phone } from "lucide-react";

export function Cta() {
    return (
        <>
            {/* CTA */}
            <section className="container-page pb-20">
                <div className="relative overflow-hidden rounded-4xl bg-primary px-8 py-16 text-center text-primary-foreground md:px-16 md:py-20">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-40"
                        style={{ backgroundImage: "url('/assets/independence-day-bg.png')", backgroundSize: "cover" }}
                    />
                    <div className="relative">
                        <h2 className="font-serif text-3xl md:text-5xl">Begin your healing journey today</h2>
                        <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
                            Book a consultation with Dr. Paramjeet Prabhakar. We'll listen, understand, and care.
                        </p>
                        <div className="mt-7 flex flex-wrap justify-center gap-3">
                            <a
                                href={SITE.whatsappHref}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-medium text-foreground"
                            >
                                <MessageCircle className="h-4 w-4" /> Book on WhatsApp
                            </a>
                            <a
                                href={SITE.phoneHref}
                                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-medium"
                            >
                                <Phone className="h-4 w-4" /> {SITE.phone}
                            </a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}
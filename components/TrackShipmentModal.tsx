"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { Check, Copy, ExternalLink, Package, X } from "lucide-react";
import { SITE } from "@/lib/site";

type TrackShipmentContextValue = {
  open: boolean;
  openTracker: () => void;
  closeTracker: () => void;
};

const TrackShipmentContext = createContext<TrackShipmentContextValue | null>(
  null,
);

export function useTrackShipment() {
  const ctx = useContext(TrackShipmentContext);
  if (!ctx) {
    throw new Error("useTrackShipment must be used within TrackShipmentProvider");
  }
  return ctx;
}

function normalizeConsignment(value: string) {
  return value.replace(/\s+/g, "").toUpperCase();
}

function isLikelyConsignment(value: string) {
  // Typical India Post article IDs: 13 chars, e.g. EM123456789IN / RA123456789IN
  return /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(value);
}

export function TrackShipmentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [consignment, setConsignment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "ready">("input");
  const [copied, setCopied] = useState(false);

  const openTracker = useCallback(() => {
    setOpen(true);
    setStep("input");
    setError(null);
    setCopied(false);
  }, []);

  const closeTracker = useCallback(() => {
    setOpen(false);
    setConsignment("");
    setError(null);
    setStep("input");
    setCopied(false);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeTracker();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeTracker]);

  async function copyNumber(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      return true;
    } catch {
      return false;
    }
  }

  async function handleTrack(e: FormEvent) {
    e.preventDefault();
    const value = normalizeConsignment(consignment);

    if (!value) {
      setError("Please enter your consignment number.");
      return;
    }

    if (!isLikelyConsignment(value)) {
      setError(
        "Enter a valid India Post number (13 characters, e.g. EM123456789IN).",
      );
      return;
    }

    setConsignment(value);
    setError(null);
    await copyNumber(value);
    window.open(SITE.india_post_track, "_blank", "noopener,noreferrer");
    setStep("ready");
  }

  async function reopenIndiaPost() {
    const value = normalizeConsignment(consignment);
    await copyNumber(value);
    window.open(SITE.india_post_track, "_blank", "noopener,noreferrer");
  }

  return (
    <TrackShipmentContext.Provider value={{ open, openTracker, closeTracker }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/80 p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeTracker}
          role="dialog"
          aria-modal="true"
          aria-label="Track shipment"
        >
          <button
            type="button"
            aria-label="Close tracker"
            className="absolute right-4 top-4 z-110 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
            onClick={(e) => {
              e.stopPropagation();
              closeTracker();
            }}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-background shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <h2 className="text-sm font-semibold text-foreground sm:text-base">
                Track Shipment
              </h2>
              <button
                type="button"
                aria-label="Close"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={closeTracker}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="px-4 py-5 sm:px-5 sm:py-6">
              {step === "input" ? (
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl bg-muted/60 p-3">
                    <Package className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Enter the India Post consignment number from your medicine
                      or parcel receipt. We&apos;ll open India Post tracking for
                      you with the number ready to paste.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="consignment-number"
                      className="text-sm font-medium text-foreground"
                    >
                      Consignment Number
                    </label>
                    <input
                      id="consignment-number"
                      name="consignment"
                      value={consignment}
                      onChange={(e) => {
                        setConsignment(e.target.value.toUpperCase());
                        setError(null);
                      }}
                      placeholder="e.g. EM123456789IN"
                      autoComplete="off"
                      autoFocus
                      spellCheck={false}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm tracking-wide text-foreground outline-none transition-shadow placeholder:text-muted-foreground/70 focus:ring-2 focus:ring-primary/30"
                    />
                    {error ? (
                      <p className="text-xs text-red-600">{error}</p>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Usually 13 characters (2 letters + 9 digits + IN).
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]"
                  >
                    Track Status
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="rounded-xl border border-border bg-muted/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Your consignment number
                    </p>
                    <div className="mt-2 flex items-center justify-between gap-3">
                      <p className="font-mono text-base font-semibold tracking-wider text-foreground">
                        {normalizeConsignment(consignment)}
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          copyNumber(normalizeConsignment(consignment))
                        }
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {copied ? (
                          <>
                            <Check className="h-3.5 w-3.5" /> Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-3.5 w-3.5" /> Copy
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <ol className="space-y-2 text-sm text-muted-foreground">
                    <li>
                      1. India Post opened in a new tab (number already copied).
                    </li>
                    <li>
                      2. Paste into <strong className="font-medium text-foreground">Consignment Number</strong>.
                    </li>
                    <li>
                      3. Enter the CAPTCHA and tap <strong className="font-medium text-foreground">Search</strong>.
                    </li>
                  </ol>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={reopenIndiaPost}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]"
                    >
                      Open India Post again
                      <ExternalLink className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStep("input");
                        setError(null);
                      }}
                      className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      Track another
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </TrackShipmentContext.Provider>
  );
}

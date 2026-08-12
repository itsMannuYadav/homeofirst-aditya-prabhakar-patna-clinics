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
import {
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  Package,
  Truck,
  X,
} from "lucide-react";
import { SITE } from "@/lib/site";

type TrackEvent = {
  date: string;
  office: string;
  description: string;
  status: string;
};

type TrackResult = {
  id: string;
  status: string;
  origin: string;
  destination: string;
  category: string;
  booking_date: string | null;
  pincode: string | null;
  tariff: string | null;
  weight: string | null;
  delivered: boolean;
  delivery_date: string | null;
  events: TrackEvent[];
};

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
  return /^[A-Z]{2}\d{9}[A-Z]{2}$/.test(value);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function TrackShipmentProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [consignment, setConsignment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<"input" | "result">("input");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TrackResult | null>(null);

  const openTracker = useCallback(() => {
    setOpen(true);
    setStep("input");
    setError(null);
    setResult(null);
    setLoading(false);
  }, []);

  const closeTracker = useCallback(() => {
    setOpen(false);
    setConsignment("");
    setError(null);
    setStep("input");
    setResult(null);
    setLoading(false);
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
    setLoading(true);
    setStep("result");
    setResult(null);

    try {
      const res = await fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consignment: value }),
      });
      const data = (await res.json()) as TrackResult & { error?: string };

      if (!res.ok) {
        setError(data.error || "Unable to fetch tracking status right now.");
        return;
      }

      setResult(data);
    } catch {
      setError("Could not reach tracking service. Please try again.");
    } finally {
      setLoading(false);
    }
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
            className={`relative flex w-full flex-col overflow-hidden rounded-2xl bg-background shadow-2xl animate-in zoom-in-95 duration-200 ${
              step === "result"
                ? "h-[min(92vh,760px)] max-w-lg"
                : "max-w-md"
            }`}
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

            {step === "input" ? (
              <div className="px-4 py-5 sm:px-5 sm:py-6">
                <form onSubmit={handleTrack} className="space-y-4">
                  <div className="flex items-start gap-3 rounded-xl bg-muted/60 p-3">
                    <Package className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Enter the India Post consignment number from your medicine
                      or parcel receipt to see live delivery status here.
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
                    className="inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-soft transition-transform hover:scale-[1.01]"
                  >
                    Track Status
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-2.5 sm:px-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep("input");
                      setError(null);
                      setResult(null);
                    }}
                    className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>
                  <p className="truncate font-mono text-sm font-semibold tracking-wider text-foreground">
                    {normalizeConsignment(consignment)}
                  </p>
                </div>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5">
                  {loading ? (
                    <div className="flex flex-col items-center justify-center gap-3 py-16 text-muted-foreground">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="text-sm">Fetching live status from India Post…</p>
                    </div>
                  ) : error ? (
                    <div className="space-y-4 py-6 text-center">
                      <p className="text-sm text-red-600">{error}</p>
                      <a
                        href={SITE.india_post_track}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        Open India Post website
                      </a>
                    </div>
                  ) : result ? (
                    <div className="space-y-5">
                      <div className="rounded-2xl border border-border bg-muted/30 p-4">
                        <div className="flex items-start gap-3">
                          {result.delivered ? (
                            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                          ) : (
                            <Truck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          )}
                          <div className="min-w-0">
                            <p className="text-base font-semibold text-foreground">
                              {result.status}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {result.category}
                              {result.weight ? ` · ${result.weight}` : ""}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                          <div className="flex gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">From</p>
                              <p className="font-medium text-foreground">
                                {result.origin || "—"}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                            <div>
                              <p className="text-xs text-muted-foreground">To</p>
                              <p className="font-medium text-foreground">
                                {result.destination || "—"}
                                {result.pincode ? ` (${result.pincode})` : ""}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="mb-3 text-sm font-semibold text-foreground">
                          Tracking history
                        </h3>
                        <ol className="relative space-y-0 border-l border-border ml-2">
                          {result.events.map((event, index) => (
                            <li key={`${event.date}-${index}`} className="relative pb-5 pl-5 last:pb-0">
                              <span className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                              <p className="text-sm font-medium text-foreground">
                                {event.description}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {event.office}
                              </p>
                              <p className="mt-0.5 text-xs text-muted-foreground">
                                {formatDate(event.date)}
                              </p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </TrackShipmentContext.Provider>
  );
}

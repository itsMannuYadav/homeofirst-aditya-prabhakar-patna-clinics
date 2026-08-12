"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { X } from "lucide-react";
import { SITE } from "@/lib/site";

type BookingFormContextValue = {
  open: boolean;
  openForm: () => void;
  closeForm: () => void;
};

const BookingFormContext = createContext<BookingFormContextValue | null>(null);

export function useBookingForm() {
  const ctx = useContext(BookingFormContext);
  if (!ctx) {
    throw new Error("useBookingForm must be used within BookingFormProvider");
  }
  return ctx;
}

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openForm = useCallback(() => setOpen(true), []);
  const closeForm = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeForm();
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, closeForm]);

  return (
    <BookingFormContext.Provider value={{ open, openForm, closeForm }}>
      {children}
      {open ? (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-ink/80 p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={closeForm}
          role="dialog"
          aria-modal="true"
          aria-label="Book appointment form"
        >
          <button
            type="button"
            aria-label="Close form"
            className="absolute right-4 top-4 z-110 rounded-full bg-white/15 p-2 text-white transition-colors hover:bg-white/25 sm:right-6 sm:top-6"
            onClick={(e) => {
              e.stopPropagation();
              closeForm();
            }}
          >
            <X className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div
            className="relative flex h-[min(92vh,820px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-background shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <h2 className="text-sm font-semibold text-foreground sm:text-base">
                Book Appointment
              </h2>
              <button
                type="button"
                aria-label="Close"
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                onClick={closeForm}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <iframe
              title="Appointment booking form"
              src={SITE.form_embed}
              className="h-full w-full flex-1 border-0 bg-white"
            />
          </div>
        </div>
      ) : null}
    </BookingFormContext.Provider>
  );
}

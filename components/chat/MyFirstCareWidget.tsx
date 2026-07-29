"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { HeartPulse, MessageCircleHeart, Send, X } from "lucide-react";
import { ChatMessage } from "./ChatMessage";
import type { ChatAction, ChatApiResponse } from "@/lib/chat/types";

type UiMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

const QUICK_REPLIES = [
  "What are the clinic hours?",
  "Tell me about Dr. Paramjeet",
  "How do I book via the form?",
] as const;

const WELCOME: UiMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Namaste — I am My First Care. Ask about the clinic, Dr. Paramjeet, or gentle care tips. I never prescribe medicines; for that, our doctor is here for you. To book a visit, use the appointment form below.",
  actions: ["book"],
};

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function MyFirstCareWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([WELCOME]);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: UiMessage = { id: uid(), role: "user", content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const payloadMessages = nextMessages
        .map((m) => ({ role: m.role, content: m.content }))
        .slice(-10);

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = (await res.json()) as ChatApiResponse & { error?: string };
      const reply =
        typeof data.reply === "string" && data.reply
          ? data.reply
          : "Please try WhatsApp or call the clinic — we are happy to help.";
      const actions = Array.isArray(data.actions) ? data.actions : [];

      setMessages((prev) => [
        ...prev,
        { id: uid(), role: "assistant", content: reply, actions },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          content:
            "Could not reach the assistant. Please try WhatsApp or call the clinic.",
          actions: ["whatsapp", "call"],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-[80] flex flex-col items-end gap-3 sm:right-6 sm:bottom-6">
      {open ? (
        <div
          className="pointer-events-auto flex h-[min(520px,calc(100dvh-6.5rem))] w-[min(100vw-2rem,360px)] flex-col overflow-hidden rounded-3xl border border-border/80 bg-background shadow-glow reveal"
          role="dialog"
          aria-label="My First Care chat"
        >
          <header className="relative shrink-0 bg-gradient-leaf px-4 py-3.5 text-primary-foreground">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                  <HeartPulse className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-tight">
                    My First Care
                  </h2>
                  <p className="text-xs text-primary-foreground/85">
                    Gentle guidance · Book when ready
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-1.5 text-primary-foreground/90 transition-colors hover:bg-white/15"
                aria-label="Close My First Care"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-[linear-gradient(180deg,oklch(0.97_0.02_110)_0%,var(--color-background)_40%)] px-3 py-3"
          >
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                role={m.role}
                content={m.content}
                actions={m.actions}
              />
            ))}
            {loading ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-border/80 bg-card px-3.5 py-2.5 text-xs text-muted-foreground shadow-soft">
                  My First Care is typing…
                </div>
              </div>
            ) : null}
          </div>

          {messages.length <= 2 ? (
            <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-border/50 bg-cream/60 px-3 py-2">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  disabled={loading}
                  onClick={() => void sendMessage(q)}
                  className="shrink-0 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-primary disabled:opacity-60"
                >
                  {q}
                </button>
              ))}
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="flex shrink-0 items-center gap-2 border-t border-border/70 bg-card px-3 py-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              disabled={loading}
              className="min-w-0 flex-1 rounded-full border border-input bg-background px-3.5 py-2 text-sm outline-none ring-ring focus:ring-2 disabled:opacity-60"
              aria-label="Message My First Care"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-[1.03] disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <p className="shrink-0 bg-muted/80 px-3 py-1.5 text-center text-[10px] leading-snug text-muted-foreground">
            Not a medical diagnosis. For serious symptoms, call the clinic or emergency services.
          </p>
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-glow transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        aria-label={open ? "Close My First Care" : "Open My First Care"}
        aria-expanded={open}
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-accent/40 opacity-40"
          aria-hidden
        />
        {open ? (
          <X className="relative h-6 w-6" />
        ) : (
          <MessageCircleHeart className="relative h-6 w-6" />
        )}
      </button>
    </div>
  );
}

import { Calendar, MessageCircle, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import type { ChatAction } from "@/lib/chat/types";

const ACTION_META: Record<
  ChatAction,
  { label: string; href: string; external?: boolean; Icon: typeof Phone }
> = {
  book: {
    label: "Book appointment",
    href: SITE.form_link,
    external: true,
    Icon: Calendar,
  },
  whatsapp: {
    label: "WhatsApp",
    href: SITE.whatsappHref,
    external: true,
    Icon: MessageCircle,
  },
  call: {
    label: "Call clinic",
    href: SITE.phoneHref,
    Icon: Phone,
  },
};

type ChatMessageProps = {
  role: "user" | "assistant";
  content: string;
  actions?: ChatAction[];
};

export function ChatMessage({ role, content, actions = [] }: ChatMessageProps) {
  const isUser = role === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border/80 bg-card text-foreground shadow-soft"
        }`}
      >
        <p className="whitespace-pre-wrap">{content}</p>
        {!isUser && actions.length > 0 ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {actions.map((action) => {
              const meta = ACTION_META[action];
              if (!meta?.href) return null;
              const Icon = meta.Icon;
              return (
                <a
                  key={action}
                  href={meta.href}
                  target={meta.external ? "_blank" : undefined}
                  rel={meta.external ? "noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-transform hover:scale-[1.02]"
                >
                  <Icon className="h-3.5 w-3.5" />
                  {meta.label}
                </a>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { isBookingTurn, bookingFormResponse } from "@/lib/chat/booking";
import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import type {
  ChatAction,
  ChatApiResponse,
  ChatMessagePayload,
} from "@/lib/chat/types";

export const runtime = "nodejs";

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_HISTORY = 10;
const MAX_CONTENT_LEN = 2000;

const ALLOWED_ACTIONS = new Set<ChatAction>(["book", "whatsapp", "call"]);

const SEVERE_PATTERN =
  /\b(severe|chest pain|can'?t breathe|cannot breathe|breathless|shortness of breath|faint(ing)?|unconscious|suicid|self[- ]harm|stroke|paralysis|bleeding heavily|high fever|emergency|heart attack|seizure|convulsion|pregnant.*(bleed|pain|emergency)|साँस नहीं|सीने में दर्द|बेहोश|तेज़ बुखार|आपातकाल)\b/i;

function sanitizeActions(raw: unknown): ChatAction[] {
  if (!Array.isArray(raw)) return [];
  const out: ChatAction[] = [];
  for (const item of raw) {
    if (typeof item === "string" && ALLOWED_ACTIONS.has(item as ChatAction)) {
      const action = item as ChatAction;
      if (!out.includes(action)) out.push(action);
    }
  }
  return out;
}

function parseModelJson(content: string): ChatApiResponse {
  const trimmed = content.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) {
    return { reply: trimmed || "Sorry, I could not process that. Please try WhatsApp or call the clinic.", actions: ["whatsapp", "call"] };
  }
  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1)) as {
      reply?: unknown;
      actions?: unknown;
    };
    const reply =
      typeof parsed.reply === "string" && parsed.reply.trim()
        ? parsed.reply.trim()
        : "I am here to help. How can I support you today?";
    return { reply, actions: sanitizeActions(parsed.actions) };
  } catch {
    return {
      reply: trimmed.slice(0, 1200) || "Sorry, something went wrong. Please try WhatsApp or call the clinic.",
      actions: ["whatsapp", "call"],
    };
  }
}

function validateMessages(input: unknown): ChatMessagePayload[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;
  const cleaned: ChatMessagePayload[] = [];
  for (const item of input.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== "object") return null;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") return null;
    if (typeof content !== "string") return null;
    const text = content.trim().slice(0, MAX_CONTENT_LEN);
    if (!text) continue;
    cleaned.push({ role, content: text });
  }
  return cleaned.length ? cleaned : null;
}

function forceSevereActions(
  messages: ChatMessagePayload[],
  result: ChatApiResponse,
): ChatApiResponse {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser || !SEVERE_PATTERN.test(lastUser.content)) return result;
  const actions = sanitizeActions([
    ...result.actions,
    "call",
    "whatsapp",
    "book",
  ]);
  return { ...result, actions };
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(
      {
        reply:
          "Chat is temporarily unavailable. Please book on WhatsApp or call the clinic — we are happy to help.",
        actions: ["whatsapp", "call", "book"],
      } satisfies ChatApiResponse,
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const messages = validateMessages(
    (body as { messages?: unknown })?.messages,
  );
  if (!messages) {
    return Response.json(
      { error: "messages must be a non-empty array of {role, content}" },
      { status: 400 },
    );
  }

  if (isBookingTurn(messages)) {
    return Response.json(bookingFormResponse(messages) satisfies ChatApiResponse);
  }

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.4,
        max_tokens: 500,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (groqRes.status === 429) {
      return Response.json(
        {
          reply:
            "We are getting many questions right now. Please try WhatsApp or call the clinic — the team will respond quickly.",
          actions: ["whatsapp", "call", "book"],
        } satisfies ChatApiResponse,
        { status: 429 },
      );
    }

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "");
      console.error("Groq error", groqRes.status, errText.slice(0, 400));
      return Response.json(
        {
          reply:
            "Something went wrong on our side. Please reach us on WhatsApp or call the clinic.",
          actions: ["whatsapp", "call"],
        } satisfies ChatApiResponse,
        { status: 502 },
      );
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    const parsed = forceSevereActions(messages, parseModelJson(content));
    return Response.json(parsed satisfies ChatApiResponse);
  } catch (err) {
    console.error("Chat route failure", err);
    return Response.json(
      {
        reply:
          "Could not reach the assistant. Please try WhatsApp or call the clinic.",
        actions: ["whatsapp", "call"],
      } satisfies ChatApiResponse,
      { status: 502 },
    );
  }
}

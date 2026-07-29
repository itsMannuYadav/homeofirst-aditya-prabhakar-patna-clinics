import {
  bookingFormResponse,
  medicineResponse,
  sanitizeActions,
  severeResponse,
  userPrefersHindi,
} from "./fallbacks";
import type { ChatApiResponse, ChatMessagePayload } from "./types";

export const BOOKING_PATTERN =
  /\b(book(ing)?|appointment|schedule|reschedule|cancel.*appointment|confirm.*appointment|my appointment|already booked|existing appointment|walk[\s-]?in|slot|milne|milna|aana hai|aa raha|aa rahi|aaunga|aaungi|aaoonga|kal aa|parso aa|aaj aa|doctor ko bol|doctor se mil|appointment ki|form bhar|time fix|pushti|confirm kar|visit fix|clinic aa|mil lunga|mil lungi|time bata|slot chahiye|appointment hai|meri appointment)\b/i;

const TIME_ONLY_PATTERN =
  /^\s*(\d{1,2}(:\d{2})?\s*(am|pm|baje)?|\d{1,2}\s*baje)\s*$/i;

const DATEish_PATTERN =
  /^\s*(kal|parso|aaj|tomorrow|today|monday|tuesday|wednesday|thursday|friday|saturday|sunday|somvar|mangalvar|budhvar|guruvar|shukrvar|shanivar|ravivar|\d{1,2}[/-]\d{1,2})\s*$/i;

export const MEDICINE_PATTERN =
  /\b(medicine|medicines|dawa|dawai|dawa[ai]|remedy|remedies|prescri(be|ption)|tablet|dose|dosage|homeopathic medicine|which medicine|what medicine|konsi dawa|kya dawa|ilaaj ke liye kya|medicine batao|medicine suggest|suggest medicine|recommend medicine)\b/i;

export const SEVERE_PATTERN =
  /\b(severe|chest pain|can'?t breathe|cannot breathe|breathless|shortness of breath|faint(ing)?|unconscious|suicid|self[- ]harm|stroke|paralysis|bleeding heavily|high fever|emergency|heart attack|seizure|convulsion|pregnant.*(bleed|pain|emergency)|बेहोश|तेज़ बुखार|आपातकाल|साँस नहीं|सीने में दर्द|बहुत तेज|behosh|saans nahi|emergency|112|ambulance)\b/i;

const FALSE_BOOKING_REPLY =
  /\b(batata hoon|bata dunga|bata doonga|bata deta|message bhej|whatsapp kar(unga|unga)?|pushti kar|confirm(ed| kar)?|noted your|tell Dr|I'll (tell|inform|notify|message|whatsapp|text)|aapka swagat|slot (is )?(booked|confirmed|set|fixed)|appointment (is )?(booked|confirmed|fixed|set)|main Dr\.? Paramjeet ko|I('ll| will) (book|confirm|schedule))\b/i;

const FALSE_MEDICINE_REPLY =
  /\b(take \w+|try \w+|use \w+|recommend(ed)? \w+|suggest(ed)? \w+|prescribe(d)? \w+|you (can|should) take|dose of|times a day| Arnica|Belladonna|Nux vomica|Rhus tox|Sulphur|medicine (is|would be))\b/i;

const ASSISTANT_BOOKING_CONTEXT =
  /\b(appointment|form|book|slot|visit|time|confirm|pushti)\b/i;

export function hasBookingContext(messages: ChatMessagePayload[]): boolean {
  const recent = messages
    .slice(-8)
    .map((m) => m.content)
    .join(" ");
  if (BOOKING_PATTERN.test(recent)) return true;

  const lastAssistant = [...messages]
    .reverse()
    .find((m) => m.role === "assistant");
  if (
    lastAssistant &&
    ASSISTANT_BOOKING_CONTEXT.test(lastAssistant.content)
  ) {
    return true;
  }
  return false;
}

export function isBookingTurn(messages: ChatMessagePayload[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;

  const text = lastUser.content.trim();
  if (BOOKING_PATTERN.test(text)) return true;

  const prior = messages.slice(0, -1);
  if (!hasBookingContext(prior)) return false;

  if (TIME_ONLY_PATTERN.test(text) || DATEish_PATTERN.test(text)) {
    return true;
  }

  return false;
}

export function isMedicineTurn(messages: ChatMessagePayload[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;
  return MEDICINE_PATTERN.test(lastUser.content);
}

export function isSevereTurn(messages: ChatMessagePayload[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;
  return SEVERE_PATTERN.test(lastUser.content);
}

export function replyViolatesBookingRules(reply: string): boolean {
  return FALSE_BOOKING_REPLY.test(reply);
}

export function replyViolatesMedicineRules(reply: string): boolean {
  return FALSE_MEDICINE_REPLY.test(reply);
}

export function sanitizeAssistantResponse(
  messages: ChatMessagePayload[],
  result: ChatApiResponse,
): ChatApiResponse {
  if (isSevereTurn(messages)) {
    return severeResponse(messages);
  }

  if (isBookingTurn(messages) || replyViolatesBookingRules(result.reply)) {
    return bookingFormResponse(messages);
  }

  if (isMedicineTurn(messages) || replyViolatesMedicineRules(result.reply)) {
    return medicineResponse(messages);
  }

  const reply = result.reply.trim().slice(0, 1500);
  let actions = sanitizeActions(result.actions);

  if (actions.length === 0 && /book|appointment|form|visit/i.test(reply)) {
    actions = ["book"];
  }

  if (!reply) {
    return userPrefersHindi(messages)
      ? {
          reply:
            "Main samajh nahi paaya. Clinic ke baare mein poochhiye, ya Book appointment form bhariye.",
          actions: ["book"],
        }
      : {
          reply:
            "I'm not sure I understood. Ask about the clinic, or use the Book appointment form.",
          actions: ["book"],
        };
  }

  return { reply, actions };
}

export function parseModelJson(content: string): ChatApiResponse {
  const trimmed = content.trim();
  if (!trimmed) {
    return { reply: "", actions: [] };
  }

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf("{");
  const end = candidate.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    if (FALSE_BOOKING_REPLY.test(trimmed) || BOOKING_PATTERN.test(trimmed)) {
      return { reply: trimmed, actions: ["book"] };
    }
    return { reply: trimmed.slice(0, 1200), actions: [] };
  }

  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1)) as {
      reply?: unknown;
      actions?: unknown;
    };
    const reply =
      typeof parsed.reply === "string" ? parsed.reply.trim() : "";
    return { reply, actions: sanitizeActions(parsed.actions) };
  } catch {
    return { reply: trimmed.slice(0, 1200), actions: [] };
  }
}

export const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
export const GROQ_MODEL = "llama-3.3-70b-versatile";
export const MAX_HISTORY = 10;
export const MAX_CONTENT_LEN = 2000;
export const GROQ_TIMEOUT_MS = 25_000;

export function validateMessages(input: unknown): ChatMessagePayload[] | null {
  if (!Array.isArray(input) || input.length === 0) return null;

  const cleaned: ChatMessagePayload[] = [];
  for (const item of input.slice(-MAX_HISTORY)) {
    if (!item || typeof item !== "object") continue;
    const role = (item as { role?: unknown }).role;
    const content = (item as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") continue;
    if (typeof content !== "string") continue;
    const text = content.trim().slice(0, MAX_CONTENT_LEN);
    if (!text) continue;
    cleaned.push({ role, content: text });
  }

  const hasUser = cleaned.some((m) => m.role === "user");
  return hasUser ? cleaned : null;
}

export function resolvePreflight(messages: ChatMessagePayload[]) {
  if (isSevereTurn(messages)) return severeResponse(messages);
  if (isBookingTurn(messages)) return bookingFormResponse(messages);
  if (isMedicineTurn(messages)) return medicineResponse(messages);
  return null;
}

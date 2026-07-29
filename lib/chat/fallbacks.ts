import type { ChatAction, ChatApiResponse, ChatMessagePayload } from "./types";

export function userPrefersHindi(messages: ChatMessagePayload[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;
  return /[\u0900-\u097F]|kripya|dhanyavad|kaise|theek|bhai|nahi|samay|baje|form bhari|dawai|dawa|aa raha|aaungi|milne|bolna/i.test(
    lastUser.content,
  );
}

export function bookingFormResponse(
  messages: ChatMessagePayload[],
): ChatApiResponse {
  if (userPrefersHindi(messages)) {
    return {
      reply:
        "Main chat se appointment book ya confirm nahi kar sakta — na hi main Dr. Paramjeet ko abhi message bhej sakta hoon. Kripya neeche diye gaye Book appointment button se official form bhariye; clinic team aapke slot ki pushti karegi. Clinic samay: Som–Shanivar, subah 9 baje se raat 8 baje (Ravivar appointment par).",
      actions: ["book"],
    };
  }
  return {
    reply:
      "I can't book or confirm appointments from this chat — and I won't message Dr. Paramjeet on your behalf. Please use the Book appointment button below to fill the official form; the clinic team will confirm your slot. Clinic hours: Mon–Sat, 9 AM–8 PM (Sunday by appointment).",
    actions: ["book"],
  };
}

export function medicineResponse(
  messages: ChatMessagePayload[],
): ChatApiResponse {
  if (userPrefersHindi(messages)) {
    return {
      reply:
        "Main koi dawa ya medicine suggest nahi kar sakta — yeh sirf Dr. Paramjeet consultation ke baad decide karte hain. Kripya Book appointment button se form bhariye ya clinic se sampark kijiye.",
      actions: ["book", "call"],
    };
  }
  return {
    reply:
      "I can't suggest any medicine or remedy — only Dr. Paramjeet can decide that after a consultation. Please fill the appointment form below or call the clinic.",
    actions: ["book", "call"],
  };
}

export function severeResponse(
  messages: ChatMessagePayload[],
): ChatApiResponse {
  if (userPrefersHindi(messages)) {
    return {
      reply:
        "Yeh symptoms gambhir ho sakte hain. Turant clinic ko call kijiye ya WhatsApp kijiye. Agar haalat bahut kharab ho to emergency services (112) par call karein. Main chat se ilaaj ya appointment confirm nahi kar sakta.",
      actions: ["call", "whatsapp", "book"],
    };
  }
  return {
    reply:
      "These symptoms may be serious. Please call or WhatsApp the clinic right away. If you feel unsafe or symptoms are worsening, contact emergency services (112). I can't treat or confirm appointments from chat.",
    actions: ["call", "whatsapp", "book"],
  };
}

export function serviceUnavailableResponse(): ChatApiResponse {
  return {
    reply:
      "Chat is temporarily unavailable. Please use the Book appointment form, WhatsApp, or call the clinic — we're happy to help.",
    actions: ["book", "whatsapp", "call"],
  };
}

export function rateLimitedResponse(): ChatApiResponse {
  return {
    reply:
      "We're getting many messages right now. Please use the appointment form, WhatsApp, or call the clinic — the team responds quickly.",
    actions: ["book", "whatsapp", "call"],
  };
}

export function upstreamErrorResponse(): ChatApiResponse {
  return {
    reply:
      "Something went wrong on our side. Please use the appointment form, WhatsApp, or call the clinic.",
    actions: ["book", "whatsapp", "call"],
  };
}

export function parseErrorResponse(): ChatApiResponse {
  return {
    reply:
      "I couldn't process that message. Please try again, or use the appointment form / WhatsApp / call the clinic.",
    actions: ["book", "whatsapp", "call"],
  };
}

export function emptyModelResponse(): ChatApiResponse {
  return {
    reply:
      "I'm not sure I understood that. Ask about clinic hours, Dr. Paramjeet, or general care tips — or use the form to book a visit.",
    actions: ["book"],
  };
}

export function offlineResponse(): ChatApiResponse {
  return {
    reply:
      "Could not reach the assistant. Please use the appointment form, WhatsApp, or call the clinic.",
    actions: ["book", "whatsapp", "call"],
  };
}

export function sanitizeActions(raw: unknown): ChatAction[] {
  const allowed = new Set<ChatAction>(["book", "whatsapp", "call"]);
  if (!Array.isArray(raw)) return [];
  const out: ChatAction[] = [];
  for (const item of raw) {
    if (typeof item === "string" && allowed.has(item as ChatAction)) {
      const action = item as ChatAction;
      if (!out.includes(action)) out.push(action);
    }
  }
  return out;
}

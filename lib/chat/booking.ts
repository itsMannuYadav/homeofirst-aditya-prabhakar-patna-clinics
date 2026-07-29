import type { ChatApiResponse, ChatMessagePayload } from "./types";

const BOOKING_PATTERN =
  /\b(book(ing)?|appointment|schedule|reschedule|cancel.*appointment|confirm.*appointment|my appointment|already booked|walk[\s-]?in|slot|milne|milna|aana hai|aa raha|aa rahi|aaunga|aaungi|kal aa|parso aa|doctor ko bol|appointment ki|form bhar|time fix|pushti|confirm kar)\b/i;

const TIME_ONLY_PATTERN =
  /^\s*(\d{1,2}(:\d{2})?\s*(am|pm|baje)?|\d{1,2}\s*baje)\s*$/i;

const HINDI_PATTERN =
  /[\u0900-\u097F]|kripya|dhanyavad|kaise|theek|bhai|doctor ko|aa raha|aaungi|samay|baje|form bhari/i;

export function hasBookingContext(messages: ChatMessagePayload[]): boolean {
  const recent = messages
    .slice(-8)
    .map((m) => m.content)
    .join(" ");
  return BOOKING_PATTERN.test(recent);
}

export function isBookingTurn(messages: ChatMessagePayload[]): boolean {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  if (!lastUser) return false;

  const text = lastUser.content.trim();
  if (BOOKING_PATTERN.test(text)) return true;

  if (TIME_ONLY_PATTERN.test(text) && hasBookingContext(messages.slice(0, -1))) {
    return true;
  }

  return false;
}

export function bookingFormResponse(messages: ChatMessagePayload[]): ChatApiResponse {
  const lastUser = [...messages].reverse().find((m) => m.role === "user");
  const hindi = lastUser ? HINDI_PATTERN.test(lastUser.content) : false;

  if (hindi) {
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

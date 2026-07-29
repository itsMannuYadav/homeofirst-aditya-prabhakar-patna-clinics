export type ChatAction = "book" | "whatsapp" | "call";

export type ChatRole = "user" | "assistant";

export type ChatMessagePayload = {
  role: ChatRole;
  content: string;
};

export type ChatApiResponse = {
  reply: string;
  actions: ChatAction[];
};

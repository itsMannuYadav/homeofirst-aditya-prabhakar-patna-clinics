import { buildSystemPrompt } from "@/lib/chat/system-prompt";
import {
  emptyModelResponse,
  offlineResponse,
  parseErrorResponse,
  rateLimitedResponse,
  serviceUnavailableResponse,
  upstreamErrorResponse,
} from "@/lib/chat/fallbacks";
import {
  GROQ_MODEL,
  GROQ_TIMEOUT_MS,
  GROQ_URL,
  parseModelJson,
  resolvePreflight,
  sanitizeAssistantResponse,
  validateMessages,
} from "@/lib/chat/guards";
import type { ChatApiResponse } from "@/lib/chat/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return Response.json(serviceUnavailableResponse() satisfies ChatApiResponse, {
      status: 503,
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json(parseErrorResponse() satisfies ChatApiResponse, {
      status: 400,
    });
  }

  const messages = validateMessages(
    (body as { messages?: unknown })?.messages,
  );
  if (!messages) {
    return Response.json(parseErrorResponse() satisfies ChatApiResponse, {
      status: 400,
    });
  }

  const preflight = resolvePreflight(messages);
  if (preflight) {
    return Response.json(preflight satisfies ChatApiResponse);
  }

  try {
    const groqRes = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(GROQ_TIMEOUT_MS),
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.35,
        max_tokens: 450,
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...messages.map((m) => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    if (groqRes.status === 429) {
      return Response.json(rateLimitedResponse() satisfies ChatApiResponse, {
        status: 429,
      });
    }

    if (!groqRes.ok) {
      const errText = await groqRes.text().catch(() => "");
      console.error("Groq error", groqRes.status, errText.slice(0, 400));
      return Response.json(upstreamErrorResponse() satisfies ChatApiResponse, {
        status: 502,
      });
    }

    const data = (await groqRes.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = data.choices?.[0]?.message?.content ?? "";
    const parsed = parseModelJson(content);
    const base =
      parsed.reply.trim().length > 0 ? parsed : emptyModelResponse();
    const safe = sanitizeAssistantResponse(messages, base);
    return Response.json(safe satisfies ChatApiResponse);
  } catch (err) {
    const isTimeout =
      err instanceof Error &&
      (err.name === "TimeoutError" || err.name === "AbortError");
    console.error("Chat route failure", isTimeout ? "timeout" : err);
    return Response.json(offlineResponse() satisfies ChatApiResponse, {
      status: isTimeout ? 504 : 502,
    });
  }
}

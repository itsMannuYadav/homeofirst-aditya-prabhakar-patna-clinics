import { track } from "track-post";

export const runtime = "nodejs";

const CONSIGNMENT_RE = /^[A-Z]{2}\d{9}[A-Z]{2}$/;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const consignment =
    typeof body === "object" &&
    body !== null &&
    "consignment" in body &&
    typeof (body as { consignment: unknown }).consignment === "string"
      ? (body as { consignment: string }).consignment.replace(/\s+/g, "").toUpperCase()
      : "";

  if (!CONSIGNMENT_RE.test(consignment)) {
    return Response.json(
      {
        error:
          "Enter a valid India Post number (13 characters, e.g. EM123456789IN).",
      },
      { status: 400 },
    );
  }

  try {
    const result = await track(consignment);
    return Response.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to fetch tracking status.";
    return Response.json({ error: message }, { status: 502 });
  }
}

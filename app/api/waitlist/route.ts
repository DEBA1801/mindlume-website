import { google } from "googleapis";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const EMAIL_COOLDOWN_MS = 60 * 1000;

const ipRequestTimestamps = new Map<string, number[]>();
const emailLastSubmissionAt = new Map<string, number>();

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function cleanOldEntries(now: number) {
  for (const [key, timestamps] of ipRequestTimestamps.entries()) {
    const recentTimestamps = timestamps.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );

    if (recentTimestamps.length === 0) {
      ipRequestTimestamps.delete(key);
    } else {
      ipRequestTimestamps.set(key, recentTimestamps);
    }
  }

  for (const [key, lastSubmissionAt] of emailLastSubmissionAt.entries()) {
    if (now - lastSubmissionAt >= EMAIL_COOLDOWN_MS) {
      emailLastSubmissionAt.delete(key);
    }
  }
}

function checkIpRateLimit(ip: string, now: number) {
  const recentTimestamps = (ipRequestTimestamps.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentTimestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestRecentRequest = Math.min(...recentTimestamps);
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - oldestRecentRequest);
    return {
      isLimited: true,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  recentTimestamps.push(now);
  ipRequestTimestamps.set(ip, recentTimestamps);
  return { isLimited: false, retryAfterSeconds: 0 };
}

function checkEmailCooldown(email: string, now: number) {
  const lastSubmissionAt = emailLastSubmissionAt.get(email);
  if (lastSubmissionAt && now - lastSubmissionAt < EMAIL_COOLDOWN_MS) {
    const retryAfterMs = EMAIL_COOLDOWN_MS - (now - lastSubmissionAt);
    return {
      isLimited: true,
      retryAfterSeconds: Math.max(1, Math.ceil(retryAfterMs / 1000)),
    };
  }

  emailLastSubmissionAt.set(email, now);
  return { isLimited: false, retryAfterSeconds: 0 };
}

function getPublicWaitlistError(
  error: unknown,
  fallbackMessage: string,
): string {
  if (error instanceof Error) {
    if (error.message.startsWith("Waitlist service is not configured.")) {
      return error.message;
    }
  }

  return fallbackMessage;
}

async function getSheetsClient() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  const privateKeyRaw = process.env.GOOGLE_PRIVATE_KEY?.trim();
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim();

  if (!clientEmail || !privateKeyRaw || !sheetId) {
    throw new Error(
      "Waitlist service is not configured. Missing GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, or GOOGLE_SHEET_ID.",
    );
  }

  const privateKey = privateKeyRaw
    .replace(/^"|"$/g, "")
    .replace(/\\n/g, "\n");

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return google.sheets({ auth, version: "v4" });
}

async function getWaitlistEmails() {
  const sheets = await getSheetsClient();
  const existingEmailsResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!B:B",
  });

  return (existingEmailsResponse.data.values ?? [])
    .flat()
    .map((value) => String(value).trim().toLowerCase())
    .filter(Boolean);
}

export async function GET() {
  try {
    const uniqueEmails = new Set(await getWaitlistEmails());
    return NextResponse.json({ count: uniqueEmails.size });
  } catch (error) {
    console.error("Error reading waitlist count:", error);
    const message = getPublicWaitlistError(
      error,
      "Failed to fetch waitlist count.",
    );
    return NextResponse.json(
      { error: message },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Form submission received:", body);

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email =
      typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const role = typeof body?.role === "string" ? body.role.trim() : "";

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 },
      );
    }

    const now = Date.now();
    cleanOldEntries(now);

    const ip = getClientIp(req);
    const ipRateLimit = checkIpRateLimit(ip, now);
    if (ipRateLimit.isLimited) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again shortly." },
        {
          status: 429,
          headers: { "Retry-After": String(ipRateLimit.retryAfterSeconds) },
        },
      );
    }

    const emailCooldown = checkEmailCooldown(email, now);
    if (emailCooldown.isLimited) {
      return NextResponse.json(
        { error: "Please wait a moment before trying this email again." },
        {
          status: 429,
          headers: { "Retry-After": String(emailCooldown.retryAfterSeconds) },
        },
      );
    }

    const sheets = await getSheetsClient();
    const existingEmails = await getWaitlistEmails();

    if (existingEmails.includes(email)) {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 },
      );
    }

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:D",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[new Date().toISOString(), email, name, role]],
      },
    });

    console.log("Successfully added to sheet");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error writing to sheet:", error);
    const message = getPublicWaitlistError(error, "Failed to add");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

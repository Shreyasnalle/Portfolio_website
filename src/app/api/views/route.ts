import { NextRequest, NextResponse } from "next/server";

// ── Upstash Redis REST API (free tier, persistent) ──────────────────────────
// Set these in Vercel Environment Variables:
//   UPSTASH_REDIS_REST_URL
//   UPSTASH_REDIS_REST_TOKEN

const VIEWS_KEY = "portfolio_total_views";

async function redisCommand(command: string[]): Promise<unknown> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  const res = await fetch(`${url}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) {
    console.error("Upstash Redis error:", res.status, await res.text());
    return null;
  }

  const data = await res.json();
  return data.result;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const shouldIncrement =
    request.nextUrl.searchParams.get("incr") === "true";

  let currentCount: number = 0;

  if (shouldIncrement) {
    const result = await redisCommand(["INCR", VIEWS_KEY]);
    if (typeof result === "number") {
      currentCount = result;
    }
  } else {
    const result = await redisCommand(["GET", VIEWS_KEY]);
    if (result !== null && result !== undefined) {
      currentCount = parseInt(String(result), 10) || 0;
    }
  }

  return NextResponse.json(
    { count: currentCount },
    {
      headers: {
        "Cache-Control":
          "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "src/components/views-cache.json");
const VIEWS_KEY = "portfolio_total_views";

// ── Vercel KV helper (optional: only used when KV env vars are present) ──────
async function kvIncr(): Promise<number | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null; // KV not configured, fall through to local file
  }
  try {
    const { kv } = await import("@vercel/kv");
    const newVal = await kv.incr(VIEWS_KEY);
    return newVal;
  } catch {
    return null;
  }
}

async function kvGet(): Promise<number | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) {
    return null;
  }
  try {
    const { kv } = await import("@vercel/kv");
    const val = await kv.get<number>(VIEWS_KEY);
    return typeof val === "number" ? val : 0;
  } catch {
    return null;
  }
}

// ── Local file fallback (works during `npm run dev`) ─────────────────────────
function getLocalCount(): number {
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const content = fs.readFileSync(CACHE_PATH, "utf8");
      const parsed = JSON.parse(content);
      if (typeof parsed.views === "number") return parsed.views;
    }
  } catch {
    // ignore
  }
  return 0;
}

function saveLocalCount(count: number) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify({ views: count }, null, 2), "utf8");
  } catch {
    // ignore (read-only serverless filesystem)
  }
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const shouldIncrement = request.nextUrl.searchParams.get("incr") === "true";

  let currentCount: number;

  if (shouldIncrement) {
    const kvResult = await kvIncr();
    if (kvResult !== null) {
      currentCount = kvResult;
    } else {
      // local fallback
      currentCount = getLocalCount() + 1;
      saveLocalCount(currentCount);
    }
  } else {
    const kvResult = await kvGet();
    if (kvResult !== null) {
      currentCount = kvResult;
    } else {
      currentCount = getLocalCount();
    }
  }

  return NextResponse.json(
    { count: currentCount },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    }
  );
}

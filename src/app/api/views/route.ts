import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "src/components/views-cache.json");
const BASELINE_COUNT = 21030;

function getLocalCount(): number {
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const content = fs.readFileSync(CACHE_PATH, "utf8");
      const parsed = JSON.parse(content);
      if (typeof parsed.views === "number") {
        return parsed.views;
      }
    }
  } catch {
    // Ignore read errors
  }
  return BASELINE_COUNT;
}

function saveLocalCount(count: number) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify({ views: count }, null, 2), "utf8");
  } catch {
    // Ignore write errors (e.g. read-only serverless environment)
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const shouldIncrement = searchParams.get("incr") === "true";

  let currentCount = getLocalCount();

  if (shouldIncrement) {
    currentCount += 1;
    saveLocalCount(currentCount);

    // Sync in the background with cloud counter
    try {
      fetch("https://hits.sh/shreyasnalle.vercel.app/views.svg", {
        headers: { "User-Agent": "portfolio-views-sync" },
      }).catch(() => {});
    } catch {
      // Ignore background sync errors
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

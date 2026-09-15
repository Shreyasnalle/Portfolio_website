import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const CACHE_PATH = path.join(process.cwd(), "src/components/views-cache.json");
const BASELINE_COUNT = 0;

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

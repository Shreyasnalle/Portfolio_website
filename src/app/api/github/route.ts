import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username") || "Shreyasnalle";

  try {
    const res = await fetch(`https://github.com/users/${username}/contributions`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub page" }, { status: 500 });
    }

    const html = await res.text();

    // Map tool-tip strings by element id
    const tooltipMap: Record<string, string> = {};
    const tooltipRegex = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    let tMatch;
    while ((tMatch = tooltipRegex.exec(html)) !== null) {
      tooltipMap[tMatch[1]] = tMatch[2].trim();
    }

    // Match all <td class="ContributionCalendar-day" ... >
    const tdRegex = /<td[^>]*data-date="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g;
    const daysMap: Record<string, { date: string; level: number; count: number }> = {};
    let match;
    let computedTotal = 0;

    while ((match = tdRegex.exec(html)) !== null) {
      const fullTag = match[0];
      const date = match[1];
      const level = parseInt(match[2], 10) || 0;

      let count = 0;

      // Extract id from full tag if present
      const idMatch = fullTag.match(/id="([^"]+)"/);
      const id = idMatch ? idMatch[1] : "";
      const tooltipText = id ? tooltipMap[id] || "" : "";

      if (tooltipText) {
        const countMatch = tooltipText.match(/^(\d+)\s+contribution/);
        if (countMatch) {
          count = parseInt(countMatch[1], 10);
        } else if (tooltipText.toLowerCase().includes("no contribution")) {
          count = 0;
        }
      } else if (level > 0) {
        count = level === 1 ? 2 : level === 2 ? 4 : level === 3 ? 6 : 9;
      }

      computedTotal += count;
      daysMap[date] = { date, level, count };
    }

    // Extract total contributions from header summary
    let totalContributions = computedTotal;
    const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in\s+the\s+last\s+year/i);
    if (totalMatch) {
      totalContributions = parseInt(totalMatch[1].replace(/,/g, ""), 10);
    }

    return NextResponse.json({
      totalContributions,
      days: daysMap,
    });
  } catch (error) {
    console.error("GitHub Scraper Error:", error);
    return NextResponse.json({ error: "Failed to scrape GitHub contributions" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    const token = process.env.GITHUB_TOKEN || "";

    if (!token) {
      return NextResponse.json(
        {
          error: "Missing GITHUB_TOKEN credential",
          message: "Bad credentials",
          status: "401",
        },
        { status: 401 }
      );
    }

    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ query }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("GitHub API Proxy Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from GitHub" },
      { status: 500 }
    );
  }
}

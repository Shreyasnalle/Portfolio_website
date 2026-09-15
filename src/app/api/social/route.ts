import { NextResponse } from "next/server";

export async function GET() {
  try {
    let githubData = {
      name: "Shreyas Nalle",
      handle: "Shreyasnalle",
      avatar: "https://avatars.githubusercontent.com/u/179994405?v=4",
      bio: "Computer Science 3rd year student. Seeing AI and tech reshaping the world interests me.",
      location: "India",
      stats: [
        { label: "Repositories", value: 15 },
        { label: "Followers", value: 4 },
      ],
    };

    try {
      const ghRes = await fetch("https://api.github.com/users/Shreyasnalle", {
        headers: {
          "User-Agent": "Next.js Social HoverCard",
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      });

      if (ghRes.ok) {
        const gh = await ghRes.json();
        githubData = {
          name: gh.name || "Shreyas Nalle",
          handle: gh.login || "Shreyasnalle",
          avatar: gh.avatar_url || "https://avatars.githubusercontent.com/u/179994405?v=4",
          bio: gh.bio || "Computer Science 3rd year student. Seeing AI and tech reshaping the world interests me.",
          location: gh.location || "India",
          stats: [
            { label: "Repositories", value: gh.public_repos ?? 15 },
            { label: "Followers", value: gh.followers ?? 4 },
          ],
        };
      }
    } catch (e) {
      console.error("Error fetching live GitHub user data:", e);
    }

    const socialData = {
      GitHub: githubData,
      Twitter: {
        name: "Shreyas Nalle",
        handle: "@ShreyasNalle",
        avatar: "https://unavatar.io/x/ShreyasNalle",
        bio: "Applied AI • CS Student • Building real-world software applications",
        location: "India",
        stats: [],
      },
      X: {
        name: "Shreyas Nalle",
        handle: "@ShreyasNalle",
        avatar: "https://unavatar.io/x/ShreyasNalle",
        bio: "Applied AI • CS Student • Building real-world software applications",
        location: "India",
        stats: [],
      },
      LinkedIn: {
        name: "Shreyas Nalle",
        handle: "in/shreyas-nalle-0697bb371",
        avatar: "https://unavatar.io/linkedin/shreyas-nalle-0697bb371",
        bio: "Computer Science Student • Applied AI & Production Engineering",
        location: "India",
        stats: [],
      },
    };

    return NextResponse.json(socialData, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (err) {
    console.error("Social API Error:", err);
    return NextResponse.json(
      { error: "Failed to fetch social metadata" },
      { status: 500 }
    );
  }
}

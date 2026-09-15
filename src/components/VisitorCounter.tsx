"use client";

import React, { useEffect, useState } from "react";

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const sessionKey = "portfolio_session_visited_v2";
    const cachedCountKey = "portfolio_cached_view_count_v2";
    const hasVisitedThisSession = typeof window !== "undefined" ? sessionStorage.getItem(sessionKey) : null;

    // Initial fallback from localStorage
    const savedLocal = typeof window !== "undefined" ? localStorage.getItem(cachedCountKey) : null;
    if (savedLocal) {
      setCount(parseInt(savedLocal, 10));
    }

    async function recordOrFetchView() {
      try {
        const shouldIncrement = !hasVisitedThisSession;
        const res = await fetch(`/api/views?incr=${shouldIncrement}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const data = await res.json();
          if (data && typeof data.count === "number") {
            setCount(data.count);
            localStorage.setItem(cachedCountKey, data.count.toString());
            // Mark session as visited so page reloads/refreshes in this session don't increment
            if (shouldIncrement) {
              sessionStorage.setItem(sessionKey, "true");
            }
          }
        }
      } catch {
        if (count === null && !savedLocal) {
          setCount(0);
        }
      }
    }

    recordOrFetchView();
  }, []);

  return (
    <div
      className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 select-none text-[13px] sm:text-[14px] font-medium"
      title="Total visits"
    >
      {/* Eye icon */}
      <svg
        className="w-4 h-4 text-zinc-500 dark:text-zinc-400"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
        <circle
          cx="12"
          cy="12"
          r="3"
          fill="currentColor"
          className="text-zinc-500 dark:text-zinc-400"
        />
      </svg>
      <span className="tabular-nums">
        {count !== null ? count.toLocaleString() : "0"}
      </span>
    </div>
  );
}

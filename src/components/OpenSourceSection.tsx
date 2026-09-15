"use client";

import { useState } from "react";
import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";

type FilterType = "merged" | "open" | "closed";

interface ContributionItem {
  id: string;
  title: string;
  repo: string;
  url: string;
  state: "MERGED" | "OPEN" | "CLOSED";
}

const contributions: Record<FilterType, ContributionItem[]> = {
  merged: [
    {
      id: "5203",
      title: "Tests: honour turn-seam contracts in test_agent_actions.py",
      repo: "Tracer-Cloud/opensre",
      url: "https://github.com/Tracer-Cloud/opensre/issues/5203#event-29785228872",
      state: "MERGED",
    },
    {
      id: "5316",
      title: "Fix: truncate Telegram HTML tag-safely after markdown conversion",
      repo: "Tracer-Cloud/opensre",
      url: "https://github.com/Tracer-Cloud/opensre/issues/5316#event-29906887989",
      state: "MERGED",
    },
  ],
  open: [],
  closed: [],
};

export function OpenSourceSection() {
  const [filterType, setFilterType] = useState<FilterType>("merged");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleFilterChange = (type: FilterType) => {
    if (type === filterType) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setFilterType(type);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 30);
    }, 120);
  };

  const currentItems = contributions[filterType];

  return (
    <section id="opensource" className="scroll-mt-24 w-full">
      {/* Header Container with Title on the left and Toggle on the right */}
      <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <PixelHeading
          mode="random"
          as="h1"
          className="text-[16px] sm:text-[22px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          Open Source Contribution
        </PixelHeading>

        {/* Filter Toggle with sliding pill */}
        <div className="flex items-center gap-2 relative z-20 group self-start sm:self-auto">
          <div className="absolute -inset-[5px] border border-black/5 dark:border-white/5 rounded-[11px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />
          <div className="relative grid grid-cols-3 p-1 bg-zinc-50 dark:bg-[#09090b] rounded-[6px] border border-black/10 dark:border-white/10 shadow-sm shadow-black/10 dark:shadow-lg dark:shadow-black/80 w-fit select-none">
            {/* Sliding Pill Background */}
            <div
              className={`absolute top-1 bottom-1 left-1 w-[calc((100%-8px)/3)] rounded-[4px] bg-white dark:bg-[#1e1e20] border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform will-change-transform ${
                filterType === "merged"
                  ? "translate-x-0"
                  : filterType === "open"
                  ? "translate-x-[100%]"
                  : "translate-x-[200%]"
              }`}
            />

            {/* Buttons */}
            {(["merged", "open", "closed"] as FilterType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleFilterChange(type)}
                className={`z-10 relative px-3 py-1 text-[12px] font-medium text-center transition-colors duration-200 capitalize cursor-pointer ${
                  filterType === type
                    ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dotted Divider below heading */}
      <DottedDivider showNodes={true} />

      {/* Items Container with smooth crossfade */}
      <div className="px-4 py-2">
        <div
          className="transition-all duration-150 ease-out"
          style={{
            opacity: isTransitioning ? 0 : 1,
            transform: isTransitioning ? "translateY(4px)" : "translateY(0)",
          }}
        >
          {currentItems.length > 0 ? (
            <div className="flex flex-col">
              {currentItems.map((item, idx, arr) => {
                const isLast = idx === arr.length - 1;

                return (
                  <a
                    key={item.id}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col gap-1 py-3 px-3 -mx-3 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/20 rounded-lg cursor-pointer"
                  >
                    {!isLast && (
                      <div
                        className="absolute bottom-0 left-0 right-0 h-0 border-b border-black/20 dark:border-white/10 pointer-events-none z-10"
                        style={{
                          maskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                          WebkitMaskImage:
                            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
                        }}
                      />
                    )}
                    <div className="flex items-center gap-2.5 relative z-20 min-w-0">
                      <div className="w-2 h-2 rounded-full shrink-0 bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                      <h4 className="text-[14px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors truncate">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-[12px] text-zinc-500 dark:text-zinc-400 ml-4.5 pl-0.5 relative z-20">
                      {item.repo}
                    </p>
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useMemo, useState } from "react";
import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";
import cachedData from "./github-contributions-cache.json";

interface ContributionDay {
  contributionCount: number;
  date: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionLevel {
  cell: string;
}

interface TooltipState {
  count: number;
  date: string;
  x: number;
  y: number;
}

export function GithubGraph() {
  const initialData = useMemo(() => {
    try {
      const currentYear = new Date().getFullYear();
      const startOfYear = new Date(currentYear, 0, 1);
      const start = new Date(startOfYear);
      start.setDate(start.getDate() - start.getDay());

      const generatedWeeks: ContributionWeek[] = [];
      for (let w = 0; w < 53; w++) {
        const days: ContributionDay[] = [];
        for (let d = 0; d < 7; d++) {
          const currentDate = new Date(start);
          currentDate.setDate(start.getDate() + w * 7 + d);
          const dateStr = currentDate.toISOString().slice(0, 10);
          const dayData = (cachedData as any)?.days?.[dateStr];

          days.push({
            date: dateStr,
            contributionCount: dayData ? dayData.count : 0,
          });
        }
        generatedWeeks.push({ contributionDays: days });
      }
      return {
        weeks: generatedWeeks,
        total: (cachedData as any)?.totalContributions || 365,
      };
    } catch {
      return { weeks: [], total: 0 };
    }
  }, []);

  const [weeks, setWeeks] = useState<ContributionWeek[]>(() => initialData.weeks);
  const [totalContributions, setTotalContributions] = useState(() => initialData.total);
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch("/api/github?username=Shreyasnalle");
        if (response.ok) {
          const data = await response.json();
          if (data?.days) {
            setTotalContributions(data.totalContributions || 0);

            // Generate 53 weeks for current calendar year (Jan 1 - Dec 31)
            const currentYear = new Date().getFullYear();
            const startOfYear = new Date(currentYear, 0, 1);
            const start = new Date(startOfYear);
            start.setDate(start.getDate() - start.getDay());

            const generatedWeeks: ContributionWeek[] = [];
            for (let w = 0; w < 53; w++) {
              const days: ContributionDay[] = [];
              for (let d = 0; d < 7; d++) {
                const currentDate = new Date(start);
                currentDate.setDate(start.getDate() + w * 7 + d);
                const dateStr = currentDate.toISOString().slice(0, 10);
                const dayData = data.days[dateStr];

                days.push({
                  date: dateStr,
                  contributionCount: dayData ? dayData.count : 0,
                });
              }
              generatedWeeks.push({ contributionDays: days });
            }

            setWeeks(generatedWeeks);
          }
        }
      } catch (error) {
        console.error("Failed to fetch GitHub contributions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, []);

  const emptyWeeks = useMemo<ContributionWeek[]>(() => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const start = new Date(startOfYear);
    start.setDate(start.getDate() - start.getDay());

    return Array.from({ length: 53 }, (_, weekIndex) => ({
      contributionDays: Array.from({ length: 7 }, (_, dayIndex) => {
        const date = new Date(start);
        date.setDate(start.getDate() + weekIndex * 7 + dayIndex);

        return {
          contributionCount: 0,
          date: date.toISOString().slice(0, 10),
        };
      }),
    }));
  }, []);

  const contributionLevels = useMemo<ContributionLevel[]>(
    () => [
      { cell: "bg-zinc-200/90 dark:bg-zinc-800/90 border border-black/5 dark:border-white/5" },
      { cell: "bg-zinc-400 dark:bg-zinc-600 border border-black/5 dark:border-white/5" },
      { cell: "bg-zinc-600 dark:bg-zinc-400 border border-black/5 dark:border-white/5" },
      { cell: "bg-zinc-800 dark:bg-zinc-200 border border-black/5 dark:border-white/5" },
      { cell: "bg-zinc-950 dark:bg-zinc-50 border border-black/5 dark:border-white/5" },
    ],
    []
  );

  const getLevel = (count: number) => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
  };

  const formatDate = (date: string) => {
    return new Intl.DateTimeFormat("en", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(`${date}T00:00:00`));
  };

  const showTooltip = (
    day: ContributionDay,
    event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      count: day.contributionCount,
      date: formatDate(day.date),
      x: rect.left + rect.width / 2,
      y: rect.top,
    });
  };

  const monthLabels = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const start = new Date(startOfYear);
    start.setDate(start.getDate() - start.getDay());

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const labels: { colIndex: number; name: string }[] = [];

    for (let w = 0; w < 53; w++) {
      for (let d = 0; d < 7; d++) {
        const cd = new Date(start);
        cd.setDate(start.getDate() + w * 7 + d);
        if (cd.getFullYear() === currentYear && cd.getDate() === 1) {
          labels.push({
            colIndex: w,
            name: months[cd.getMonth()],
          });
        }
      }
    }

    return labels;
  }, []);

  const graphWeeks = weeks.length > 0 ? weeks : emptyWeeks;
  const currentYear = new Date().getFullYear();
  const graphStatus = loading
    ? "Loading GitHub contribution activity"
    : `${totalContributions} GitHub activities in ${currentYear}`;

  return (
    <section className="relative z-10 w-full" aria-label="GitHub Activity">
      {/* Heading Container */}
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <PixelHeading
          mode="uniform"
          as="h2"
          className="text-[16px] sm:text-[15px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          GitHub Activity
        </PixelHeading>
        <p className="text-right text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
          {graphStatus}
        </p>
      </div>

      {/* Dotted Divider under heading */}
      <DottedDivider showNodes={true} />

      {/* Graph content */}
      <div className="relative px-4 py-4">
        <div className="w-full">
          <div>
            <div className="mb-2 grid grid-cols-[repeat(53,minmax(0,1fr))] text-[10px] text-zinc-600 dark:text-zinc-400 font-medium">
              {monthLabels.map((m) => (
                <span
                  key={`${m.name}-${m.colIndex}`}
                  style={{ gridColumnStart: m.colIndex + 1 }}
                  className="col-span-4 whitespace-nowrap overflow-visible"
                >
                  {m.name}
                </span>
              ))}
            </div>

            <div
              className="grid grid-cols-[repeat(53,minmax(0,1fr))] gap-x-[2px]"
              role="img"
              aria-label={graphStatus}
            >
              {loading && weeks.length === 0
                ? Array.from({ length: 53 }).map((_, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {Array.from({ length: 7 }).map((__, rowIndex) => (
                        <div
                          key={rowIndex}
                          className="aspect-square w-full animate-pulse rounded-[2px] bg-zinc-200/90 dark:bg-zinc-800/90 border border-black/5 dark:border-white/5"
                        />
                      ))}
                    </div>
                  ))
                : graphWeeks.map((week, colIndex) => (
                    <div key={colIndex} className="flex flex-col gap-[2px]">
                      {week.contributionDays.map((day) => {
                        const level = getLevel(day.contributionCount);
                        const color = contributionLevels[level];

                        return (
                          <div
                            key={day.date}
                            aria-hidden="true"
                            className={`aspect-square w-full rounded-[2px] opacity-80 outline-none transition-[opacity,transform] hover:scale-125 hover:opacity-100 dark:opacity-70 dark:hover:opacity-100 ${color.cell}`}
                            onMouseEnter={(event) => showTooltip(day, event)}
                            onMouseLeave={() => setTooltip(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-end gap-2">
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            Less active
          </span>
          <div className="flex shrink-0 items-center gap-1.5">
            {contributionLevels.map((level, index) => (
              <div
                key={index}
                aria-hidden="true"
                className={`size-2 rounded-[2px] opacity-80 dark:opacity-70 ${level.cell}`}
              />
            ))}
          </div>
          <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400">
            More active
          </span>
        </div>

        {tooltip && (
          <div
            className="pointer-events-none fixed z-[100] -translate-x-1/2 -translate-y-[calc(100%+8px)] rounded-md border border-zinc-200 bg-white px-2.5 py-1.5 text-[11px] font-medium text-zinc-700 shadow-lg shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-950 dark:text-zinc-200 dark:shadow-black/40"
            style={{ left: tooltip.x, top: tooltip.y }}
          >
            {tooltip.count} contributions on {tooltip.date}
          </div>
        )}
      </div>
    </section>
  );
}

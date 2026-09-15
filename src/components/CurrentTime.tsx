"use client";

import React, { useEffect, useState } from "react";

function TwoDots() {
  return (
    <div className="mx-0.5 sm:mx-1 flex flex-col gap-1 -translate-x-[1px] sm:-translate-x-[2px] shrink-0">
      <div className="w-[2px] h-[2px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />
      <div className="w-[2px] h-[2px] bg-zinc-400 dark:bg-zinc-500 rounded-full" />
    </div>
  );
}

export function CurrentTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    const initialTimer = window.setTimeout(() => setTime(new Date()), 0);
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => {
      window.clearTimeout(initialTimer);
      clearInterval(timer);
    };
  }, []);

  if (!time) {
    return (
      <div className="flex items-center opacity-0 h-[20px]">
        <div
          className="text-[14px] sm:text-[16px] tracking-[0.12em] text-zinc-400 dark:text-zinc-500"
          style={{ fontFamily: '"Doto", monospace', fontWeight: 700 }}
        >
          00:00:00
        </div>
      </div>
    );
  }

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className={`flex items-center h-[20px] sm:h-[22px] select-none ${className}`}>
      <div
        className="text-[14px] sm:text-[16px] tracking-[0.12em] flex items-center text-zinc-400 dark:text-zinc-500 h-full leading-none font-bold tabular-nums"
        style={{ fontFamily: '"Doto", monospace', fontWeight: 700 }}
      >
        <span>{hours}</span>
        <TwoDots />
        <span>{minutes}</span>
        <TwoDots />
        <span>{seconds}</span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BlueprintGridProps {
  className?: string;
  leftMargin?: string;
  rightMargin?: string;
}

export function BlueprintGrid({
  className,
  leftMargin = "30%",
  rightMargin = "30%",
}: BlueprintGridProps) {
  const verticalDottedMask = {
    maskImage:
      "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
    WebkitMaskImage:
      "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
  };

  const horizontalDottedMask = {
    maskImage:
      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
    WebkitMaskImage:
      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  };

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {/* Vertical Lines - Ultra-fine Micro Dots */}
      <div
        className="absolute top-0 bottom-0 w-0 border-r border-black/30 dark:border-white/[0.15] hidden md:block"
        style={{ left: leftMargin, ...verticalDottedMask }}
      />
      <div
        className="absolute top-0 bottom-0 w-0 border-r border-black/30 dark:border-white/[0.15] hidden md:block"
        style={{ right: rightMargin, ...verticalDottedMask }}
      />

      {/* Horizontal Lines - Ultra-fine Micro Dots */}
      <div
        className="absolute left-0 right-0 top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15]"
        style={horizontalDottedMask}
      />
      <div
        className="absolute left-0 right-0 top-[calc(22vh+112px)] h-0 border-b border-black/30 dark:border-white/[0.15]"
        style={horizontalDottedMask}
      />
      <div
        className="absolute left-0 right-0 top-[calc(22vh+360px)] h-0 border-b border-black/30 dark:border-white/[0.15]"
        style={horizontalDottedMask}
      />

      {/* Ultra-Tiny Solid Intersection Nodes */}
      {[
        { top: "22vh", left: leftMargin },
        { top: "22vh", right: rightMargin },
        { top: "calc(22vh + 112px)", left: leftMargin },
        { top: "calc(22vh + 112px)", right: rightMargin },
        { top: "calc(22vh + 360px)", left: leftMargin },
        { top: "calc(22vh + 360px)", right: rightMargin },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute z-10 hidden h-[3px] w-[3px] rounded-full bg-black/60 dark:bg-white/[0.4] md:block"
          style={{
            top: pos.top,
            left: pos.left,
            right: pos.right,
            transform: `translate(${pos.right ? "50%" : "-50%"}, -50%)`,
          }}
        />
      ))}
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BlueprintGridProps {
  className?: string;
}

export function BlueprintGrid({ className }: BlueprintGridProps) {
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
        "pointer-events-none absolute inset-0 z-10 h-full w-full",
        className
      )}
      aria-hidden="true"
    >
      {/* Vertical Lines - Ultra-fine Micro Dots along container left and right edges */}
      <div
        className="absolute top-0 bottom-0 left-0 w-0 border-r border-black/30 dark:border-white/[0.15] hidden md:block pointer-events-none"
        style={verticalDottedMask}
      />
      <div
        className="absolute top-0 bottom-0 right-0 w-0 border-r border-black/30 dark:border-white/[0.15] hidden md:block pointer-events-none"
        style={verticalDottedMask}
      />

      {/* Horizontal Line - 22vh Baseline spanning full viewport width */}
      <div
        className="absolute left-[-100vw] right-[-100vw] top-[22vh] h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none"
        style={horizontalDottedMask}
      />

      {/* Ultra-Tiny Solid Intersection Nodes at 22vh on the left and right guidelines */}
      <div
        className="absolute top-[22vh] left-0 z-20 hidden h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 dark:bg-white/[0.4] md:block pointer-events-none"
      />
      <div
        className="absolute top-[22vh] right-0 z-20 hidden h-[3px] w-[3px] translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 dark:bg-white/[0.4] md:block pointer-events-none"
      />
    </div>
  );
}

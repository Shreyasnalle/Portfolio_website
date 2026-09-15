import React from "react";
import { cn } from "@/lib/utils";

interface TextureOverlayProps {
  lines?: number;
  opacity?: number;
  className?: string;
}

export function TextureOverlay({
  lines = 3,
  opacity,
  className,
}: TextureOverlayProps) {
  const horizontalDottedMask = {
    maskImage:
      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
    WebkitMaskImage:
      "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
  };

  // Fixed Y positions for exactly 3 lines in a 24px gap (at 6px, 12px, 18px)
  const yPositions =
    lines === 3
      ? [6, 12, 18]
      : Array.from({ length: lines }, (_, i) => ((i + 1) * 24) / (lines + 1));

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 w-full overflow-visible",
        className
      )}
      style={opacity !== undefined ? { opacity } : undefined}
      aria-hidden="true"
    >
      {/* Mask strips to cover BlueprintGrid's continuous background vertical dots within this gap */}
      <div
        className="absolute top-0 bottom-0 bg-white dark:bg-[#09090b] hidden md:block pointer-events-none z-0"
        style={{ left: "-2px", width: "4px" }}
      />
      <div
        className="absolute top-0 bottom-0 bg-white dark:bg-[#09090b] hidden md:block pointer-events-none z-0"
        style={{ right: "-2px", width: "4px" }}
      />

      {/* Horizontal dotted guideline lines */}
      {yPositions.map((y) => (
        <div
          key={`line-${y}`}
          className="absolute left-0 right-0 h-0 border-b border-black/30 dark:border-white/[0.15] z-10"
          style={{ top: `${y}px`, ...horizontalDottedMask }}
        />
      ))}

      {/* Exactly 3 dots on the left guideline and 3 dots on the right guideline at the exact same Y lines */}
      {yPositions.map((y) => (
        <React.Fragment key={`dots-${y}`}>
          <div
            className="absolute hidden h-[1.5px] w-[1.5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 dark:bg-white/30 md:block pointer-events-none z-20"
            style={{ left: "0px", top: `${y}px` }}
          />
          <div
            className="absolute hidden h-[1.5px] w-[1.5px] translate-x-1/2 -translate-y-1/2 rounded-full bg-black/40 dark:bg-white/30 md:block pointer-events-none z-20"
            style={{ right: "0px", top: `${y}px` }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}


import React from "react";
import { cn } from "@/lib/utils";

interface DottedDividerProps {
  className?: string;
  fullWidth?: boolean;
  showNodes?: boolean;
}

export function DottedDivider({
  className,
  fullWidth = true,
  showNodes = true,
}: DottedDividerProps) {
  return (
    <div className="relative h-0 w-full">
      {/* Horizontal Micro-Dotted Line */}
      <div
        className={cn(
          "h-0 border-b border-black/30 dark:border-white/[0.15] pointer-events-none",
          fullWidth ? "absolute left-[-100vw] right-[-100vw]" : "w-full",
          className
        )}
        style={{
          maskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
          WebkitMaskImage:
            "repeating-linear-gradient(to right, black 0, black 1px, transparent 1px, transparent 6px)",
        }}
        aria-hidden="true"
      />

      {/* Solid Intersection Node Dots at the Left & Right Guidelines */}
      {showNodes && (
        <>
          <div
            className="absolute left-0 top-0 z-10 hidden h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 dark:bg-white/[0.4] md:block pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute right-0 top-0 z-10 hidden h-[3px] w-[3px] translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 dark:bg-white/[0.4] md:block pointer-events-none"
            aria-hidden="true"
          />
        </>
      )}
    </div>
  );
}

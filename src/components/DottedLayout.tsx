"use client";

import React from "react";
import { DottedBackground } from "@/components/DottedBackground";
import { BlueprintGrid } from "@/components/BlueprintGrid";
import { cn } from "@/lib/utils";

interface DottedLayoutProps {
  children?: React.ReactNode;
  className?: string;
  showBlueprintGrid?: boolean;
  showDotMatrix?: boolean;
}

export function DottedLayout({
  children,
  className,
  showBlueprintGrid = true,
  showDotMatrix = true,
}: DottedLayoutProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-x-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-100",
        className
      )}
    >
      {/* Background Interactive Dot Matrix */}
      {showDotMatrix && <DottedBackground />}

      {/* Blueprint Grid Lines & Micro Dots */}
      {showBlueprintGrid && <BlueprintGrid />}

      {/* Page Content Container */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

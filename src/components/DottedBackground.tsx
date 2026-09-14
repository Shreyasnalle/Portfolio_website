"use client";

import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface DottedBackgroundProps {
  className?: string;
  dotSize?: number;
  gap?: number;
  spotlightRadius?: number;
  enableSpotlight?: boolean;
}

export function DottedBackground({
  className,
  dotSize = 1,
  gap = 16,
  spotlightRadius = 260,
  enableSpotlight = true,
}: DottedBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableSpotlight) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [enableSpotlight]);

  return (
    <div
      ref={containerRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full overflow-hidden", className)}
      aria-hidden="true"
    >
      {/* Base ambient dots */}
      <div
        className="absolute inset-0 h-full w-full text-zinc-400 opacity-25 transition-opacity duration-500 dark:text-zinc-600 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor ${dotSize}px, transparent ${dotSize}px)`,
          backgroundSize: `${gap}px ${gap}px`,
          backgroundPosition: "center",
          maskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, transparent 100%)",
        }}
      />

      {/* Dynamic cursor spotlight revealing brighter dots */}
      {enableSpotlight && (
        <div
          className="absolute inset-0 h-full w-full text-zinc-700 transition-opacity duration-700 ease-out dark:text-zinc-200"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor ${dotSize + 0.3}px, transparent ${dotSize + 0.3}px)`,
            backgroundSize: `${gap}px ${gap}px`,
            backgroundPosition: "center",
            opacity: isHovering ? 0.45 : 0,
            maskImage: `radial-gradient(${spotlightRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
            WebkitMaskImage: `radial-gradient(${spotlightRadius}px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          }}
        />
      )}
    </div>
  );
}

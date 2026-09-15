"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`h-7 w-7 rounded-full border border-black/10 dark:border-white/15 ${className}`} />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex h-7 w-7 items-center justify-center rounded-full border border-black/15 bg-zinc-50/50 text-zinc-600 transition-colors hover:text-black hover:border-black/30 hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:text-white dark:hover:border-white/30 dark:hover:bg-zinc-800 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)] ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}

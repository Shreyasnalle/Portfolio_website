"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { flushSync } from "react-dom";
import { playSound } from "@/lib/sound-engine";
import { click003Sound } from "@/lib/click-003";

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => void;
};

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

  const toggleTheme = () => {
    void playSound(click003Sound.dataUri, { volume: 0.5 });
    const nextTheme = isDark ? "light" : "dark";
    const transitionDocument = document as ViewTransitionDocument;

    if (!transitionDocument.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    transitionDocument.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });
    });
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`flex h-7 w-7 items-center justify-center rounded-full border border-black/15 bg-zinc-50/50 text-zinc-600 transition-colors hover:text-black hover:border-black/30 hover:bg-zinc-100 dark:border-white/15 dark:bg-zinc-900/50 dark:text-zinc-400 dark:hover:text-white dark:hover:border-white/30 dark:hover:bg-zinc-800 cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.04)] active:scale-95 transition-transform duration-150 ${className}`}
      aria-label="Toggle theme"
      aria-pressed={isDark}
    >
      {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}

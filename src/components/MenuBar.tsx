"use client";

import React from "react";
import { ThemeToggle } from "@/components/ThemeToggle";

interface MenuBarProps {
  className?: string;
}

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Open Source", href: "#opensource" },
];

export function MenuBar({ className = "" }: MenuBarProps) {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", href);
    }
  };

  return (
    <div
      className={`relative flex w-full items-center justify-between px-4 py-2.5 transition-colors duration-300 ${className}`}
    >
      <nav className="flex items-center justify-start gap-2.5 text-xs sm:text-sm font-medium">
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            {index > 0 && (
              <span
                className="text-zinc-300 dark:text-zinc-700 select-none font-normal"
                aria-hidden="true"
              >
                |
              </span>
            )}
            <a
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="text-zinc-600 transition-colors duration-200 hover:text-black dark:text-zinc-400 dark:hover:text-white cursor-pointer"
            >
              {item.name}
            </a>
          </React.Fragment>
        ))}
      </nav>

      {/* Theme Toggle in the right corner of MenuBar */}
      <div className="shrink-0">
        <ThemeToggle />
      </div>
    </div>
  );
}

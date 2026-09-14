"use client";

import React from "react";
import Link from "next/link";

interface MenuBarProps {
  className?: string;
}

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Open Source", href: "#opensource" },
  { name: "Tech Stack", href: "#skills" },
  { name: "Hackathons", href: "#hackathons" },
];

export function MenuBar({ className = "" }: MenuBarProps) {
  return (
    <div
      className={`relative flex w-full items-center bg-transparent py-3.5 transition-colors duration-300 ${className}`}
    >
      <nav className="flex w-full items-center justify-between px-2 sm:px-4 text-xs sm:text-sm font-medium">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-zinc-600 transition-colors duration-200 hover:text-black dark:text-zinc-400 dark:hover:text-white"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

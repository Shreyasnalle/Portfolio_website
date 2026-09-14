"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Code,
  Globe,
  Layers,
  Award,
} from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@/components/ui/command";

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="relative group cursor-pointer transition-all duration-300 active:scale-95"
        aria-label="Open command palette"
      >
        {/* Outer border wrapper */}
        <div className="absolute -inset-[4.5px] border border-black/5 dark:border-white/5 rounded-[9px] pointer-events-none transition-colors duration-300 group-hover:border-black/10 dark:group-hover:border-white/10" />

        <div className="relative flex items-center gap-1.5 px-3 py-1 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[5px] text-[11px] font-medium transition-all duration-300 border border-black/5 dark:border-white/5 shadow-sm shadow-black/20 dark:shadow-lg dark:shadow-black/80 font-mono">
          <span className="leading-none mt-[0.5px]">⌘</span>
          <span className="leading-none mt-[0.5px]">K</span>
        </div>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center gap-4 p-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
            <LayoutDashboard className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              Navigation Menu
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Quickly jump to sections or actions
            </p>
          </div>
        </div>

        <CommandInput placeholder="Search for actions..." />

        <CommandList className="p-2">
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Sections">
            <CommandItem
              onSelect={() => runCommand(() => (window.location.hash = "#about"))}
              className="rounded-lg py-3 cursor-pointer"
            >
              <FileText className="mr-2 h-4 w-4 text-zinc-500" />
              <span>About</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => (window.location.hash = "#projects"))
              }
              className="rounded-lg py-3 cursor-pointer"
            >
              <Code className="mr-2 h-4 w-4 text-zinc-500" />
              <span>Projects</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => (window.location.hash = "#opensource"))
              }
              className="rounded-lg py-3 cursor-pointer"
            >
              <Globe className="mr-2 h-4 w-4 text-zinc-500" />
              <span>Open Source</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => (window.location.hash = "#skills"))
              }
              className="rounded-lg py-3 cursor-pointer"
            >
              <Layers className="mr-2 h-4 w-4 text-zinc-500" />
              <span>Tech Stack</span>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => (window.location.hash = "#hackathons"))
              }
              className="rounded-lg py-3 cursor-pointer"
            >
              <Award className="mr-2 h-4 w-4 text-zinc-500" />
              <span>Hackathons</span>
            </CommandItem>
          </CommandGroup>

          <CommandGroup heading="Theme">
            <CommandItem
              onSelect={() => runCommand(() => setTheme("light"))}
              className="rounded-lg py-3 cursor-pointer"
            >
              <span>Light Theme</span>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => setTheme("dark"))}
              className="rounded-lg py-3 cursor-pointer"
            >
              <span>Dark Theme</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

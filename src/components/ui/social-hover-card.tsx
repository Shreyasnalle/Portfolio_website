"use client";

import React, { useState } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SocialProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  stats: {
    label: string;
    value: string | number;
  }[];
}

const socialProfiles: Record<string, SocialProfile> = {
  GitHub: {
    name: "Shreyas Nalle",
    handle: "shreyasnalle",
    avatar: "/pfp.jpg",
    bio: "Applied AI Engineer • Building production AI software",
    location: "India",
    stats: [
      { value: "32", label: "Repositories" },
      { value: "120", label: "Followers" },
    ],
  },
  Twitter: {
    name: "Shreyas Nalle",
    handle: "@shreyasnalle",
    avatar: "/pfp.jpg",
    bio: "Applied AI • Building real-world software applications",
    location: "India",
    stats: [
      { value: "180", label: "Following" },
      { value: "450", label: "Followers" },
    ],
  },
  LinkedIn: {
    name: "Shreyas Nalle",
    handle: "in/shreyasnalle",
    avatar: "/pfp.jpg",
    bio: "Applied AI & Production Software Applications",
    location: "India",
    stats: [
      { value: "500+", label: "Connections" },
    ],
  },
  Discord: {
    name: "Shreyas Nalle",
    handle: "shreyasnalle",
    avatar: "/pfp.jpg",
    bio: "Building, learning, and sharing.",
    location: "",
    stats: [],
  },
};

interface SocialHoverCardProps {
  socialName: string;
  children: React.ReactNode;
}

export default function SocialHoverCard({ socialName, children }: SocialHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const profile = socialProfiles[socialName];

  if (!profile) {
    return <>{children}</>;
  }

  return (
    <HoverCard.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={80}
      closeDelay={120}
    >
      <HoverCard.Trigger asChild>
        <span className="inline-block">{children}</span>
      </HoverCard.Trigger>
      <AnimatePresence>
        {isOpen && (
          <HoverCard.Portal forceMount>
            <HoverCard.Content
              asChild
              forceMount
              side="bottom"
              align="center"
              sideOffset={8}
              className="z-50 select-none outline-none"
            >
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.985 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 3, scale: 0.985 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "w-[230px] sm:w-[250px] rounded-xl shadow-2xl backdrop-blur-md overflow-hidden",
                  "bg-white/95 dark:bg-[#0c0c0e]/95 border border-black/5 dark:border-white/5",
                  "text-zinc-900 dark:text-zinc-100 select-none"
                )}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-black/5 dark:border-white/10 bg-zinc-100 dark:bg-zinc-900">
                        <Image
                          src={profile.avatar}
                          alt={profile.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {socialName === "Discord" && (
                        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-[#0c0c0e] bg-green-500 shadow-sm" />
                      )}
                    </div>

                    <div className="flex flex-col min-w-0">
                      <h3 className="text-[13.5px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 truncate leading-tight">
                        {profile.name}
                      </h3>
                      <span className="text-[11.5px] mt-0.5 leading-none text-zinc-400 dark:text-zinc-500 font-mono">
                        {profile.handle}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <p className="text-[12px] leading-relaxed text-zinc-800 dark:text-zinc-300">
                      {profile.bio}
                    </p>
                  </div>

                  {profile.location && (
                    <div className="mt-2.5 flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span className="text-[10.5px] text-zinc-400 dark:text-zinc-500">
                        {profile.location}
                      </span>
                    </div>
                  )}

                  {profile.stats && profile.stats.length > 0 && (
                    <div className="mt-3.5 flex items-center gap-5 text-[12px] text-zinc-400 dark:text-zinc-500 pt-3 border-t border-black/5 dark:border-white/5">
                      {profile.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="font-extrabold text-zinc-950 dark:text-zinc-100">
                            {stat.value}
                          </span>
                          <span className="text-zinc-400 dark:text-zinc-500">
                            {stat.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </HoverCard.Content>
          </HoverCard.Portal>
        )}
      </AnimatePresence>
    </HoverCard.Root>
  );
}

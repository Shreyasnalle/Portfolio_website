"use client";

import React, { useState, useEffect } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface SocialProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  location: string;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

const defaultSocialProfiles: Record<string, SocialProfile> = {
  GitHub: {
    name: "Shreyas Nalle",
    handle: "Shreyasnalle",
    avatar: "https://avatars.githubusercontent.com/u/179994405?v=4",
    bio: "Computer Science 3rd year student. Seeing AI and tech reshaping the world interests me.",
    location: "India",
    stats: [
      { label: "Repositories", value: 15 },
      { label: "Followers", value: 4 },
    ],
  },
  Twitter: {
    name: "Shreyas Nalle",
    handle: "@ShreyasNalle",
    avatar: "https://unavatar.io/x/ShreyasNalle",
    bio: "Applied AI • CS Student • Building real-world software applications",
    location: "India",
    stats: [],
  },
  X: {
    name: "Shreyas Nalle",
    handle: "@ShreyasNalle",
    avatar: "https://unavatar.io/x/ShreyasNalle",
    bio: "Applied AI • CS Student • Building real-world software applications",
    location: "India",
    stats: [],
  },
  LinkedIn: {
    name: "Shreyas Nalle",
    handle: "in/shreyas-nalle-0697bb371",
    avatar: "https://unavatar.io/linkedin/shreyas-nalle-0697bb371",
    bio: "Computer Science Student • Applied AI & Production Engineering",
    location: "India",
    stats: [],
  },
};

interface SocialHoverCardProps {
  socialName: string;
  children: React.ReactNode;
}

export default function SocialHoverCard({
  socialName,
  children,
}: SocialHoverCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState<SocialProfile>(
    () => defaultSocialProfiles[socialName] || defaultSocialProfiles.GitHub
  );
  const [hasFetched, setHasFetched] = useState(false);

  // Fetch real-time live social profile data
  useEffect(() => {
    if (!isOpen || hasFetched) return;

    let isMounted = true;
    async function fetchLiveProfile() {
      try {
        const res = await fetch("/api/social");
        if (res.ok) {
          const data = await res.json();
          const targetKey = socialName === "X" ? "Twitter" : socialName;
          if (isMounted && data && data[targetKey]) {
            setProfile(data[targetKey]);
            setHasFetched(true);
          }
        }
      } catch (err) {
        console.error("Failed to load real-time social data:", err);
      }
    }

    fetchLiveProfile();

    return () => {
      isMounted = false;
    };
  }, [isOpen, hasFetched, socialName]);

  if (socialName === "Gmail") {
    return (
      <HoverCard.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        openDelay={60}
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
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "px-3.5 py-2 rounded-lg shadow-xl overflow-hidden",
                    "bg-white dark:bg-[#0c0c0e] border border-black/10 dark:border-white/10",
                    "text-zinc-900 dark:text-zinc-100 select-none shadow-[0_12px_28px_rgba(0,0,0,0.15)] dark:shadow-[0_16px_32px_rgba(0,0,0,0.7)]"
                  )}
                >
                  <span className="text-[12px] sm:text-[13px] font-mono text-zinc-800 dark:text-zinc-200 select-all">
                    shreyas.nalle7@gmail.com
                  </span>
                </motion.div>
              </HoverCard.Content>
            </HoverCard.Portal>
          )}
        </AnimatePresence>
      </HoverCard.Root>
    );
  }

  const currentProfile = profile || defaultSocialProfiles[socialName];
  if (!currentProfile) {
    return <>{children}</>;
  }

  return (
    <HoverCard.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      openDelay={60}
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
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "w-[245px] sm:w-[265px] rounded-xl shadow-2xl overflow-hidden",
                  "bg-white dark:bg-[#0c0c0e] border border-black/10 dark:border-white/10",
                  "text-zinc-900 dark:text-zinc-100 select-none shadow-[0_16px_36px_rgba(0,0,0,0.18)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
                )}
              >
                {/* Unified Flat Layout (Same as GitHub for all cards, no banner) */}
                <div className="p-4">
                  {/* Top Row: Avatar & Name */}
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-black/10 dark:border-white/15 bg-zinc-100 dark:bg-zinc-900">
                        <img
                          src={currentProfile.avatar}
                          alt={currentProfile.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://avatars.githubusercontent.com/u/179994405?v=4";
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-[13.5px] font-bold tracking-tight text-zinc-950 dark:text-zinc-50 truncate leading-tight">
                          {currentProfile.name}
                        </h3>
                        {(socialName === "Twitter" || socialName === "X") && (
                          <svg
                            viewBox="0 0 24 24"
                            className="w-[13.5px] h-[13.5px] text-[#1d9bf0] fill-current shrink-0"
                          >
                            <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.99-3.818-3.99-.48 0-.94.1-1.348.27C14.825 2.515 13.512 1.5 12 1.5s-2.825 1.015-3.422 2.28c-.408-.17-.867-.27-1.348-.27-2.108 0-3.818 1.78-3.818 3.99 0 .495.084.965.238 1.4-1.273.65-2.148 2.02-2.148 3.6 0 1.58.875 2.95 2.148 3.6-.154.435-.238.905-.238 1.4 0 2.21 1.71 3.99 3.818 3.99.48 0 .94-.1 1.348-.27.597 1.265 1.91 2.28 3.422 2.28s2.825-1.015 3.422-2.28c.408.17.867.27 1.348.27 2.108 0 3.818-1.78 3.818-3.99 0-.495-.084-.965-.238-1.4 1.273-.65 2.148-2.02 2.148-3.6zm-12.72 3.28L6.47 12.5c-.39-.39-.39-1.03 0-1.42s1.02-.39 1.41 0l2.2 2.2 5.09-5.09c.39-.39 1.03-.39 1.42 0s.39 1.03 0 1.42l-5.8 5.8c-.2.2-.46.3-.71.3s-.51-.1-.71-.3z" />
                          </svg>
                        )}
                      </div>
                      <span className="text-[11.5px] mt-0.5 leading-none text-zinc-400 dark:text-zinc-500 font-mono">
                        {currentProfile.handle}
                      </span>
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div className="mt-3">
                    <p className="text-[12px] leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {currentProfile.bio}
                    </p>
                  </div>

                  {/* Location Section */}
                  {currentProfile.location && (
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
                      <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {currentProfile.location}
                      </span>
                    </div>
                  )}

                  {/* Stats Section (Rendered exclusively for GitHub) */}
                  {socialName === "GitHub" && currentProfile.stats && currentProfile.stats.length > 0 && (
                    <div className="mt-3.5 flex items-center gap-5 text-[12px] text-zinc-500 dark:text-zinc-400 pt-3 border-t border-black/5 dark:border-white/10">
                      {currentProfile.stats.map((stat, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span className="font-extrabold text-zinc-950 dark:text-zinc-100">
                            {stat.value}
                          </span>
                          <span className="text-zinc-500 dark:text-zinc-400 text-[11px]">
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

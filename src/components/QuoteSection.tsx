"use client";

import React, { useState, useEffect, useCallback } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";

const quotes = [
  "Work hard to become a better person than you were yesterday, not with the intention of getting ahead of others. Because you never truly can—there’s always a bigger fish in the pond.",
  "There is always something good to be found in negative situations. Always look for it, and stay positive.",
  "Stay focused on the present, because the only thing that truly exists is what is happening now.",
  "Grind, grind, and simply grind.",
  "Stop caring about what people say about you. Because why not?",
];

export function QuoteSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleComplete = useCallback(() => {
    // Keep the revealed quote still for 5 seconds, then transition to next quote
    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center relative py-12 px-6">
      <div className="max-w-[560px] w-full min-h-[96px] sm:min-h-[80px] flex items-center justify-center text-center">
        <blockquote className="text-[14px] sm:text-[15px] md:text-[16px] font-normal leading-relaxed text-zinc-700 dark:text-zinc-300">
          <EncryptedText
            key={currentIndex}
            text={`“${quotes[currentIndex]}”`}
            revealDelayMs={25}
            flipDelayMs={35}
            encryptedClassName="text-zinc-400 dark:text-zinc-600 font-mono not-italic"
            revealedClassName="text-zinc-700 dark:text-zinc-300 italic"
            onComplete={handleComplete}
          />
        </blockquote>
      </div>
    </div>
  );
}

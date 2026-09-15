import Image from "next/image";
import pfpImage from "@/images/pfp.jpg";
import { PixelHeading } from "@/components/ui/pixel-heading";
import { VisitorCounter } from "@/components/VisitorCounter";
import { CurrentTime } from "@/components/CurrentTime";
import SoftPillButton from "@/components/ui/soft-pill-button";

export function ProfileHeader() {
  return (
    <div className="relative flex min-h-[112px] py-4 w-full items-center justify-between gap-2 sm:gap-4 px-4 z-20">
      <div className="flex items-center gap-3 sm:gap-5 min-w-0">
        <div className="relative p-[3px] rounded-[6px] sm:rounded-[8px] border-[1.5px] border-black/30 dark:border-white/[0.15] shrink-0">
          {/* The inner image */}
          <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={pfpImage}
              alt="Profile"
              fill
              priority
              sizes="(min-width: 640px) 80px, 56px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Pixel font name, age, and Resume button */}
        <div className="flex flex-col justify-center min-w-0">
          <PixelHeading
            mode="random"
            autoPlay={true}
            cycleInterval={180}
            staggerDelay={40}
            as="h1"
            className="text-[18px] sm:text-[24px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none mb-0.5 cursor-pointer whitespace-nowrap"
          >
            Shreyas Nalle
          </PixelHeading>
          <p className="text-[13px] sm:text-[14px] font-medium text-zinc-600 dark:text-zinc-400 leading-none">20</p>
          
          <div className="mt-2.5">
            <SoftPillButton
              as="a"
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              className="px-3 py-1.5 !text-[12px] cursor-pointer inline-flex items-center"
            >
              <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                <span>Resume</span>
              </div>
            </SoftPillButton>
          </div>
        </div>
      </div>

      {/* Right side: Total Visitor Count and Live Time below it */}
      <div className="flex flex-col items-end justify-center gap-1.5 shrink-0">
        <VisitorCounter />
        <CurrentTime />
      </div>
    </div>
  );
}

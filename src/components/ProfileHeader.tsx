import Image from "next/image";
import pfpImage from "@/images/pfp.jpg";
import { PixelHeading } from "@/components/ui/pixel-heading";
import { VisitorCounter } from "@/components/VisitorCounter";
import { CurrentTime } from "@/components/CurrentTime";

export function ProfileHeader() {
  return (
    <div className="relative flex h-[112px] w-full items-center justify-between px-4 z-20">
      <div className="flex items-center gap-4 sm:gap-5">
        <div className="relative p-[3px] rounded-[6px] sm:rounded-[8px] border-[1.5px] border-black/30 dark:border-white/[0.15] shrink-0">
          {/* The inner image */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-[3px] sm:rounded-[5px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
            <Image
              src={pfpImage}
              alt="Profile"
              fill
              priority
              sizes="(min-width: 640px) 80px, 64px"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Pixel font name on the right side of the profile picture */}
        <div className="flex flex-col justify-center">
          <PixelHeading
            mode="random"
            autoPlay={true}
            cycleInterval={180}
            staggerDelay={40}
            as="h1"
            className="text-[20px] sm:text-[24px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight leading-none mb-0.5 cursor-pointer whitespace-nowrap"
          >
            Shreyas Nalle
          </PixelHeading>
          <p className="text-[13px] sm:text-[14px] font-medium text-zinc-600 dark:text-zinc-400">20</p>
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

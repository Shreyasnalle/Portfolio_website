import Image from "next/image";
import { BlueprintGrid } from "@/components/BlueprintGrid";
import { DottedDivider } from "@/components/DottedDivider";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { MenuBar } from "@/components/MenuBar";
import panoramicBanner from "@/images/panoramic_banner.webp";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-50">
      {/* Blueprint Grid Lines (Vertical Micro Dots + 22vh Baseline + Nodes) */}
      <BlueprintGrid leftMargin="30%" rightMargin="30%" />

      {/* Main Column bounded inside the 30% left & 30% right dotted lines */}
      <div className="absolute left-0 right-0 md:left-[30%] md:right-[30%] top-0 flex flex-col z-20">
        {/* Block 1: Panoramic Banner (Height 22vh) */}
        <div className="relative h-[22vh] w-full overflow-hidden bg-white dark:bg-black shadow-[0_4px_12px_rgba(2,6,23,0.04)] dark:shadow-[0_4px_12px_rgba(2,6,23,0.10)]">
          <Image
            src={panoramicBanner}
            alt="Panoramic Banner"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-center"
          />

          {/* Soft directional edge fade gradients */}
          <div className="absolute inset-x-0 bottom-0 h-4 pointer-events-none z-[5] bg-gradient-to-t from-white/40 via-white/10 to-transparent dark:from-black/35 dark:via-black/10 dark:to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-3 pointer-events-none z-20 bg-gradient-to-r from-white/40 via-white/10 to-transparent dark:from-black/25 dark:via-black/10 dark:to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-3 pointer-events-none z-20 bg-gradient-to-l from-white/40 via-white/10 to-transparent dark:from-black/25 dark:via-black/10 dark:to-transparent" />
        </div>

        {/* Gap between banner and menu bar (+5px increased to 29px) filled with dot's texture */}
        <div className="relative h-[29px] w-full overflow-hidden">
          <TextureOverlay opacity={0.6} />
        </div>

        {/* Dotted Divider above Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Menu Bar (About, Projects, Open Source, Tech Stack, Hackathons) */}
        <MenuBar />

        {/* Dotted Divider below Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl md:px-[30%]" />
    </main>
  );
}

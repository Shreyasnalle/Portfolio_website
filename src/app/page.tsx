import Image from "next/image";
import { BlueprintGrid } from "@/components/BlueprintGrid";
import { DottedDivider } from "@/components/DottedDivider";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { MenuBar } from "@/components/MenuBar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import panoramicBanner from "@/images/panoramic_banner.webp";

const lightBannerPlaceholder =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 11'%3E%3Crect width='32' height='11' fill='%23d9e5e7'/%3E%3C/svg%3E";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-zinc-900">
      {/* Blueprint Grid Lines (Vertical Micro Dots + 22vh Baseline + Nodes) */}
      <BlueprintGrid leftMargin="30%" rightMargin="30%" />

      {/* Main Column bounded inside the 30% left & 30% right dotted lines */}
      <div className="absolute left-0 right-0 md:left-[30%] md:right-[30%] top-0 flex flex-col z-20">
        {/* Block 1: Panoramic Banner (Height 22vh, exact cloned repo blur & fade values) */}
        <div className="relative h-[22vh] w-full overflow-hidden bg-white shadow-[0_4px_12px_rgba(2,6,23,0.04)]">
          <Image
            src={panoramicBanner}
            alt="Panoramic Banner"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 40vw, 100vw"
            quality={70}
            placeholder="blur"
            blurDataURL={lightBannerPlaceholder}
            className="object-cover object-center"
          />

          {/* Exact fade gradients from the cloned repo */}
          <div className="absolute inset-x-0 bottom-0 h-10 pointer-events-none z-[5] bg-gradient-to-t from-white/90 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-r from-white/90 to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-20 bg-gradient-to-l from-white/90 to-transparent" />
        </div>

        {/* Gap between banner and menu bar with exactly 3 lines of dots */}
        <div className="relative h-[24px] w-full overflow-hidden">
          <TextureOverlay opacity={0.6} />
        </div>

        {/* Dotted Divider above Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Menu Bar (About, Projects, Open Source, Tech Stack, Hackathons) */}
        <MenuBar />

        {/* Dotted Divider below Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Gap below Menu Bar with exactly 3 lines of dots (same height and dotted design) */}
        <div className="relative h-[24px] w-full overflow-hidden">
          <TextureOverlay opacity={0.6} />
        </div>

        {/* Dotted Divider above Profile Header with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Profile Block (Height 112px, exact from cloned repo) */}
        <ProfileHeader />

        {/* Dotted Divider below Profile Header with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Gap below Profile Header with exactly 3 lines of dots (same height and dotted design) */}
        <div className="relative h-[24px] w-full overflow-hidden">
          <TextureOverlay opacity={0.6} />
        </div>

        {/* Dotted Divider below the gap with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* About Section */}
        <AboutSection />

        {/* Dotted Divider below About Section */}
        <DottedDivider showNodes={true} />

        {/* Skills and Technologies Section */}
        <SkillsSection />

        {/* Dotted Divider below Skills Section */}
        <DottedDivider showNodes={true} />
      </div>

      {/* Content Container */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl md:px-[30%]" />
    </main>
  );
}

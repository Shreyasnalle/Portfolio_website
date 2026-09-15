import Image from "next/image";
import { BlueprintGrid } from "@/components/BlueprintGrid";
import { DottedDivider } from "@/components/DottedDivider";
import { TextureOverlay } from "@/components/ui/texture-overlay";
import { MenuBar } from "@/components/MenuBar";
import { ProfileHeader } from "@/components/ProfileHeader";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { OpenSourceSection } from "@/components/OpenSourceSection";
import { QuoteSection } from "@/components/QuoteSection";
import { FooterBackground } from "@/components/FooterBackground";
import { BannerWind } from "@/components/BannerWind";
import bannerImg from "@/images/banner.png";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
      {/* Main Column bounded inside responsive container */}
      <div className="relative w-full max-w-[768px] mx-auto flex flex-col z-20 pb-16">
        {/* Blueprint Grid Lines (Vertical Micro Dots + 22vh Baseline + Nodes) */}
        <BlueprintGrid />

        {/* Block 1: Panoramic Banner (Height 22vh, exact cloned repo blur & fade values) */}
        <div className="relative h-[22vh] w-full overflow-hidden bg-white dark:bg-[#09090b] shadow-[0_4px_12px_rgba(2,6,23,0.04)] dark:shadow-none">
          <Image
            src={bannerImg}
            alt="Banner"
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 768px) 768px, 100vw"
            quality={90}
            placeholder="blur"
            className="object-cover object-center"
          />

          {/* Wind animation overlay (live atmospheric breeze and wisps) */}
          <BannerWind />

          {/* Smooth perimeter fade gradients (half width, gentle fade) */}
          <div className="absolute inset-x-0 bottom-0 h-5 pointer-events-none z-[5] bg-gradient-to-t from-white/50 via-white/15 to-transparent dark:from-[#09090b]/60 dark:via-[#09090b]/20 dark:to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-4 pointer-events-none z-20 bg-gradient-to-r from-white/45 via-white/15 to-transparent dark:from-[#09090b]/60 dark:via-[#09090b]/20 dark:to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 w-4 pointer-events-none z-20 bg-gradient-to-l from-white/45 via-white/15 to-transparent dark:from-[#09090b]/60 dark:via-[#09090b]/20 dark:to-transparent" />
        </div>

        {/* Gap between banner and menu bar with exactly 3 lines of dots */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
        </div>

        {/* Dotted Divider above Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Menu Bar (About, Projects, Open Source, Tech Stack, Hackathons) */}
        <MenuBar />

        {/* Dotted Divider below Menu Bar with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Gap below Menu Bar with exactly 3 lines of dots (same height and dotted design) */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
        </div>

        {/* Dotted Divider above Profile Header with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Profile Block (Height 112px, exact from cloned repo) */}
        <ProfileHeader />

        {/* Dotted Divider below Profile Header with intersection nodes */}
        <DottedDivider showNodes={true} />

        {/* Gap below Profile Header with exactly 3 lines of dots (same height and dotted design) */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
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

        {/* Gap below Skills Section with exactly 3 lines of dots */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
        </div>

        {/* Dotted Divider above Projects Section */}
        <DottedDivider showNodes={true} />

        {/* Projects Section */}
        <ProjectsSection />

        {/* Dotted Divider below Projects Section */}
        <DottedDivider showNodes={true} />

        {/* Gap above Open Source Contribution Section */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
        </div>

        {/* Dotted Divider above Open Source Contribution Section */}
        <DottedDivider showNodes={true} />

        {/* Open Source Contribution Section */}
        <OpenSourceSection />

        {/* Dotted Divider below Open Source Contribution Section */}
        <DottedDivider showNodes={true} />

        {/* Gap above Quote Section */}
        <div className="relative h-[24px] w-full overflow-visible">
          <TextureOverlay />
        </div>

        {/* Dotted Divider above Quote Section */}
        <DottedDivider showNodes={true} />

        {/* Dynamic Encrypted Text Rotating Quotes Section */}
        <QuoteSection />

        {/* Dotted Divider below Quote Section */}
        <DottedDivider showNodes={true} />

        {/* Fading Grid Filler Dotted Block with interactive hover spotlight */}
        <div className="w-full h-[300px] relative">
          <FooterBackground />
        </div>

        {/* Closing Dotted Divider with intersection nodes */}
        <DottedDivider showNodes={true} />
      </div>
    </main>
  );
}

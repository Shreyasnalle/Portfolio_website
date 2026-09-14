import { BlueprintGrid } from "@/components/BlueprintGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-white text-zinc-900 transition-colors duration-300 dark:bg-black dark:text-zinc-50">
      {/* Blueprint Grid Lines (Vertical & Horizontal Micro Dots + Intersection Nodes) */}
      <BlueprintGrid leftMargin="30%" rightMargin="30%" />

      {/* Content Container */}
      <div className="relative z-10 mx-auto min-h-screen w-full max-w-7xl md:px-[30%]" />
    </main>
  );
}

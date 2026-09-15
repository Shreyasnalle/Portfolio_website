"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  hasPin?: boolean;
  tech: { name: string; icon?: string; label?: string }[];
}

const projects: ProjectItem[] = [
  {
    title: "VengenceUI",
    description:
      "VengenceUI helps you to build your landing page by providing you animated beautiful components",
    image: "/projects/vengenceui.png",
    hasPin: true,
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Framer Motion", icon: "framer" },
    ],
  },
  {
    title: "Scribble3D",
    description:
      "Turn your sketches into 3D objects and worlds — no 3D skills required.",
    image: "/projects/scribble3d.png",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "tldraw", icon: "tldraw" },
      { name: "Three.js", icon: "threedotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Gemini", icon: "googlegemini" },
    ],
  },
  {
    title: "Blueprint",
    description:
      "Blueprint is an AI UI builder that turns prompts into structured, production-ready interfaces.",
    image: "/projects/blueprint.png",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Prisma", icon: "prisma" },
      { name: "Bun", icon: "bun" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "LangChain", icon: "langchain" },
      { name: "RAG", label: "RAG" },
    ],
  },
  {
    title: "Inquiro",
    description:
      "Inquiro is an AI-powered search engine that helps you find information on the internet",
    image: "/projects/inquiro.png",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Radix UI", icon: "radixui" },
      { name: "Node.js", icon: "nodedotjs" },
      { name: "Gemini", icon: "googlegemini" },
      { name: "LangChain", icon: "langchain" },
      { name: "LangGraph", label: "LangGraph" },
    ],
  },
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="flex flex-col group cursor-default">
      {/* Outer Wrapper with smooth hover animation */}
      <motion.div
        className="relative w-full aspect-[1.25] sm:aspect-[1.35] rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-[#09090b]/80 shadow-sm p-3.5 pb-0 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-black/20 dark:hover:border-white/20"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        <div className="flex items-center justify-end z-10 min-h-[24px]">
          {project.hasPin && (
            <div className="w-6 h-6 rounded-[6px] bg-transparent border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17v5" />
                <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
              </svg>
            </div>
          )}
        </div>

        {/* Floating screenshot sitting directly at the bottom of the outer wrapper */}
        <motion.div
          className="absolute bottom-0 left-1/2 w-[85%] rounded-t-[10px] bg-white dark:bg-[#0a0a0a] p-0 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-8px_30px_rgba(0,0,0,0.5)] z-20 border border-black/10 dark:border-white/[0.15] border-b-0"
          variants={{
            rest: { height: "78%", y: 0, x: "-50%" },
            hover: { height: "72%", y: 4, x: "-50%" },
          }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="size-full overflow-hidden rounded-t-[9px]">
            <Image
              src={project.image}
              alt={`${project.title} preview`}
              width={600}
              height={400}
              className="size-full object-cover"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Content Area directly below the wrapper */}
      <div className="mt-4 flex flex-col px-0.5">
        <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
          {project.title}
        </h3>

        <p className="mt-2 text-[13px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Icons with tooltips */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {project.tech.map((item) => {
            const uniqueId = `${project.title}-${item.name}`;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setHoveredTech(uniqueId)}
                onMouseLeave={() => setHoveredTech(null)}
              >
                {item.icon ? (
                  <img
                    src={`https://cdn.simpleicons.org/${item.icon}/71717a`}
                    alt={item.name}
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 opacity-70 hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="px-1.5 py-0.5 rounded border border-black/30 dark:border-white/[0.15] text-[9px] text-zinc-500 dark:text-zinc-400 leading-none">
                    {item.label || item.name}
                  </span>
                )}

                <AnimatePresence>
                  {hoveredTech === uniqueId && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
                    >
                      <div className="bg-zinc-800 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 text-[10px] px-2 py-0.5 rounded shadow-xl whitespace-nowrap">
                        {item.name}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 w-full">
      {/* Header Container */}
      <div className="px-4 py-3">
        <PixelHeading
          mode="uniform"
          as="h3"
          className="text-[16px] sm:text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          Projects
        </PixelHeading>
      </div>

      {/* Dotted Divider below Projects heading */}
      <DottedDivider showNodes={true} />

      {/* Grid Container */}
      <div className="relative pt-6 pb-6 px-4">
        {/* Center Vertical Guideline */}
        <div
          className="absolute top-0 bottom-6 left-1/2 w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none -translate-x-1/2 hidden md:block"
          style={{
            maskImage:
              "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
          }}
        />

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 pb-8">
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[1]} />
        </div>

        {/* Row Divider */}
        <div className="relative w-full h-0 my-4 hidden md:block">
          <DottedDivider showNodes={true} />
          {/* Center intersection dot */}
          <div className="absolute top-0 left-1/2 w-[3px] h-[3px] rounded-full bg-black/60 dark:bg-white/[0.4] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 hidden md:block" />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 pt-4">
          <ProjectCard project={projects[2]} />
          <ProjectCard project={projects[3]} />
        </div>
      </div>

      {/* View All Button sitting directly on the bottom dotted divider line */}
      <div className="relative w-full">
        <DottedDivider showNodes={true} />
        <div className="flex justify-center -mt-[19px] pb-4 relative z-20">
          <button
            type="button"
            className="relative flex items-center gap-1.5 px-4 py-2 bg-zinc-50 hover:bg-zinc-100 dark:bg-[#09090b] dark:hover:bg-[#121214] text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 rounded-[6px] text-[13px] font-medium transition-all duration-300 border border-black/10 dark:border-white/10 shadow-sm cursor-pointer"
          >
            View All
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 text-zinc-500 transition-colors"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

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
  href?: string;
  backgroundImage?: string;
  objectFit?: string;
  hasPin?: boolean;
  tech: { name: string; icon?: string; label?: string }[];
}

const projects: ProjectItem[] = [
  {
    title: "SIMPLY",
    description:
      "An in-tab YouTube video assistant that eliminates tab switching while learning online. It retains chat history for each video. Currently working to enhance this product with GenAI and agentic features",
    image: "/projects/simply.png",
    href: "https://github.com/Shreyasnalle/SIMPLY",
    backgroundImage: "/images/background2.jpeg",
    objectFit: "object-cover object-top",
    tech: [
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "React", icon: "react" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    title: "GenAI Fraud Detection",
    description:
      "A multi GNN heterogeneous model for payment fraud detection, integrated into a continuous loop of GenAI attack generation, defense and fine-tuning.",
    image: "/projects/genai-fraud.png",
    href: "https://github.com/Shreyasnalle/Delusional",
    backgroundImage: "/images/background3.jpeg",
    objectFit: "object-cover object-top",
    tech: [
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "PyTorch", icon: "pytorch" },
      { name: "scikit-learn", icon: "scikitlearn" },
      { name: "Anaconda", icon: "anaconda" },
      { name: "React", icon: "react" },
      { name: "JavaScript", icon: "javascript" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    title: "Rampling",
    description:
      "An automated backend reliability checker with integrated agents that identify and pinpoint exact potholes in the codebase.",
    image: "/projects/rampling.png",
    href: "https://rampling.vercel.app/",
    backgroundImage: "/images/background1.jpeg",
    objectFit: "object-cover object-top",
    tech: [
      { name: "Next.js", icon: "nextdotjs" },
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwindcss" },
      { name: "Python", icon: "python" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "LangGraph", icon: "langchain" },
      { name: "LangChain", icon: "langchain" },
    ],
  },
];

function ProjectCard({ project }: { project: ProjectItem }) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const CardWrapper = project.href ? "a" : "div";
  const cardWrapperProps = project.href
    ? {
        href: project.href,
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  return (
    <div className="flex flex-col group">
      {/* Outer Wrapper with smooth hover animation */}
      <CardWrapper
        {...cardWrapperProps}
        className="relative w-full aspect-[1.25] sm:aspect-[1.35] rounded-xl border border-black/10 dark:border-white/10 bg-zinc-50/80 dark:bg-[#09090b]/80 shadow-sm p-3.5 pb-0 flex flex-col overflow-hidden transition-all duration-300 hover:shadow-md hover:border-black/20 dark:hover:border-white/20 cursor-pointer block"
      >
        <motion.div
          className="absolute inset-0 size-full"
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          {/* Background Image on Hover */}
          {project.backgroundImage && (
            <motion.div
              className="absolute inset-0 pointer-events-none z-0"
              style={{
                backgroundImage: `url('${project.backgroundImage}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              variants={{
                rest: { opacity: 0, scale: 1 },
                hover: { opacity: 1, scale: 1.05 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-black/10 dark:bg-black/30" />
            </motion.div>
          )}

          <div className="flex items-center justify-end z-10 min-h-[24px]">
            {project.href && (
              <div className="w-6 h-6 rounded-[6px] bg-white/70 dark:bg-zinc-900/70 backdrop-blur-sm border border-black/10 dark:border-white/15 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:border-black/20 dark:group-hover:border-white/30 transition-all z-20">
                <svg
                  viewBox="0 0 24 24"
                  className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
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
            <div className="size-full overflow-hidden rounded-t-[9px] relative">
              <Image
                src={project.image}
                alt={`${project.title} preview`}
                width={600}
                height={400}
                className={`size-full ${project.objectFit || "object-cover object-top"}`}
              />
            </div>
          </motion.div>
        </motion.div>
      </CardWrapper>

      {/* Content Area directly below the wrapper */}
      <div className="mt-4 flex flex-col px-0.5">
        {project.href ? (
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-flex items-center gap-1.5 w-fit"
          >
            <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight group-hover/title:text-zinc-600 dark:group-hover/title:text-zinc-300 transition-colors">
              {project.title}
            </h3>
          </a>
        ) : (
          <h3 className="text-[15px] font-bold text-zinc-900 dark:text-zinc-100 leading-tight">
            {project.title}
          </h3>
        )}

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
          mode="random"
          as="h1"
          className="text-[16px] sm:text-[22px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          Projects
        </PixelHeading>
      </div>

      {/* Dotted Divider below Projects heading */}
      <DottedDivider showNodes={true} />

      {/* Grid Container */}
      <div className="relative pt-6 pb-6">
        {/* Center Vertical Guideline */}
        <div
          className="absolute top-0 bottom-0 left-1/2 w-0 border-r border-black/30 dark:border-white/[0.15] pointer-events-none -translate-x-1/2 hidden md:block"
          style={{
            maskImage:
              "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
            WebkitMaskImage:
              "repeating-linear-gradient(to bottom, black 0, black 1px, transparent 1px, transparent 6px)",
          }}
        />

        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 px-4 pb-8">
          <ProjectCard project={projects[0]} />
          <ProjectCard project={projects[1]} />
        </div>

        {/* Row Divider spanning full column width */}
        <div className="relative w-full h-0 my-4 hidden md:block">
          <DottedDivider showNodes={true} />
          {/* Center intersection dot */}
          <div
            className="absolute top-0 left-1/2 z-40 hidden h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/60 dark:bg-white/[0.4] md:block pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 px-4 pt-0 md:pt-4">
          <ProjectCard project={projects[2]} />
        </div>
      </div>
    </section>
  );
}

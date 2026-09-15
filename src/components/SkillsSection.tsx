import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";
import { GithubGraph } from "@/components/GithubGraph";

const skills = [
  { name: "HTML5", icon: "html5" },
  { name: "CSS3", icon: "css3" },
  { name: "JavaScript", icon: "javascript" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TailwindCSS", icon: "tailwindcss" },
  { name: "shadcn/ui", icon: "shadcnui" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Express.js", icon: "express" },
  { name: "Python", icon: "python" },
  { name: "FastAPI", icon: "fastapi" },
  { name: "MySQL", icon: "mysql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "LangChain", icon: "langchain" },
  { name: "LangGraph", icon: "langchain" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "Jupyter", icon: "jupyter" },
  { name: "Supabase", icon: "supabase" },
  { name: "Render", icon: "render" },
  { name: "Railway", icon: "railway" },
  { name: "Vercel", icon: "vercel" },
  { name: "Conda", icon: "anaconda" },
  { name: "Anaconda", icon: "anaconda" },
  { name: "Git", icon: "git" },
  { name: "Docker", icon: "docker" },
  { name: "Redis", icon: "redis" },
];

export function SkillsSection() {
  return (
    <section id="skills" className="scroll-mt-24 w-full">
      {/* Header Container */}
      <div className="px-4 py-3">
        <PixelHeading
          mode="uniform"
          as="h3"
          className="text-[16px] sm:text-[18px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          Skills and Technologies
        </PixelHeading>
      </div>

      {/* Dotted Divider below heading with intersection nodes */}
      <DottedDivider showNodes={true} />

      {/* Clean Monochrome Cards Grid (Matching Cloned Repo) */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap gap-2 w-full">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="grow flex items-center justify-center gap-2 px-3 py-1.5 bg-zinc-100/90 hover:bg-zinc-200/80 dark:bg-[#0a0a0a] dark:hover:bg-[#121214] border border-black/15 dark:border-white/[0.15] rounded-[6px] transition-colors duration-200 cursor-default shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
            >
              <img
                src={
                  skill.icon.startsWith("http")
                    ? skill.icon
                    : `https://cdn.simpleicons.org/${skill.icon}/71717a`
                }
                alt={skill.name}
                width={14}
                height={14}
                loading="lazy"
                decoding="async"
                className={`h-3.5 w-3.5 opacity-80 ${
                  skill.icon.startsWith("http") ? "rounded-sm grayscale" : ""
                }`}
              />
              <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-300">
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Dotted Divider above GitHub Activity with intersection nodes */}
      <DottedDivider showNodes={true} />

      {/* GitHub Activity Heatmap */}
      <GithubGraph />
    </section>
  );
}

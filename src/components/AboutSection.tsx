import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";
import SoftPillButton from "@/components/ui/soft-pill-button";
import SocialHoverCard from "@/components/ui/social-hover-card";
import { GithubGraph } from "@/components/GithubGraph";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 w-full">
      {/* Header Container with padding matching grid */}
      <div className="px-4 py-3">
        <PixelHeading
          mode="uniform"
          as="h2"
          className="text-[18px] sm:text-[20px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight"
        >
          About
        </PixelHeading>
      </div>

      {/* Dotted Divider below About heading */}
      <DottedDivider showNodes={false} />

      {/* Content Container */}
      <div className="px-4 py-4 flex flex-col gap-3 font-sans">
        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          1. I work around Applied AI, building production ready AI integrated software applications. Cloud models are not efficient enough for various use cases, curating it to work specific production software applications is what I work on. Apart from building ai applications I work on solving real world models as well.
        </p>
        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          2. Tech is evolving everyday, adapting with it is the real challenge right now.
        </p>
        <p className="text-[14px] sm:text-[15px] text-zinc-600 dark:text-zinc-300 leading-relaxed">
          3. Apart for tech and coding I am into finance and nature.
        </p>

        {/* Connect Section */}
        <div id="contact" className="mt-4">
          <PixelHeading
            mode="uniform"
            as="h3"
            className="text-[16px] sm:text-[18px] font-bold text-zinc-800 dark:text-zinc-100 tracking-tight mb-3"
          >
            Connect
          </PixelHeading>

          <div className="flex flex-wrap gap-2">
            {[
              {
                name: "GitHub",
                icon: (
                  <path
                    d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                ),
              },
              {
                name: "Twitter",
                icon: (
                  <path
                    d="M4 4l11.733 16h4.267l-11.733 -16zM4 20l6.768 -6.768M20 4l-6.768 6.768"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                ),
              },
              {
                name: "LinkedIn",
                icon: (
                  <path
                    d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                  />
                ),
              },
              {
                name: "Discord",
                icon: (
                  <path
                    d="M18 5c-1.5-.7-3.2-1-5-1s-3.5.3-5 1c-1.5 3.5-2.5 8-2.5 8 1.5 2 4.5 3 7.5 3s6-1 7.5-3c0 0-1-4.5-2.5-8zM9 13c-.8 0-1.5-.7-1.5-1.5S8.2 10 9 10s1.5.7 1.5 1.5S9.8 13 9 13zm6 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5 1.5.7 1.5 1.5-.7 1.5-1.5 1.5z"
                    fill="currentColor"
                  />
                ),
              },
            ].map((social, i) => (
              <SocialHoverCard key={i} socialName={social.name}>
                <SoftPillButton
                  variant="secondary"
                  className="px-3 py-1.5 !text-[12px] cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5">
                      {social.icon}
                    </svg>
                    <span>{social.name}</span>
                  </div>
                </SoftPillButton>
              </SocialHoverCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

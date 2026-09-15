import { PixelHeading } from "@/components/ui/pixel-heading";
import { DottedDivider } from "@/components/DottedDivider";
import SoftPillButton from "@/components/ui/soft-pill-button";
import SocialHoverCard from "@/components/ui/social-hover-card";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 w-full">
      {/* Header Container with padding matching grid */}
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <PixelHeading
          mode="random"
          as="h1"
          className="text-[16px] sm:text-[22px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          About
        </PixelHeading>
      </div>

      {/* Dotted Divider below About heading */}
      <DottedDivider showNodes={true} />

      {/* Content Container */}
      <div className="px-4 py-4 flex flex-col gap-3 font-sans">
        <ul className="text-[14px] sm:text-[15px] text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-2">
          <li className="flex gap-1.5">
            <span className="text-zinc-500 dark:text-zinc-400">•</span>
            <span>I work in Applied AI, building production ready, AI integrated software applications. Models are not always efficient enough for specific use cases, so I focus on adapting and optimizing AI to work effectively within production software applications. Apart from building AI applications, I also work on training models.</span>
          </li>
          <li className="flex gap-1.5">
            <span className="text-zinc-500 dark:text-zinc-400">•</span>
            <span>My focus is mainly on backend, AI and system design.</span>
          </li>
          <li className="flex gap-1.5">
            <span className="text-zinc-500 dark:text-zinc-400">•</span>
            <span>Apart for tech and coding I am into finance and nature.</span>
          </li>
        </ul>
      </div>

      {/* Dotted Divider above Connect section with intersection nodes */}
      <DottedDivider showNodes={true} />

      {/* Connect Header Container */}
      <div id="contact" className="px-4 py-3">
        <PixelHeading
          mode="uniform"
          as="h2"
          className="text-[16px] sm:text-[15px] font-bold text-zinc-900 dark:text-zinc-100 tracking-tight"
        >
          Connect
        </PixelHeading>
      </div>

      {/* Dotted Divider below Connect heading with intersection nodes */}
      <DottedDivider showNodes={true} />

      {/* Connect Links Container */}
      <div className="px-4 py-4">
        <div className="flex flex-wrap gap-2">
          {[
            {
              name: "GitHub",
              href: "https://github.com/Shreyasnalle",
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
              name: "X",
              href: "https://x.com/ShreyasNalle",
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
              href: "https://linkedin.com/in/shreyas-nalle-0697bb371/",
              icon: (
                <path
                  d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2z"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              ),
            },
          ].map((social, i) => (
            <SocialHoverCard key={i} socialName={social.name}>
              <SoftPillButton
                as="a"
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                className="px-3 py-1.5 !text-[12px] cursor-pointer inline-flex items-center"
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

          {/* Direct Gmail compose button with hover card */}
          <SocialHoverCard socialName="Gmail">
            <SoftPillButton
              as="a"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=shreyas.nalle7@gmail.com"
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
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Gmail</span>
              </div>
            </SoftPillButton>
          </SocialHoverCard>
        </div>
      </div>
    </section>
  );
}

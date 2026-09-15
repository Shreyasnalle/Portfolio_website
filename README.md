# Shreyas Nalle

Welcome to a small corner of internet, which speaks about me.

---

## Key Features

- **Blueprint Architectural Grid System**: Ultra-fine vertical micro-dotted guidelines, 22vh baseline, and solid intersection node dots that dynamically frame the central layout column.
- **Responsive & Responsive Container Math**: 100% mathematical container binding (`max-w-[768px] mx-auto`) ensuring zero layout squishing, clipping, or horizontal page wobbles on mobile (320px+), tablet, laptop, desktop, and 4K displays.
- **Web Audio API Theme Engine**: Smooth circular clip-path dark/light mode transitions paired with crisp synthesized Web Audio click sound effects.
- **Profile & Resume Integration**: Live local time clock, visitor counter with session deduplication, and direct one-click link to Google Docs Resume.
- **Dynamic Projects Gallery**: Project showcase cards featuring hover background previews, spring-animated screenshot lifts, direct GitHub/live links, and technology stack tooltips.
- **Tech Stack Badge Matrix**: Interactive monochrome badge grid highlighting competencies in Applied AI, Full-Stack, Systems, and AI/ML frameworks.
- **GitHub Activity Heatmap**: Real-time contribution heatmap fetched dynamically from GitHub with interactive hover tooltips and mobile overflow touch scrolling.
- **Open Source Contributions**: Animated tabbed list for tracking Merged, Open, and Closed pull requests.
- **Encrypted Text Quotes**: Cyberpunk/cipher text reveal animation for rotating inspirational quotes with a 5-second hold state between transitions.
- **Spotlight Dot Matrix Footer**: Interactive canvas spotlight effect following cursor movements.

---

## Folder Architecture

```text
Portfolio_website/
├── public/                     # Static assets (images, favicon, project screenshots)
│   └── projects/               # Project preview screenshots (simply.png, rampling.png, etc.)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/                # Backend API Routes
│   │   │   ├── github/         # Real-time GitHub contribution GraphQL/REST API route
│   │   │   ├── social/         # Social profile metadata endpoint
│   │   │   └── views/          # Visitor counter API route (session-deduplicated)
│   │   ├── globals.css         # Global styles, CSS variables, and circular transition keyframes
│   │   ├── layout.tsx          # Main HTML root layout & theme providers
│   │   └── page.tsx            # Main portfolio page entry point
│   ├── components/             # Page Section & Feature Components
│   │   ├── ui/                 # Reusable UI primitives & micro-interactions
│   │   │   ├── encrypted-text.tsx  # Cipher text reveal component
│   │   │   ├── pixel-heading.tsx   # Pixel typography randomized animation
│   │   │   ├── social-hover-card.tsx # Radix HoverCard popups for GitHub/X/LinkedIn/Gmail
│   │   │   ├── soft-pill-button.tsx  # Blueprint styled pill buttons
│   │   │   └── texture-overlay.tsx   # Micro-dotted 3-row texture divider gaps
│   │   ├── AboutSection.tsx        # Bio bullet points and social connect links
│   │   ├── BannerWind.tsx          # Ambient wind particle animation overlay for banner
│   │   ├── BlueprintGrid.tsx       # Vertical dotted guidelines & 22vh baseline nodes
│   │   ├── CurrentTime.tsx         # Real-time clock formatted for user's timezone
│   │   ├── DottedDivider.tsx       # Horizontal micro-dotted dividers with node dots
│   │   ├── FooterBackground.tsx    # Interactive dot matrix spotlight canvas
│   │   ├── GithubGraph.tsx         # 53-week GitHub activity heatmap grid
│   │   ├── MenuBar.tsx             # Navigation anchors and theme toggle
│   │   ├── OpenSourceSection.tsx   # Filterable open source contributions list
│   │   ├── ProfileHeader.tsx       # Profile image, name, age, resume link, visitor count
│   │   ├── ProjectsSection.tsx     # 2-column responsive project cards & center guideline
│   │   ├── QuoteSection.tsx        # Encrypted rotating quotes loop
│   │   ├── SkillsSection.tsx       # Tech stack badges grid
│   │   ├── ThemeToggle.tsx         # Circular view transition theme switcher button
│   │   ├── VisitorCounter.tsx      # Total unique site visits counter
│   │   └── views-cache.json        # Persistent visitor count data store
│   ├── images/                 # Optimized local static images (pfp.jpg, banner.png)
│   └── lib/                    # Utility functions and sound engine
│       ├── click-003.ts            # Base64 Web Audio click sound buffer
│       ├── sound-engine.ts         # Audio synthesis controller
│       └── utils.ts                # Classname merger (clsx + tailwind-merge)
├── .gitignore                  # Git exclusion configuration
├── next.config.ts              # Next.js configuration
├── package.json                # Project dependencies and npm scripts
├── postcss.config.mjs          # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS theme & utility extensions
└── tsconfig.json               # TypeScript compiler options
```

---

## Getting Started

### Prerequisites

Ensure you have **Node.js 18+** and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shreyasnalle/Portfolio_website.git
   cd Portfolio_website
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your web browser.

---

## Tech Stack & Tools

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI Hover Card](https://www.radix-ui.com/), Custom Micro-Interactions
- **Icons**: [Simple Icons](https://simpleicons.org/) CDN & Lucide Icons
- **Audio**: Web Audio API Sound Synthesizer
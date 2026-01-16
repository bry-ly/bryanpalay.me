import Image from "next/image";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";
import { Tech_Stack } from "@/lib/data/tech-stack";
import type { TechStack as TechStackType } from "@/lib/types/tech-stack";

// Themed icons (light/dark pairs)
const localThemeIcons: Record<string, { light: string; dark: string }> = {
  prisma: {
    light: "/tech-stack-icons/prisma-light.svg",
    dark: "/tech-stack-icons/prisma-dark.svg",
  },
  zed: {
    light: "/tech-stack-icons/zed-light.svg",
    dark: "/tech-stack-icons/zed-dark.svg",
  },
  opencode: {
    light: "/tech-stack-icons/opencode-logo-light.svg",
    dark: "/tech-stack-icons/opencode-logo-dark.svg",
  },
  vercel: {
    light: "/tech-stack-icons/vercel-light.svg",
    dark: "/tech-stack-icons/vercel-dark.svg",
  },
  github: {
    light: "/tech-stack-icons/github-light.svg",
    dark: "/tech-stack-icons/github-dark.svg",
  },
};

// Single-color local icons
const localSingleIcons: Record<string, string> = {
  html: "/tech-stack-icons/html.svg",
  css: "/tech-stack-icons/css.svg",
  nodejs: "/tech-stack-icons/nodejs.svg",
  "better-auth": "/tech-stack-icons/better-auth.svg",
  postgres: "/tech-stack-icons/postgres.svg",
  nextjs: "/tech-stack-icons/next-js.svg",
  neon: "/tech-stack-icons/neon.svg",
  vscode: "/tech-stack-icons/vscode.svg",
};

const SECTIONS = [
  {
    title: "Languages",
    categories: ["Language"],
  },
  {
    title: "Frameworks & Libraries",
    categories: ["Framework", "Library", "UI Library", "Component Library"],
  },
  {
    title: "Databases & Backend",
    categories: ["Database", "ORM", "Authentication", "Runtime Environment"],
  },
  {
    title: "Tools & Infrastructure",
    categories: ["Version Control", "IDE", "Deployment"],
  },
];

export function TeckStack() {
  // Group items into sections with deduplication
  const groupedStack: Record<string, TechStackType[]> = {};
  const processedKeys = new Set<string>();

  // Initialize groups
  SECTIONS.forEach((section) => {
    groupedStack[section.title] = [];
  });

  // Populate groups based on priority order
  SECTIONS.forEach((section) => {
    Tech_Stack.forEach((tech) => {
      if (processedKeys.has(tech.key)) return;

      const matches = tech.categories.some((cat) =>
        section.categories.includes(cat),
      );

      if (matches) {
        groupedStack[section.title].push(tech);
        processedKeys.add(tech.key);
      }
    });
  });

  return (
    <Panel id="stack">
      <PanelHeader>
        <PanelTitle>Stack</PanelTitle>
      </PanelHeader>

      <PanelContent
        className={cn(
          "[--pattern-foreground:var(--color-zinc-950)]/5 dark:[--pattern-foreground:var(--color-white)]/5",
          "bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)] bg-size-[10px_10px] bg-center",
          "bg-zinc-950/0.75 dark:bg-white/0.75",
        )}
      >
        <div className="flex flex-col gap-y-6">
          {SECTIONS.map((section) => {
            const items = groupedStack[section.title];
            if (items.length === 0) return null;

            return (
              <div key={section.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-medium text-muted-foreground ml-1">
                  {section.title}
                </h3>
                <ul className="flex flex-wrap gap-2 select-none">
                  {items.map((tech) => (
                    <li key={tech.key} className="flex">
                      <TechBadge tech={tech} />
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </PanelContent>
    </Panel>
  );
}

function TechBadge({ tech }: { tech: TechStackType }) {
  return (
    <Badge
      variant="outline"
      className="h-8 gap-2 px-2 text-sm font-normal cursor-pointer transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-800 border-none "
      asChild
    >
      <a
        href={tech.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={tech.title}
      >
        {tech.theme ? (
          <>
            <Image
              src={
                localThemeIcons[tech.key]?.light ??
                `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-light.svg`
              }
              alt={`${tech.title} light icon`}
              width={16}
              height={16}
              className="block dark:hidden"
              unoptimized
            />
            <Image
              src={
                localThemeIcons[tech.key]?.dark ??
                `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`
              }
              alt={`${tech.title} dark icon`}
              width={16}
              height={16}
              className="hidden dark:block"
              unoptimized
            />
          </>
        ) : localThemeIcons[tech.key] ? (
          <>
            <Image
              src={localThemeIcons[tech.key].light}
              alt={`${tech.title} light icon`}
              width={16}
              height={16}
              className="block dark:hidden"
              unoptimized
            />
            <Image
              src={localThemeIcons[tech.key].dark}
              alt={`${tech.title} dark icon`}
              width={16}
              height={16}
              className="hidden dark:block"
              unoptimized
            />
          </>
        ) : localSingleIcons[tech.key] ? (
          <Image
            src={localSingleIcons[tech.key]}
            alt={`${tech.title} icon`}
            width={16}
            height={16}
            unoptimized
          />
        ) : (
          <Image
            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
            alt={`${tech.title} icon`}
            width={16}
            height={16}
            unoptimized
          />
        )}
        <span>{tech.title}</span>
      </a>
    </Badge>
  );
}

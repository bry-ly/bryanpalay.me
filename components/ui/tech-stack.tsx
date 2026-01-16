import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";
import { Tech_Stack } from "@/lib/data/tech-stack";

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
};

// Single-color local icons
const localSingleIcons: Record<string, string> = {
  nodejs: "/tech-stack-icons/nodejs.svg",
  "better-auth": "/tech-stack-icons/better-auth.svg",
  postgres: "/tech-stack-icons/postgres.svg",
  nextjs: "/tech-stack-icons/next-js.svg",
};

export function TeckStack() {
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
        <TooltipProvider>
          <ul className="flex flex-wrap gap-4 select-none">
            {Tech_Stack.map((tech) => {
              return (
                <li key={tech.key} className="flex">
                  <Tooltip>
                    <TooltipTrigger asChild>
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
                              width={32}
                              height={32}
                              className="block dark:hidden"
                              unoptimized
                            />
                            <Image
                              src={
                                localThemeIcons[tech.key]?.dark ??
                                `https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}-dark.svg`
                              }
                              alt={`${tech.title} dark icon`}
                              width={32}
                              height={32}
                              className="hidden dark:block"
                              unoptimized
                            />
                          </>
                        ) : localThemeIcons[tech.key] ? (
                          <>
                            <Image
                              src={localThemeIcons[tech.key].light}
                              alt={`${tech.title} light icon`}
                              width={32}
                              height={32}
                              className="block dark:hidden"
                              unoptimized
                            />
                            <Image
                              src={localThemeIcons[tech.key].dark}
                              alt={`${tech.title} dark icon`}
                              width={32}
                              height={32}
                              className="hidden dark:block"
                              unoptimized
                            />
                          </>
                        ) : localSingleIcons[tech.key] ? (
                          <Image
                            src={localSingleIcons[tech.key]}
                            alt={`${tech.title} icon`}
                            width={32}
                            height={32}
                            unoptimized
                          />
                        ) : (
                          <Image
                            src={`https://assets.chanhdai.com/images/tech-stack-icons/${tech.key}.svg`}
                            alt={`${tech.title} icon`}
                            width={32}
                            height={32}
                            unoptimized
                          />
                        )}
                      </a>
                    </TooltipTrigger>

                    <TooltipContent>
                      <p>{tech.title}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              );
            })}
          </ul>
        </TooltipProvider>
      </PanelContent>
    </Panel>
  );
}

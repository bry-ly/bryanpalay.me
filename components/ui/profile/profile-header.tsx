"use client";

import { useState } from "react";
import Image from "next/image";
import { useHotkeys } from "react-hotkeys-hook";
import { motion, type Variants } from "motion/react";
import { USER } from "@/lib/data/user";

import { PhilippinesFlagIcon } from "./philippines-flag-icon";
import { VerifiedIcon } from "./verified-icon";
import { FlipSentences } from "@/components/ui/animations/flip-sentences";
import { FlipName } from "@/components/ui/animations/flip-name";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/primitives/tooltip";
import { Kbd } from "@/components/ui/display/kbd";

export function ProfileHeader() {
  const [isAltAvatar, setIsAltAvatar] = useState(false);

  const toggleAvatar = () => {
    setIsAltAvatar((prev) => !prev);
  };

  useHotkeys("q", toggleAvatar);

  const glitchVariants: Variants = {
    idle: { filter: "hue-rotate(0deg) contrast(100%) saturate(100%)" },
    glitch: {
      filter: [
        "hue-rotate(0deg) contrast(100%) saturate(100%)",
        "hue-rotate(90deg) contrast(200%) saturate(150%)",
        "hue-rotate(-90deg) contrast(200%) saturate(150%)",
        "hue-rotate(0deg) contrast(100%) saturate(100%)",
      ],
      transition: { duration: 0.3, ease: "linear" },
    },
  };

  const currentAvatarSrc = isAltAvatar && USER.avatarAlt ? USER.avatarAlt : USER.avatar;

  return (
    <div className="screen-line-after relative flex border-x border-edge">
      <div className="shrink-0 border-r border-edge">
        <div className="mx-0.5 my-0.75 relative group">
          <div className="relative size-32 sm:size-40 rounded-full ring-1 ring-border ring-offset-2 ring-offset-background select-none overflow-hidden">
            <motion.div
              key={isAltAvatar ? "alt" : "main"}
              variants={glitchVariants}
              animate="glitch"
              initial="idle"
              className="size-full bg-background"
            >
              <Image
                className="size-full rounded-full object-cover"
                alt={`${USER.displayName}'s avatar`}
                src={currentAvatarSrc}
                width={160}
                height={160}
                priority
              />
            </motion.div>
          </div>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleAvatar}
                className="absolute bottom-0 right-0 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm hover:bg-accent transition-colors"
                aria-label="Toggle Avatar"
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  shapeRendering="geometricPrecision"
                  textRendering="geometricPrecision"
                  imageRendering="optimizeQuality"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  viewBox="0 0 512 508.47"
                  className="fill-foreground"
                  animate={{ rotate: isAltAvatar ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path fillRule="nonzero" d="M254.23 508.47c-3.94 0-7.87-.1-11.77-.28h-1.54v-.07c-64.9-3.34-123.37-31.04-166.45-74.12C28.46 387.99 0 324.42 0 254.23c0-70.19 28.46-133.75 74.47-179.76C117.55 31.39 176.03 3.69 240.92.34V.27h1.54c3.9-.18 7.83-.27 11.77-.27l3.46.02.08-.02c70.19 0 133.75 28.46 179.76 74.47 46 46.01 74.47 109.57 74.47 179.76S483.53 387.99 437.53 434c-46.01 46.01-109.57 74.47-179.76 74.47l-.08-.03-3.46.03zm-13.31-30.56V30.56C184.33 33.87 133.4 58.17 95.79 95.79c-40.55 40.54-65.62 96.56-65.62 158.44 0 61.89 25.07 117.91 65.62 158.45 37.61 37.61 88.54 61.91 145.13 65.23z"/>
                </motion.svg>
              </button>
            </TooltipTrigger>
            <TooltipContent className="pr-2 pl-3">
              <div className="flex items-center gap-3">
                Toggle Avatar
                <Kbd>Q</Kbd>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
        <a
          href="https://www.officialgazette.gov.ph/about/"
          target="_blank"
          rel="noreferrer"
          className="absolute top-0 -left-px"
          aria-label="Learn about the Philippines"
        >
          <PhilippinesFlagIcon />
        </a>
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex grow items-end pb-1 pl-4">
          <div className="line-clamp-1 font-mono text-xs text-zinc-300 select-none max-sm:hidden dark:text-zinc-800">
            {"text-3xl "}
            <span className="inline dark:hidden">text-zinc-950</span>
            <span className="hidden dark:inline">text-zinc-50</span>
            {" font-medium"}
          </div>
        </div>

        <div className="border-t border-edge">
          <div className="flex items-center gap-2 pl-4">
            <h1 className="-translate-y-px text-3xl font-semibold">
              <FlipName
                name={USER.displayName}
                nameBaybayin={USER.displayNameBaybayin}
                interval={4}
              />
            </h1>

            <VerifiedIcon
              className="size-4.5 text-info select-none"
              aria-label="Verified"
            />
          </div>
          <div className="h-12.5 border-t border-edge py-1 pl-4 sm:h-9">
            <FlipSentences
              className="font-mono text-sm text-balance text-muted-foreground"
              variants={{
                initial: { y: -10, opacity: 0 },
                animate: { y: -1, opacity: 1 },
                exit: { y: 10, opacity: 0 },
              }}
            >
              {USER.flipSentences.map((sentence) => (
                <span key={sentence}>{sentence}</span>
              ))}
            </FlipSentences>
          </div>
        </div>
      </div>
    </div>
  );
}

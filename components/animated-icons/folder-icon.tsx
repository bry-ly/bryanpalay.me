"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface FolderOpenIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface FolderOpenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PAPER_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 0,
    transition: { duration: 0.2 },
  },
  animate: {
    y: -3,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const FLAP_VARIANTS: Variants = {
  normal: {
    d: "M 2 9 L 22 9 L 22 21 L 2 21 Z",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  animate: {
    d: "M 2.5 13 L 21.5 9 L 21 20 L 3 22 Z", // Tilted front face
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

const FolderOpenIcon = forwardRef<FolderOpenIconHandle, FolderOpenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const handleMouseEnter = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          controls.start("animate");
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn(className, "flex items-center justify-center")}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ overflow: "visible" }}
        >
          {/* Back of folder (Static) */}
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2Z" />

          {/* Paper inside (Slides up) */}
          <motion.path
            d="M6 10h12v10H6z"
            fill="currentColor"
            fillOpacity="0.1"
            stroke="currentColor"
            animate={controls}
            initial="normal"
            variants={PAPER_VARIANTS}
          />

          {/* Front flap (Morphs) */}
          <motion.path
            animate={controls}
            initial="normal"
            variants={FLAP_VARIANTS}
            fill="var(--color-background)" // Fill to hide paper behind
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </div>
    );
  }
);

FolderOpenIcon.displayName = "FolderOpenIcon";

export { FolderOpenIcon };

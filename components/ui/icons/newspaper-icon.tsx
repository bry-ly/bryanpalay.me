"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface NewspaperIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface NewspaperIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const PAGE_VARIANTS: Variants = {
  normal: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.3 },
  },
  animate: {
    y: -2,
    rotate: -3,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      y: { repeat: 0 },
      rotate: { repeat: 0 },
    },
  },
};

const LINES_VARIANTS: Variants = {
  normal: {
    pathLength: 1,
    opacity: 1,
  },
  animate: {
    pathLength: [0, 1],
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
      staggerChildren: 0.1,
    },
  },
};

const IMAGE_VARIANTS: Variants = {
  normal: {
    scale: 1,
    opacity: 1,
  },
  animate: {
    scale: [1, 0.8, 1.1, 1],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

const NewspaperIcon = forwardRef<NewspaperIconHandle, NewspaperIconProps>(
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
        >
          <motion.g animate={controls} initial="normal" variants={PAGE_VARIANTS} style={{ originX: "12px", originY: "12px" }}>
             {/* Main Page Body */}
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            
             {/* Lines */}
            <motion.path d="M18 14h-8" variants={LINES_VARIANTS} />
            <motion.path d="M15 18h-5" variants={LINES_VARIANTS} />
            
             {/* Image Box */}
            <motion.path 
              d="M10 6h8v4h-8V6Z" 
              variants={IMAGE_VARIANTS} 
              style={{ originX: "14px", originY: "8px" }} // Center of the 8x4 box at (10,6) is roughly (14, 8)
            />
          </motion.g>
        </motion.svg>
      </div>
    );
  }
);

NewspaperIcon.displayName = "NewspaperIcon";

export { NewspaperIcon };

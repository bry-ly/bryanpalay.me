"use client";

import { motion, useAnimation, type Variants } from "motion/react";
import type { HTMLAttributes, MouseEvent } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";

import { cn } from "@/lib/utils";

export interface MailIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface MailIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const FLAP_VARIANTS: Variants = {
  normal: {
    rotateX: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  animate: {
    rotateX: 180,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const LETTER_VARIANTS: Variants = {
  normal: {
    y: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    y: -4,
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const MailIcon = forwardRef<MailIconHandle, MailIconProps>(
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
          {/* Envelope Body */}
          <rect width="20" height="16" x="2" y="4" rx="2" />
          
          {/* Letter inside (initially hidden) */}
          <motion.path
            d="M6 8h12M6 12h12"
            strokeWidth="2"
            animate={controls}
            initial="normal"
            variants={LETTER_VARIANTS}
          />

          {/* Flap */}
          <motion.path
            d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"
            animate={controls}
            initial="normal"
            variants={FLAP_VARIANTS}
            style={{ originY: "7px", originX: "12px" }}
          />
        </motion.svg>
      </div>
    );
  }
);

MailIcon.displayName = "MailIcon";

export { MailIcon };

"use client";

import type { Transition, Variants } from "motion/react";
import { AnimatePresence, motion } from "motion/react";
import { Children, useEffect, useState, useCallback, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

const defaultVariants: Variants = {
  initial: { y: -8, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 8, opacity: 0 },
};

type MotionElement = typeof motion.p | typeof motion.span | typeof motion.code;

type Props = {
  as?: MotionElement;
  className?: string;
  children: React.ReactNode[];

  interval?: number;
  transition?: Transition;
  variants?: Variants;

  onIndexChange?: (index: number) => void;
  pauseOnHover?: boolean;
};

export function FlipSentences({
  as: Component = motion.p,
  className,
  children,

  interval = 2,
  transition = { duration: 0.3 },
  variants = defaultVariants,

  onIndexChange,
  pauseOnHover = true,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const items = useMemo(() => Children.toArray(children), [children]);
  const itemsLengthRef = useRef(items.length);
  const onIndexChangeRef = useRef(onIndexChange);

  useEffect(() => {
    itemsLengthRef.current = items.length;
    onIndexChangeRef.current = onIndexChange;
  }, [items.length, onIndexChange]);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % itemsLengthRef.current;
        onIndexChangeRef.current?.(next);
        return next;
      });
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [interval, isPaused]);

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  return (
    <span
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <Component
          key={currentIndex}
          className={cn("inline-block", className)}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={transition}
          variants={variants}
        >
          {items[currentIndex]}
        </Component>
      </AnimatePresence>
    </span>
  );
}

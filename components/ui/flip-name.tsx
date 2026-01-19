"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";

import { cn } from "@/lib/utils";

type Props = {
  name: string;
  nameBaybayin?: string;
  className?: string;
  interval?: number;
};

export function FlipName({
  name,
  nameBaybayin,
  className,
  interval = 3,
}: Props) {
  const [showBaybayin, setShowBaybayin] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(interval);

  useEffect(() => {
    intervalRef.current = interval;
  }, [interval]);

  useEffect(() => {
    if (!nameBaybayin || isPaused) return;

    const timer = setInterval(() => {
      setShowBaybayin((prev) => !prev);
    }, intervalRef.current * 1000);

    return () => clearInterval(timer);
  }, [nameBaybayin, isPaused]);

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  if (!nameBaybayin) {
    return <span className={className}>{name}</span>;
  }

  return (
    <span
      className="relative inline-flex items-center overflow-hidden mb-1"
      style={{ height: "1.2em" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={showBaybayin ? "baybayin" : "latin"}
          className={cn("inline-block", className)}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {showBaybayin ? (
            <span className="font-tagalog leading-none">{nameBaybayin}</span>
          ) : (
            name
          )}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

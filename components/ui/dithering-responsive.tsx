"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DitheringResponsive() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Small delay to ensure client-side rendering matches expectations
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Default to light mode values if not mounted to match likely server default or avoid flash
  // However, without knowing server theme, mismatch is possible.
  // Rendering nothing or a placeholder is safest for hydration.
  if (!mounted) {
    return <div className="w-full h-55 bg-background" aria-hidden="true" />;
  }

  const isDark = resolvedTheme === "dark";

  // Colors adapted for light/dark modes
  // Light: White background, Dark Gray foreground
  // Dark: Zinc-950 background (#09090b), Original Grayish foreground (#6d7878)
  const colorBack = isDark ? "#09090b" : "#ffffff";
  const colorFront = isDark ? "#b3b3b3" : "#27272a";

  return (
    <Dithering
      width="100%"
      height={220}
      colorBack={colorBack}
      colorFront={colorFront}
      shape="warp"
      type="4x4"
      size={1.5}
      speed={0.5}
      className="w-full rounded-none" // Added rounded-none to match general aesthetics if needed, can remove
    />
  );
}

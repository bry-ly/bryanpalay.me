"use client";

import { Dithering } from "@paper-design/shaders-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function DitheringResponsive() {
  const { resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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

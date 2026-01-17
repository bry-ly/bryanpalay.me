"use client";

import { Nav } from "@/components/layout/nav";
import type { NavItem } from "@/lib/types/nav";

export function DesktopNav({ items }: { items: NavItem[] }) {
  return <Nav className="max-sm:hidden" items={items} />;
}

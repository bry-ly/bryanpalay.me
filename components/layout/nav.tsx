"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types/nav";

export function Nav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex items-center gap-4", className)}>
      {items.map(({ title, href }) => {
        const active =
          href === "/"
            ? pathname === "/" || pathname === "/index"
            : pathname?.startsWith(href);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "font-mono text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground",
              active && "text-foreground"
            )}
          >
            {title}
          </Link>
        );
      })}
    </nav>
  );
}

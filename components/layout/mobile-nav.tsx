"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types/nav";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <Button
        variant="ghost"
        size="icon"
        className="group/toggle flex flex-col gap-1"
        onClick={() => setOpen(!open)}
        aria-label="Toggle Menu"
        aria-expanded={open}
      >
        <span
          className={cn(
            "flex h-0.5 w-4 rounded-[1px] bg-foreground transition-transform",
            open && "translate-y-[3px] rotate-45"
          )}
        />
        <span
          className={cn(
            "flex h-0.5 w-4 rounded-[1px] bg-foreground transition-transform",
            open && "-translate-y-[3px] -rotate-45"
          )}
        />
      </Button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-md border bg-popover p-1 shadow-md">
          {items.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-sm px-3 py-2 text-sm hover:bg-accent"
              onClick={() => setOpen(false)}
            >
              {link.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

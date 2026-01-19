"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

import { Button } from "@/components/ui/primitives/button";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/lib/types/nav";

export function MobileNav({
  items,
  className,
}: {
  items: NavItem[];
  className?: string;
}) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("group/toggle flex flex-col gap-1", className)}
          aria-label="Toggle Menu"
        >
          <span className="flex h-0.5 w-4 rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:translate-y-[3px] group-data-[state=open]/toggle:rotate-45" />
          <span className="flex h-0.5 w-4 rounded-[1px] bg-foreground transition-transform group-data-[state=open]/toggle:-translate-y-[3px] group-data-[state=open]/toggle:-rotate-45" />
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="z-50 min-w-48 rounded-md border bg-popover p-1 shadow-md animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
          sideOffset={8}
          align="end"
        >
          {items.map((link) => (
            <DropdownMenu.Item key={link.href} asChild>
              <Link
                href={link.href}
                className="block rounded-sm px-3 py-2 text-sm outline-none hover:bg-accent focus:bg-accent"
              >
                {link.title}
              </Link>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

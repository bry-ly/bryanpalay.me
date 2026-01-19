"use client";

import Link from "next/link";
import { useRef } from "react";
import { FolderOpenIcon } from "@/components/ui/icons/folder-icon";
import { MailIcon } from "@/components/ui/icons/mail-icon";
import { NewspaperIcon } from "@/components/ui/icons/newspaper-icon";
import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";
import { Button } from "@/components/ui/primitives/button";

const QUICK_LINKS = [
  {
    title: "Blog",
    href: "/blog",
    Icon: NewspaperIcon,
  },
  {
    title: "Projects",
    href: "/projects",
    Icon: FolderOpenIcon,
  },
  {
    title: "Contact",
    href: "/contact",
    Icon: MailIcon,
  },
];

export function QuickLinks() {
  return (
    <Panel id="links">
      <PanelHeader>
        <PanelTitle>Quick Links</PanelTitle>
      </PanelHeader>

      <PanelContent>
        <div className="flex flex-wrap gap-2">
          {QUICK_LINKS.map((link) => (
            <QuickLinkItem key={link.href} link={link} />
          ))}
        </div>
      </PanelContent>
    </Panel>
  );
}

function QuickLinkItem({ link }: { link: typeof QUICK_LINKS[number] }) {
  const iconRef = useRef<{ startAnimation: () => void; stopAnimation: () => void }>(null);

  return (
    <Button
      variant="outline"
      className="h-9 gap-2 group"
      asChild
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
    >
      <Link href={link.href}>
        <link.Icon ref={iconRef} size={16} />
        {link.title}
      </Link>
    </Button>
  );
}

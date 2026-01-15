import { Slot } from "@radix-ui/react-slot";
import type { ReactNode } from "react";
import React from "react";

import { cn } from "@/lib/utils";

interface PanelProps extends React.ComponentProps<"section"> {
  children: ReactNode;
}

function Panel({ className, children, ...props }: PanelProps): React.ReactElement {
  return (
    <section
      data-slot="panel"
      className={cn(
        "screen-line-before screen-line-after border-x border-edge",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}

interface PanelHeaderProps extends React.ComponentProps<"header"> {
  children: ReactNode;
}

function PanelHeader({ className, children, ...props }: PanelHeaderProps): React.ReactElement {
  return (
    <header
      data-slot="panel-header"
      className={cn("screen-line-after px-4", className)}
      {...props}
    >
      {children}
    </header>
  );
}

interface PanelTitleProps extends React.ComponentProps<"h2"> {
  asChild?: boolean;
  children: ReactNode;
}

function PanelTitle({
  className,
  asChild = false,
  children,
  ...props
}: PanelTitleProps): React.ReactElement {
  const Comp = asChild ? Slot : "h2";

  return (
    <Comp
      data-slot="panel-title"
      className={cn("text-3xl font-semibold", className)}
      {...props}
    >
      {children}
    </Comp>
  );
}

interface PanelTitleSupProps extends React.ComponentProps<"sup"> {
  children: ReactNode;
}

function PanelTitleSup({ className, children, ...props }: PanelTitleSupProps): React.ReactElement {
  return (
    <sup
      className={cn(
        "-top-[0.75em] ml-1 text-sm font-medium text-muted-foreground select-none",
        className
      )}
      {...props}
    >
      {children}
    </sup>
  );
}

interface PanelContentProps extends React.ComponentProps<"div"> {
  children: ReactNode;
}

function PanelContent({ className, children, ...props }: PanelContentProps): React.ReactElement {
  return (
    <div data-slot="panel-body" className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
}

export { Panel, PanelContent, PanelHeader, PanelTitle, PanelTitleSup };
export type { PanelProps, PanelContentProps, PanelHeaderProps, PanelTitleProps, PanelTitleSupProps };
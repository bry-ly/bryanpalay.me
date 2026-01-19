import { SOURCE_CODE_GITHUB_URL } from "@/lib/config/site";
import { cn } from "@/lib/utils";

import { Icons } from "./icons";
import { DitheringResponsive } from "@/components/ui/dithering-responsive";
import { SiteHeaderMark } from "@/components/layout/site-header-mark";

export function SiteFooter() {
  return (
    <footer className="max-w-screen overflow-x-hidden px-2">
      <div className="screen-line-before mx-auto border-x border-edge pt-4 md:max-w-3xl">
        <div className="relative mb-8 w-full border-y border-edge">
          <DitheringResponsive />
          <div className="absolute inset-0 flex items-center justify-center">
             <SiteHeaderMark className="text-3xl" />
          </div>
        </div>

        <p className="mb-1 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Inspired by{" "}
          <a
            className="link"
            href="https://chanhdai.com/"
            target="_blank"
            rel="noopener"
          >
            ncdai
          </a>
          ,{" "}
          <a
            className="link"
            href="https://tailwindcss.com/"
            target="_blank"
            rel="noopener"
          >
            tailwindcss.com
          </a>
          {" & "}
          <a
            className="link"
            href="https://ui.shadcn.com/"
            target="_blank"
            rel="noopener"
          >
            ui.shadcn.com
          </a>
        </p>

        <p className="mb-4 px-4 text-center font-mono text-sm text-balance text-muted-foreground">
          Built by{" "}
          <a
            className="link"
            href="https://x.com/bry_ly28"
            target="_blank"
            rel="noopener"
          >
            bry-ly
          </a>
          . The source code is available on{" "}
          <a
            className="link"
            href={SOURCE_CODE_GITHUB_URL}
            target="_blank"
            rel="noopener"
          >
            GitHub
          </a>
          .
        </p>

        <div className="screen-line-before screen-line-after flex w-full before:z-1 after:z-1">
          <div className="mx-auto flex items-center justify-center gap-3 border-x border-edge bg-background px-4">
            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://x.com/bry_ly28"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.x className="size-4" />
              <span className="sr-only">X</span>
            </a>

            <Separator />

            <a
              className="flex items-center text-muted-foreground transition-colors hover:text-foreground"
              href="https://github.com/bry_ly"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.github className="size-4" />
              <span className="sr-only">GitHub</span>
            </a>

            <Separator />

            <a
              className="flex text-muted-foreground transition-colors hover:text-foreground"
              href={
                process.env.NEXT_PUBLIC_DMCA_URL ||
                "https://www.dmca.com/ProtectionPro.aspx"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.dmca className="h-4.5 w-auto" />
              <span className="sr-only">DMCA.com Protection Status</span>
            </a>
          </div>
        </div>
      </div>
      <div className="pb-[env(safe-area-inset-bottom,0px)]">
        <div className="flex h-2" />
      </div>
    </footer>
  );
}

function Separator({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("flex h-11 w-px bg-edge", className)} {...props} />;
}

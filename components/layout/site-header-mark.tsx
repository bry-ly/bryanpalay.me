import Link from "next/link";
import { cn } from "@/lib/utils";

export function SiteHeaderMark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center gap-2 font-mono text-lg font-bold tracking-tight",
        className,
      )}
      aria-label="Home"
    >
      <span className="font-tagalog text-2xl leading-none">ᜊ᜔ᜉ᜔</span>
    </Link>
  );
}

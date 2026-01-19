import type { Metadata } from "next";
import Link from "next/link";
import { CalendarIcon, ClockIcon } from "lucide-react";
import { format } from "date-fns";

import { getAllPosts, getAllTags } from "@/lib/blog";
import { Badge } from "@/components/ui/primitives/badge";
import { cn } from "@/lib/utils";
import { PageTransition } from "@/components/ui/animations/page-transition";
import { SiteHeader } from "@/components/layout/header";
import { SiteFooter } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Blog | Bryan Palay",
  description: "Articles about web development, programming, and technology.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <>
      <SiteHeader />
      <PageTransition>
        <div className="mx-auto md:max-w-3xl">
          <Separator />
          <div className="border-x border-edge px-4 py-8">
            <h1 className="text-4xl font-bold mb-2">Blog</h1>
            <p className="text-muted-foreground">
              Thoughts on web development, programming, and technology.
            </p>
          </div>
          <Separator />

        {tags.length > 0 && (
          <>
            <div className="border-x border-edge px-4 py-4">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <Separator />
          </>
        )}

        <div className="border-x border-edge">
          {posts.length === 0 ? (
            <div className="px-4 py-16 text-center text-muted-foreground">
              <p>No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <div className="divide-y divide-edge">
              {posts.map((post) => (
                <article key={post.slug} className="group">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block px-4 py-6 hover:bg-accent2 transition-colors"
                  >
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {post.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="size-4" />
                        {format(new Date(post.date), "MMM d, yyyy")}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="size-4" />
                        {post.readingTime}
                      </span>
                    </div>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {post.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
        <Separator />
        </div>
      </PageTransition>
      <SiteFooter />
    </>
  );
}

function Separator({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative flex h-8 w-full border-x border-edge",
        "before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]",
        "before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56",
        className,
      )}
    />
  );
}

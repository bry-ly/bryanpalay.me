import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { About } from "@/components/portfolio/about";
import { GitHubContributions } from "@/components/portfolio/github-contributions";
import { Overview } from "@/components/portfolio/overview";
import { ProfileHeader } from "@/components/ui/profile-header";
import { Projects } from "@/components/portfolio/projects";
import { SocialLinks } from "@/components/portfolio/social-links";
import { TeckStack } from "@/components/ui/tech-stack";
import { QuickLinks } from "@/components/portfolio/quick-links";
import { SiteFooter } from "@/components/layout/footer";
import { USER } from "@/lib/data/user";
import { cn } from "@/lib/utils";
import { SiteHeader } from "@/components/layout/header";
import { DitheringResponsive } from "@/components/ui/dithering-responsive";
export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <SiteHeader />
      <div className="mx-auto px-4 md:px-0 md:max-w-3xl *:[[id]]:scroll-mt-22">
        <Separator />
        <DitheringResponsive />
        <Separator />

        <ProfileHeader />
        <Separator />

        <Overview />
        <Separator />

        <SocialLinks />
        <Separator />

        <QuickLinks />
        <Separator />

        <About />
        <Separator />

        <GitHubContributions />
        <Separator />

        <TeckStack />
        <Separator />

        <Projects />
        <Separator />
      </div>
      <SiteFooter />
    </>
  );
}

function getPageJsonLd(): WithContext<PageSchema> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    dateCreated: new Date(USER.dateCreated).toISOString(),
    dateModified: new Date().toISOString(),
    mainEntity: {
      "@type": "Person",
      name: USER.displayName,
      identifier: USER.username,
      image: USER.avatar,
    },
  };
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

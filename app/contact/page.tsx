import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { PageTransition, FadeIn } from "@/components/ui/page-transition";
import { ContactForm } from "@/components/portfolio/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact | Bryan Palay",
  description: "Get in touch with me for collaboration or opportunities.",
};

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="mx-auto md:max-w-3xl">
        <Separator />
        <div className="border-x border-edge px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeftIcon className="size-4" />
            Back to Home
          </Link>
          <FadeIn>
            <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
            <p className="text-muted-foreground">
              Have a project in mind or want to collaborate? Send me a message!
            </p>
          </FadeIn>
        </div>
        <Separator />

        <div className="border-x border-edge p-4">
          <FadeIn delay={0.2}>
            <ContactForm />
          </FadeIn>
        </div>
        <Separator />
      </div>
    </PageTransition>
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

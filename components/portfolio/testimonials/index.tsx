"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "motion/react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon, StarIcon } from "lucide-react";

import {
  Panel,
  PanelContent,
  PanelHeader,
  PanelTitle,
} from "@/components/layout/panel";
import { cn } from "@/lib/utils";
import { TESTIMONIALS } from "@/lib/data/testimonials";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <Panel id="testimonials">
      <PanelHeader>
        <PanelTitle>Testimonials</PanelTitle>
      </PanelHeader>

      <PanelContent className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="flex-[0_0_100%] min-w-0 px-4"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{
                    opacity: selectedIndex === index ? 1 : 0.5,
                    scale: selectedIndex === index ? 1 : 0.95,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative rounded-xl border border-edge bg-card p-6 md:p-8"
                >
                  <QuoteIcon className="absolute top-4 right-4 size-8 text-muted-foreground/20" />
                  
                  {testimonial.rating && (
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={cn(
                            "size-4",
                            i < testimonial.rating!
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-muted-foreground/30"
                          )}
                        />
                      ))}
                    </div>
                  )}

                  <blockquote className="text-lg md:text-xl mb-6 leading-relaxed">
                    &ldquo;{testimonial.content}&rdquo;
                  </blockquote>

                  <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-muted flex items-center justify-center text-lg font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                        {testimonial.company && ` at ${testimonial.company}`}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="size-10 rounded-full border border-edge flex items-center justify-center hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous testimonial"
          >
            <ChevronLeftIcon className="size-5" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "size-2 rounded-full transition-all duration-300",
                  selectedIndex === index
                    ? "bg-foreground w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="size-10 rounded-full border border-edge flex items-center justify-center hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Next testimonial"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </PanelContent>
    </Panel>
  );
}

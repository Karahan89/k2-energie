import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { PagebuilderType } from "@/types";

import { SanityImage } from "./elements/sanity-image";

type ImageLinkCard = NonNullable<
  NonNullable<PagebuilderType<"imageLinkCards">["cards"]>
>[number];

export type CTACardProps = {
  card: ImageLinkCard;
  className?: string;
};

export function CTACard({ card, className }: CTACardProps) {
  const { image, description, title, href } = card ?? {};
  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "glass-surface glass-surface-accent group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-3xl p-5 text-left shadow-soft transition-all duration-300 hover:-translate-y-[3px] hover:shadow-elevated md:p-6 lg:min-h-[300px]",
        className,
      )}
    >
      {image?.id && (
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-40 transition-opacity duration-500 group-hover:opacity-55">
          <SanityImage
            image={image}
            loading="eager"
            width={1920}
            height={1080}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
      <div className="relative z-[3] flex flex-col gap-[var(--space-1)]">
        <h3 className="text-balance text-[length:var(--step-1)] font-semibold text-primary-foreground drop-shadow">
          {title}
        </h3>
        <p className="content-readable text-[length:var(--step--1)] text-primary-foreground/90 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {description}
        </p>
      </div>
      <span className="mt-[var(--space-3)] inline-flex items-center gap-2 text-[length:var(--step--1)] font-medium text-primary-foreground/90">
        Mehr erfahren
        <span
          aria-hidden
          className="inline-block size-2 rounded-full bg-primary-foreground animate-shimmer"
        />
      </span>
    </Link>
  );
}

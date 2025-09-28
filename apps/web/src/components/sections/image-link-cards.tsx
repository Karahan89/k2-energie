import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { CTACard } from "../image-link-card";

export type ImageLinkCardsProps = PagebuilderType<"imageLinkCards">;

export function ImageLinkCards({
  richText,
  title,
  eyebrow,
  cards,
}: ImageLinkCardsProps) {
  return (
    <AmbientSurface
      id="image-link-cards"
      variant="default"
      className="my-[var(--space-8)] py-[var(--space-10)] md:my-[var(--space-10)] md:py-[var(--space-10)] lg:my-[var(--space-12)] lg:py-[var(--space-12)]"
    >
      <div className="layout-shell">
        <div className="flex w-full flex-col items-center">
          <div className="content-readable flex flex-col items-center space-y-[var(--space-3)] text-center sm:space-y-[var(--space-4)]">
            <Badge
              variant="secondary"
              className="glass-surface glass-surface-neutral rounded-full px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em]"
            >
              {eyebrow}
            </Badge>
            <h2 className="text-balance text-[length:var(--step-2)] font-semibold sm:text-[length:var(--step-3)]">
              {title}
            </h2>
            <RichText
              richText={richText}
              className="text-pretty text-[length:var(--step--1)] text-muted-foreground"
            />
          </div>

          {Array.isArray(cards) && cards.length > 0 && (
            <div className="mt-[var(--space-8)] grid w-full grid-cols-1 gap-[var(--space-4)] md:grid-cols-2 lg:mt-[var(--space-10)] xl:grid-cols-4">
              {cards?.map((card, idx) => (
                <CTACard
                  key={card._key}
                  card={card}
                  className={cn(
                    idx === 0 && "xl:col-span-2 xl:row-span-2",
                    idx === cards.length - 1 && "xl:col-span-2",
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </AmbientSurface>
  );
}

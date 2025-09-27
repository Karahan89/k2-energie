import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityIcon } from "../elements/sanity-icon";

type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon">;

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
};

function FeatureCard({ card }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  return (
    <article className="flex h-full flex-col gap-[var(--space-3)] rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-6 shadow-[var(--shadow-soft)]">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--surface-subtle)] text-[color:var(--brand-blue-900)]">
        <SanityIcon icon={icon} className="size-6" />
      </span>
      <div className="space-y-[var(--space-2)]">
        <h3 className="text-lg font-semibold text-[color:var(--brand-blue-900)]">
          {title}
        </h3>
        <RichText
          richText={richText}
          className="text-sm leading-relaxed text-[color:var(--neutral-500)]"
        />
      </div>
    </article>
  );
}

export function FeatureCardsWithIcon({
  eyebrow,
  title,
  richText,
  cards,
}: FeatureCardsWithIconProps) {
  return (
    <AmbientSurface
      id="features"
      variant="muted"
      className="my-[var(--space-12)] py-[var(--space-12)] md:my-[var(--space-14)]"
    >
      <div className="layout-shell">
        <div className="flex flex-col items-center text-center">
          <div className="content-readable flex flex-col items-center space-y-[var(--space-3)]">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em] text-[color:var(--brand-blue-900)]"
              >
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
              {title}
            </h2>
            <RichText
              richText={richText}
              className="text-pretty text-[length:var(--step--1)] text-[color:var(--neutral-500)]"
            />
          </div>
        </div>
        <div className="mx-auto mt-[var(--space-10)] grid gap-[var(--space-4)] md:grid-cols-2 lg:grid-cols-3">
          {cards?.map((card, index) => (
            <FeatureCard
              key={`FeatureCard-${card?._key}-${index}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </AmbientSurface>
  );
}

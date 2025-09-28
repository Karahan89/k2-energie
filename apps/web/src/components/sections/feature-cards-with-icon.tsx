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
    <article className="glass-surface flex h-full flex-col gap-[var(--space-3)] rounded-2xl p-6">
      <span
        className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--primary) 15%, transparent 85%)",
          color: "var(--primary-strong)",
        }}
      >
        <SanityIcon icon={icon} className="size-6" />
      </span>
      <div className="space-y-[var(--space-2)]">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--primary-strong)" }}
        >
          {title}
        </h3>
        <RichText
          richText={richText}
          className="text-sm leading-relaxed text-[color:var(--muted-foreground)]"
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
      className="my-[var(--space-10)] py-[var(--space-10)] md:my-[var(--space-12)]"
    >
      <div className="layout-shell">
        <div className="flex flex-col items-center text-center">
          <div className="content-readable flex flex-col items-center space-y-[var(--space-4)]">
            {eyebrow && (
              <div
                className="inline-flex items-center gap-2 self-center rounded-full px-3 py-1 text-sm"
                style={{
                  backgroundColor: "var(--primary-soft)",
                  color: "var(--primary-strong)",
                  border: "1px solid var(--border)",
                }}
              >
                {eyebrow}
              </div>
            )}
            <h2
              className="font-serif"
              style={{
                color: "var(--primary-strong)",
                fontSize: "var(--step-4)",
                lineHeight: 1.1,
              }}
            >
              {title}
            </h2>
            <RichText
              richText={richText}
              className="text-pretty text-[length:var(--step-0)] text-[color:var(--muted-foreground)]"
            />
          </div>
        </div>
        <div className="mx-auto mt-[var(--space-8)] grid max-w-6xl gap-[var(--space-6)] md:grid-cols-2 lg:grid-cols-3">
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

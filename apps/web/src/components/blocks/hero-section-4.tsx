import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import type {
  PagebuilderType,
  SanityButtonProps,
  SanityImageProps,
} from "@/types";

import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";
import { AuroraSection } from "../ui/aurora-section";
import { Button } from "../ui/button";
import { InfiniteSlider } from "../ui/infinite-slider";
import { ProgressiveBlur } from "../ui/progressive-blur";

type HeroBlockProps = PagebuilderType<"hero">;

type ParsedFeature = {
  id: string;
  primary: string;
  secondary?: string;
};

const HIGHLIGHT_CLASS = cn(
  "relative inline-flex items-center",
  "rounded-full px-[var(--space-2)] py-[calc(var(--space-1)/2)]",
  "bg-[var(--color-brand-primary-soft)]",
  "text-[var(--color-brand-primary-active)]",
  "shadow-[var(--shadow-soft)]",
);

function renderHighlightedTitle(
  title?: string | null,
  highlights?: Array<string | null>,
): ReactNode | string | null {
  if (!title) return null;

  const highlightQueue = (highlights ?? []).filter(Boolean) as string[];
  if (highlightQueue.length === 0) return title;

  const lines = title.split("\n");
  let queueIndex = 0;

  return lines.map((line, lineIndex) => {
    if (!line) {
      return (
        <span key={`line-${lineIndex}`}>
          {lineIndex < lines.length - 1 ? <br /> : null}
        </span>
      );
    }

    const segments: Array<string | ReactNode> = [];
    let remaining = line;

    while (queueIndex < highlightQueue.length) {
      const target = highlightQueue[queueIndex];
      if (!target) {
        queueIndex += 1;
        continue;
      }

      const lowerRemaining = remaining.toLowerCase();
      const lowerTarget = target.toLowerCase();
      const matchIndex = lowerRemaining.indexOf(lowerTarget);

      if (matchIndex === -1) break;

      if (matchIndex > 0) {
        segments.push(remaining.slice(0, matchIndex));
      }

      const matched = remaining.slice(matchIndex, matchIndex + target.length);
      segments.push(
        <span
          key={`highlight-${lineIndex}-${queueIndex}`}
          className={HIGHLIGHT_CLASS}
        >
          {matched}
        </span>,
      );

      remaining = remaining.slice(matchIndex + target.length);
      queueIndex += 1;
    }

    if (remaining) {
      segments.push(remaining);
    }

    return (
      <span key={`line-${lineIndex}`}>
        {segments}
        {lineIndex < lines.length - 1 ? <br /> : null}
      </span>
    );
  });
}

function mapButtons(buttons?: SanityButtonProps[] | null): {
  primary?: SanityButtonProps;
  secondary?: SanityButtonProps;
} {
  const parsed = (buttons ?? []).filter((button): button is SanityButtonProps =>
    Boolean(button),
  );

  return {
    primary: parsed[0],
    secondary: parsed[1],
  };
}

function splitFeatureText(feature: string): Omit<ParsedFeature, "id"> {
  const trimmed = feature.trim();
  if (!trimmed) return { primary: "" };

  const separators = [":", "–", "—", "|", "•", " - "] as const;
  for (const separator of separators) {
    if (trimmed.includes(separator)) {
      const [rawPrimary, ...rest] = trimmed.split(separator);
      const leading = (rawPrimary ?? "").trim();
      const trailing = rest.join(separator).trim();
      if (leading && trailing) {
        return { primary: leading, secondary: trailing };
      }
    }
  }

  const words = trimmed.split(/\s+/);
  if (words.length > 4) {
    return {
      primary: words.slice(0, 2).join(" "),
      secondary: words.slice(2).join(" "),
    };
  }

  return { primary: trimmed };
}

function buildFeatureItems(features?: Array<string | null>): ParsedFeature[] {
  const safeFeatures = (features ?? []).filter((feature): feature is string => {
    if (typeof feature !== "string") return false;
    return feature.trim().length > 0;
  });

  return safeFeatures.slice(0, 4).map((feature, index) => ({
    id: `feature-${index}`,
    ...splitFeatureText(feature),
  }));
}

function hasValidImage(
  image: HeroBlockProps["image"],
): image is SanityImageProps {
  return Boolean(image?.id && typeof image.id === "string");
}

function FeatureCard({ feature }: { feature: ParsedFeature }) {
  return (
    <article className="flex h-full flex-col justify-between rounded-[var(--radius-xl)] border border-[color:var(--color-border-muted)] bg-[var(--color-surface-subtle)] p-[var(--space-4)] shadow-[var(--shadow-soft)]">
      <div>
        <p className="text-[length:var(--step-0)] font-semibold text-[var(--color-text-base)]">
          {feature.primary}
        </p>
        {feature.secondary ? (
          <p className="mt-[var(--space-1)] text-[length:var(--step--1)] text-[var(--color-text-muted)]">
            {feature.secondary}
          </p>
        ) : null}
      </div>
      <span className="mt-[var(--space-3)] inline-flex items-center gap-[var(--space-1)] text-[length:var(--step--2)] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
        <Sparkles aria-hidden className="size-3" />
        Fördercheck
      </span>
    </article>
  );
}

function FeatureChip({ feature }: { feature: ParsedFeature }) {
  return (
    <span className="mx-[var(--space-2)] inline-flex items-center gap-[var(--space-1)] rounded-full border border-[color:var(--color-border-muted)] bg-[var(--color-surface-subtle)] px-[var(--space-3)] py-[calc(var(--space-1)*0.75)] text-[length:var(--step--2)] font-medium text-[var(--color-text-base)]">
      <Sparkles
        aria-hidden
        className="size-3 text-[var(--color-brand-primary)]"
      />
      {feature.primary}
    </span>
  );
}

export function HeroSection({
  badge,
  title,
  titleHighlights,
  richText,
  buttons,
  features,
  image,
}: HeroBlockProps) {
  const { primary, secondary } = mapButtons(buttons);
  const featureItems = buildFeatureItems(features);
  const heroImage = hasValidImage(image) ? image : null;
  const highlightedTitle = renderHighlightedTitle(title, titleHighlights);

  return (
    <AuroraSection
      variant="hero"
      withAurora={true}
      withBottomDivider={true}
      className="py-[var(--space-20)] md:py-[var(--space-24)] lg:py-[var(--space-32)]"
    >
      <ProgressiveBlur className="relative overflow-hidden">
        <div className="layout-shell-wide">
          <div className="grid min-w-0 items-start gap-[var(--space-20)] lg:grid-cols-12">
            <div className="col-span-12 flex flex-col gap-[var(--space-6)] lg:col-span-7">
              {badge ? (
                <span className="inline-flex max-w-max items-center gap-[var(--space-2)] rounded-full border border-[color:var(--color-border-muted)] bg-[var(--color-surface-subtle)] px-[var(--space-3)] py-[calc(var(--space-1)*0.75)] text-[length:var(--step--2)] uppercase tracking-[0.32em] text-[var(--color-text-muted)]">
                  {badge}
                </span>
              ) : null}

              <h1 className="text-pretty font-serif text-[length:var(--font-size-5)] leading-[var(--line-tight)] tracking-[var(--tracking-tight)] text-[var(--color-text-base)]">
                {highlightedTitle ?? title}
              </h1>

              <RichText
                richText={richText}
                className="max-w-[var(--max-readable)] text-[length:var(--step-0)] text-[var(--color-text-muted)]"
              />

              {(primary?.href || secondary?.href) && (
                <div className="flex flex-wrap gap-[var(--space-3)] pt-[var(--space-1)]">
                  {primary?.href ? (
                    <Button asChild variant="primary" size="lg">
                      <Link
                        href={primary.href}
                        target={primary.openInNewTab ? "_blank" : "_self"}
                      >
                        <span className="inline-flex items-center gap-[var(--space-2)]">
                          {primary.text ?? "Kostenloses Erstgespräch"}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </span>
                      </Link>
                    </Button>
                  ) : null}

                  {secondary?.href ? (
                    <Button asChild variant="secondary" size="lg">
                      <Link
                        href={secondary.href}
                        target={secondary.openInNewTab ? "_blank" : "_self"}
                      >
                        {secondary.text ?? "Leistungen entdecken"}
                      </Link>
                    </Button>
                  ) : null}
                </div>
              )}

              {featureItems.length > 0 ? (
                <div className="mt-[var(--space-4)]">
                  <div className="hidden gap-[var(--space-3)] md:grid md:grid-cols-2">
                    {featureItems.map((feature) => (
                      <FeatureCard key={feature.id} feature={feature} />
                    ))}
                  </div>
                  <div className="md:hidden">
                    <InfiniteSlider ariaLabel="Unsere Leistungsversprechen">
                      {featureItems.map((feature) => (
                        <FeatureChip
                          key={`chip-${feature.id}`}
                          feature={feature}
                        />
                      ))}
                    </InfiniteSlider>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="col-span-12 flex flex-col gap-[var(--space-4)] lg:col-span-5">
              <div className="overflow-hidden rounded-[var(--radius-xl)] border border-[color:var(--color-border-muted)] bg-[var(--color-surface-subtle)] shadow-[var(--shadow-elevated)]">
                {heroImage ? (
                  <SanityImage
                    image={heroImage}
                    alt={title ?? "Energieeffizienz visualisiert"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full min-h-[18rem] items-center justify-center bg-[var(--color-surface-muted)]">
                    <p className="text-[length:var(--step--1)] text-[var(--color-text-muted)]">
                      Bitte im CMS ein Hero-Bild hinterlegen.
                    </p>
                  </div>
                )}
              </div>

              <p className="text-[length:var(--step--2)] uppercase tracking-[0.28em] text-[var(--color-text-muted)]">
                BAFA-zertifiziert · Förderfähig · Nachhaltig
              </p>
            </div>
          </div>
        </div>
      </ProgressiveBlur>
    </AuroraSection>
  );
}

export { HeroSection as HeroBlock };

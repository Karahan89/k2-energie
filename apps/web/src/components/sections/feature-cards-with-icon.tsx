"use client";

import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight } from "lucide-react";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityIcon } from "../elements/sanity-icon";
import { AuroraSection } from "../ui/aurora-section";

export type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon">;

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
  index: number;
};

// Minimalistische Konfiguration basierend auf Projekt-Styleguide
const getCardConfig = (index: number) => {
  // Alle Karten verwenden das gleiche elegante Design
  return {
    iconBg: "bg-[color:var(--color-surface-subtle)]",
    iconColor: "text-[color:var(--color-brand-primary)]",
    border: "border-[color:var(--color-border-muted)]",
    style: {
      iconBg: "var(--color-surface-subtle)",
      iconColor: "var(--color-brand-primary)",
      borderColor: "var(--color-border-muted)",
    },
  };
};

function FeatureCard({ card, index }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  const config = getCardConfig(index);

  return (
    <article className="group h-full">
      {/* Minimalistische Karte */}
      <div
        className={cn(
          "glass-surface flex h-full flex-col gap-[var(--space-4)] rounded-2xl p-6",
          "transition-all duration-200 hover:shadow-elevated hover:-translate-y-1",
          "border border-[color:var(--color-border-muted)]",
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "inline-flex h-12 w-12 items-center justify-center rounded-xl",
            config.iconBg,
            "transition-colors duration-200 group-hover:bg-[color:var(--color-brand-primary-soft)]",
          )}
          style={{
            backgroundColor: config.style.iconBg,
          }}
        >
          <SanityIcon
            icon={icon}
            className="size-6"
            style={{
              color: config.style.iconColor,
            }}
          />
        </div>

        {/* Titel */}
        <h3 className="text-lg font-semibold text-[color:var(--color-text-base)] group-hover:text-[color:var(--color-brand-primary-active)] transition-colors duration-200">
          {title}
        </h3>

        {/* Beschreibung */}
        <div className="flex-grow">
          <RichText
            richText={richText}
            className="text-sm leading-relaxed text-[color:var(--color-text-muted)]"
          />
        </div>

        {/* Call-to-Action */}
        <div className="mt-4 flex items-center text-sm font-medium text-[color:var(--color-brand-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="mr-2">Mehr erfahren</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
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
    <AuroraSection
      variant="muted"
      withAurora={true}
      withTopDivider={true}
      withBottomDivider={true}
      className="py-[var(--space-12)] md:py-[var(--space-16)] lg:py-[var(--space-20)]"
    >
      <div className="layout-shell">
        <div className="flex flex-col items-center text-center">
          {/* Header Section */}
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
            {richText && (
              <RichText
                richText={richText}
                className="text-pretty text-[length:var(--step-0)] text-[color:var(--muted-foreground)]"
              />
            )}
          </div>
        </div>

        {/* Cards Grid */}
        {Array.isArray(cards) && cards.length > 0 && (
          <div className="mt-[var(--space-8)] w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[var(--space-6)]">
              {cards.map((card, index) => (
                <FeatureCard
                  key={`FeatureCard-${card?._key}-${index}`}
                  card={card}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </AuroraSection>
  );
}

import { Button } from "@workspace/ui/components/button";
import { ArrowRight, Check } from "lucide-react";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { AuroraSection } from "../ui/aurora-section";

export type CTABlockProps = PagebuilderType<"cta">;

const defaultItems = [
  "Kostenfreie Erstberatung",
  "BAFA-zertifiziert",
  "Vor-Ort in Lengede",
  "Individuelle Lösungen",
  "Fördermittelcheck inklusive",
];

const fallbackDescription =
  "Lassen Sie uns gemeinsam Ihre Immobilie energetisch optimieren. Wir beraten Sie kostenlos und unverbindlich.";

export function CTABlock({
  title = "Bereit für Ihre Energieberatung?",
  richText,
  buttons,
}: CTABlockProps) {
  const hasButtons = Array.isArray(buttons) && buttons.length > 0;
  const derivedItems = hasButtons
    ? (buttons
        .map((button) => button?.text?.trim())
        .filter(Boolean) as string[])
    : [];

  const items = derivedItems.length > 0 ? derivedItems : defaultItems;

  const hasRichTextContent = Array.isArray(richText) && richText.length > 0;

  return (
    <AuroraSection
      variant="hero"
      withAurora={true}
      withTopDivider={true}
      withBottomDivider={true}
      className="py-[var(--space-16)] md:py-[var(--space-20)] lg:py-[var(--space-24)]"
    >
      <div className="layout-shell">
        {/* Modern Grid Layout mit CSS Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-8)] lg:gap-[var(--space-12)] items-start">
          {/* Hauptinhalt - Responsive Grid-Spalten */}
          <div className="lg:col-span-7 xl:col-span-8">
            <div className="grid grid-cols-1 gap-[var(--space-6)]">
              {/* Titel */}
              <div className="grid grid-cols-1 gap-[var(--space-4)]">
                <h2 className="font-serif text-[length:var(--step-3)] lg:text-[length:var(--step-4)] leading-[1.1] text-[color:var(--color-brand-primary-active)] dark:text-[color:var(--color-text-inverse)]">
                  {title}
                </h2>

                {/* Text Content */}
                <div className="grid grid-cols-1 gap-[var(--space-4)]">
                  {hasRichTextContent ? (
                    <RichText
                      className="text-[length:var(--step--1)] lg:text-[length:var(--step-0)] leading-[var(--line-base)] text-[color:var(--color-text-muted)]"
                      richText={richText}
                    />
                  ) : (
                    <p className="text-[length:var(--step--1)] lg:text-[length:var(--step-0)] leading-[var(--line-base)] text-[color:var(--color-text-muted)]">
                      {fallbackDescription}
                    </p>
                  )}
                </div>
              </div>

              {/* Buttons Grid */}
              {hasButtons && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[var(--space-3)]">
                  {buttons?.map((button, index) => {
                    if (!button?.href) return null;
                    return (
                      <Button
                        key={`${button.href}-${index}`}
                        asChild
                        className="inline-flex items-center justify-center gap-[var(--space-2)] shadow-elevated transition-all duration-200 hover:scale-[1.02]"
                      >
                        <a
                          href={button.href}
                          target={button.openInNewTab ? "_blank" : "_self"}
                          rel={button.openInNewTab ? "noreferrer" : undefined}
                        >
                          {button.text || "Jetzt kontaktieren"}
                          <ArrowRight className="size-4" aria-hidden="true" />
                        </a>
                      </Button>
                    );
                  })}
                </div>
              )}

              {/* Trust Indicators */}
              <div className="grid grid-cols-1 gap-[var(--space-2)]">
                <p className="text-[length:var(--step--2)] uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">
                  Kostenlos & unverbindlich · Keine Datenweitergabe
                </p>
              </div>
            </div>
          </div>

          {/* Features Liste - Responsive Grid */}
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="grid grid-cols-1 gap-[var(--space-4)]">
              {/* Features Grid - 2 Spalten auf größeren Bildschirmen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-[var(--space-3)]">
                {items.map((item, idx) => (
                  <div
                    key={`${item}-${idx}`}
                    className="flex items-start gap-[var(--space-3)] p-[var(--space-3)] rounded-lg bg-[color:var(--color-surface-subtle)] hover:bg-[color:var(--color-surface-muted)] transition-colors duration-200"
                  >
                    <Check
                      className="mt-[2px] size-4 flex-shrink-0 text-[color:var(--color-brand-primary)]"
                      aria-hidden="true"
                    />
                    <span className="text-[length:var(--step--1)] font-medium text-[color:var(--color-text-base)] leading-tight">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuroraSection>
  );
}

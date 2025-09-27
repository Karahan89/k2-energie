import { Button } from "@workspace/ui/components/button";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

import type { PagebuilderType, SanityButtonProps } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";

type HeroBlockProps = PagebuilderType<"hero">;

const HIGHLIGHT_CLASS = "text-[color:var(--brand-blue-900)]";

function renderHighlightedTitle(
  title?: string | null,
  highlights?: Array<string | null>,
) {
  if (!title) return null;

  const highlightQueue = (highlights ?? []).filter(Boolean) as string[];

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

    const segments: Array<string | JSX.Element> = [];
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

function getPrimaryButton(buttons?: SanityButtonProps[] | null) {
  if (!buttons?.length) return undefined;
  return buttons[0];
}

export function HeroBlock({
  title,
  titleHighlights,
  richText,
  buttons,
  features,
  energyCard,
  badge,
}: HeroBlockProps) {
  const primaryButton = getPrimaryButton(buttons ?? []);
  const featureItems = (features ?? []).filter(Boolean) as string[];

  const card = energyCard ?? {};
  const efficiencyScore = Number(card.efficiencyScore ?? 0);
  const clampedScore = Number.isFinite(efficiencyScore)
    ? Math.max(0, Math.min(100, efficiencyScore))
    : 0;

  return (
    <AmbientSurface
      id="hero"
      variant="hero"
      className="my-[var(--space-12)] lg:my-[var(--space-14)]"
      withBottomDivider={false}
    >
      <div className="layout-shell-wide py-[var(--space-12)] lg:py-[var(--space-14)]">
        <div className="grid grid-cols-1 gap-[var(--space-10)] lg:grid-cols-[ minmax(0,1.1fr)_minmax(0,0.9fr) ] lg:items-center">
          <div className="flex flex-col gap-[var(--space-6)] text-left">
            {badge && (
              <span className="inline-flex w-max items-center rounded-full border border-[color:var(--border)] bg-[color:var(--surface-subtle)] px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--brand-blue-900)]">
                {badge}
              </span>
            )}

            <div className="space-y-[var(--space-4)]">
              <h1 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl lg:text-[clamp(3rem,3.6vw,3.8rem)]">
                {renderHighlightedTitle(title, titleHighlights)}
              </h1>
              <div className="max-w-2xl text-pretty text-base leading-relaxed text-[color:var(--neutral-500)] sm:text-lg">
                <RichText richText={richText} />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-4)] sm:flex-row sm:items-center">
              {primaryButton?.href && (
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="w-full sm:w-auto"
                >
                  <Link
                    href={primaryButton.href}
                    target={primaryButton.openInNewTab ? "_blank" : "_self"}
                  >
                    {primaryButton.text ?? "Kostenlose Erstberatung sichern"}
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
              )}
              <p className="text-sm text-[color:var(--neutral-500)]">
                Persönliche Analyse · BAFA-zugelassen · Antwort binnen
                24&nbsp;Stunden
              </p>
            </div>

            {featureItems.length > 0 && (
              <ul className="grid gap-3 sm:grid-cols-2">
                {featureItems.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 rounded-2xl bg-[color:var(--surface-subtle)] px-4 py-3 text-sm text-[color:var(--neutral-500)]"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[color:var(--brand-blue-900)]/10 text-[color:var(--brand-blue-900)]">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mx-auto w-full max-w-md">
            <article className="liquid-glass flex flex-col gap-[var(--space-5)] rounded-3xl p-8">
              <header className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--neutral-500)]">
                  {card.badge || "Förderfähig"}
                </p>
                <h2 className="text-lg font-semibold text-[color:var(--brand-blue-900)]">
                  {card.title || "Ihr Förder- und Effizienz-Check"}
                </h2>
                <p className="text-sm text-[color:var(--neutral-500)]">
                  {card.subtitle ||
                    "Orientierungswerte für ein Einfamilienhaus"}
                </p>
              </header>

              <dl className="grid grid-cols-1 gap-[var(--space-3)] text-sm text-[color:var(--neutral-500)]">
                <div className="flex justify-between rounded-2xl bg-[color:var(--surface-subtle)] px-4 py-3">
                  <dt>Jährliche Einsparung</dt>
                  <dd className="text-base font-semibold text-[color:var(--brand-blue-900)]">
                    {card.annualSavings || "1.850 €"}
                  </dd>
                </div>
                <div className="flex justify-between rounded-2xl bg-[color:var(--surface-subtle)] px-4 py-3">
                  <dt>CO₂-Reduktion</dt>
                  <dd className="text-base font-semibold text-[color:var(--brand-blue-900)]">
                    {card.co2Reduction || "−3,2 t"}
                  </dd>
                </div>
              </dl>

              <div className="space-y-3 rounded-2xl bg-[color:var(--surface-strong)] px-5 py-4 shadow-[var(--shadow-soft)]">
                <div className="flex items-center justify-between text-sm font-medium text-[color:var(--neutral-500)]">
                  <span>{card.efficiencyLabel || "Energieeffizienz"}</span>
                  <span className="text-[color:var(--brand-blue-900)]">
                    {(card.efficiencyFrom || "D") +
                      " → " +
                      (card.efficiencyTo || "A+")}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--surface-muted)]">
                  <div
                    className="h-full rounded-full bg-[color:var(--brand-accent-amber)]"
                    style={{ width: `${clampedScore || 0}%` }}
                  />
                </div>
                <p className="text-xs text-[color:var(--neutral-500)]">
                  {card.efficiencyCopy ||
                    "Mit Sanierungsfahrplan und Förderbegleitung erreichen Sie Ihr Ziel effizient und planbar."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-[var(--space-3)] text-xs text-[color:var(--neutral-500)]">
                <div className="rounded-2xl bg-[color:var(--surface-subtle)] px-4 py-3">
                  <p className="text-sm font-semibold text-[color:var(--brand-blue-900)]">
                    {card.temperature || "22 °C"}
                  </p>
                  <p>{card.temperatureLabel || "Optimale Raumtemperatur"}</p>
                </div>
                <div className="rounded-2xl bg-[color:var(--surface-subtle)] px-4 py-3">
                  <p className="text-sm font-semibold text-[color:var(--brand-blue-900)]">
                    {card.amortization || "8–12 Jahre"}
                  </p>
                  <p>{card.amortizationLabel || "Investition amortisiert"}</p>
                </div>
              </div>

              <footer className="flex items-center gap-3 rounded-2xl bg-[color:var(--surface-muted)] px-4 py-3 text-xs text-[color:var(--neutral-500)]">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--brand-blue-900)]/15 text-[color:var(--brand-blue-900)]">
                  {card.badgeIcon ?? "✓"}
                </span>
                <span>
                  {card.badgeCopy ||
                    "BAFA-anerkannte Energieberatung – staatliche Förderung inklusive."}
                </span>
              </footer>
            </article>
          </div>
        </div>
      </div>
    </AmbientSurface>
  );
}

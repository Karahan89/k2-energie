import { Button } from "@workspace/ui/components/button";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

import type { PagebuilderType, SanityButtonProps } from "@/types";

import { RichText } from "../elements/rich-text";

type HeroBlockProps = PagebuilderType<"hero">;

const HIGHLIGHT_CLASS =
  "text-[color:var(--primary-strong)] dark:text-[color:var(--neutral-000)]";

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
  // Corrected efficiencyScore to include a fallback for demo purposes
  const efficiencyScore = Number(card.efficiencyScore ?? 85);
  const clampedScore = Number.isFinite(efficiencyScore)
    ? Math.max(0, Math.min(100, efficiencyScore))
    : 0;

  return (
    <section className="relative overflow-hidden bg-[color:var(--surface-strong)]">
      {/* Soft gradient + subtle grid */}
      <div className="hero-bg pointer-events-none absolute inset-0 -z-10" />

      <div className="layout-shell-wide py-[var(--space-10)] lg:py-[var(--space-12)]">
        <div className="grid grid-cols-1 gap-[var(--space-8)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="flex flex-col gap-[var(--space-6)] text-left">
            {badge && (
              <div
                className="inline-flex items-center gap-2 self-start rounded-full px-3 py-1 text-sm"
                style={{
                  backgroundColor: "var(--primary-soft)",
                  color: "var(--primary-strong)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: "var(--secondary)" }}
                />
                {badge}
              </div>
            )}

            <div className="space-y-[var(--space-4)]">
              <h1
                className="font-serif"
                style={{
                  color: "var(--primary-strong)",
                  fontSize: "var(--step-5)",
                  lineHeight: 1.05,
                }}
              >
                {renderHighlightedTitle(title, titleHighlights)}
              </h1>
              <div
                className="content-readable"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "var(--step-1)",
                }}
              >
                <RichText richText={richText} />
              </div>
            </div>

            <div className="flex flex-col gap-[var(--space-4)] sm:flex-row sm:items-center">
              {primaryButton?.href && (
                <Button
                  asChild
                  size="lg"
                  variant="default"
                  className="w-full shadow-elevated sm:w-auto"
                  style={{
                    backgroundColor: "var(--accent)",
                    color: "var(--accent-foreground)",
                    border:
                      "1px solid color-mix(in srgb, var(--accent) 40%, transparent 60%)",
                  }}
                >
                  <Link
                    href={primaryButton.href}
                    target={primaryButton.openInNewTab ? "_blank" : "_self"}
                  >
                    {primaryButton.text ??
                      "Meine kostenlose Erstberatung buchen"}
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                </Button>
              )}
            </div>
            <p className="text-sm text-[color:var(--muted-foreground)]">
              Kostenlos & unverbindlich • Keine Datenweitergabe
            </p>

            {featureItems.length > 0 && (
              <div
                className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2"
                aria-label="Vertrauensmerkmale"
              >
                {featureItems.map((feature, index) => (
                  <div
                    key={feature}
                    className="flex items-center gap-x-5 gap-y-3"
                  >
                    <div className="inline-flex items-center gap-2 text-sm">
                      <ShieldCheck
                        className="size-4"
                        style={{ color: "var(--secondary)" }}
                        aria-hidden="true"
                      />
                      <span style={{ color: "var(--foreground)" }}>
                        {feature}
                      </span>
                    </div>
                    {index < featureItems.length - 1 && (
                      <span
                        aria-hidden="true"
                        style={{ color: "var(--border)" }}
                      >
                        •
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-auto w-full max-w-md">
            <article className="card shadow-elevated flex flex-col gap-y-0 overflow-hidden rounded-3xl">
              <div className="space-y-1 bg-[color:var(--surface-subtle)] p-6 md:p-7">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {card.badge || "Förderfähig"}
                </p>
                <h2
                  className="text-lg font-semibold"
                  style={{ color: "var(--primary-strong)" }}
                >
                  {card.title || "Ihr Förder- und Effizienz-Check"}
                </h2>
                <p
                  className="text-sm"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {card.subtitle ||
                    "Orientierungswerte für ein Einfamilienhaus"}
                </p>
              </div>

              <div className="flex flex-col gap-[var(--space-5)] p-6 md:p-7">
                <dl className="grid grid-cols-1 gap-[var(--space-3)] text-sm text-[color:var(--muted-foreground)]">
                  <div className="flex justify-between rounded-xl bg-[color:var(--surface-subtle)] px-4 py-3">
                    <dt>Jährliche Einsparung</dt>
                    <dd
                      className="text-base font-semibold"
                      style={{ color: "var(--primary-strong)" }}
                    >
                      {card.annualSavings || "1.850 €"}
                    </dd>
                  </div>
                  <div className="flex justify-between rounded-xl bg-[color:var(--surface-subtle)] px-4 py-3">
                    <dt>CO₂-Reduktion</dt>
                    <dd
                      className="text-base font-semibold"
                      style={{ color: "var(--primary-strong)" }}
                    >
                      {card.co2Reduction || "−3,2 t"}
                    </dd>
                  </div>
                </dl>

                <div className="space-y-3 rounded-xl bg-[color:var(--surface-subtle)] p-4">
                  <div
                    className="flex items-center justify-between text-sm font-medium"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    <span>{card.efficiencyLabel || "Energieeffizienz"}</span>
                    <span style={{ color: "var(--primary-strong)" }}>
                      {(card.efficiencyFrom || "D") +
                        " → " +
                        (card.efficiencyTo || "A+")}
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--muted)]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${clampedScore}%`,
                        backgroundColor: "var(--accent)",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-[var(--space-3)] text-xs text-[color:var(--muted-foreground)]">
                  <div className="rounded-xl bg-[color:var(--surface-subtle)] px-4 py-3">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--primary-strong)" }}
                    >
                      {card.temperature || "22 °C"}
                    </p>
                    <p>{card.temperatureLabel || "Optimale Raumtemperatur"}</p>
                  </div>
                  <div className="rounded-xl bg-[color:var(--surface-subtle)] px-4 py-3">
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--primary-strong)" }}
                    >
                      {card.amortization || "8–12 Jahre"}
                    </p>
                    <p>{card.amortizationLabel || "Investition amortisiert"}</p>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Quote } from "lucide-react";
import Link from "next/link";

import { AuroraSection } from "../ui/aurora-section";

interface CaseStudyMetric {
  readonly _key?: string;
  readonly label?: string | null;
  readonly value?: string | null;
}

interface CaseStudyQuote {
  readonly text?: string | null;
  readonly author?: string | null;
  readonly role?: string | null;
}

interface CaseStudyCompactProps {
  readonly _type: "caseStudyCompact";
  readonly _key: string;
  readonly title?: string;
  readonly client?: string | null;
  readonly sector?: string | null;
  readonly summary?: string | null;
  readonly metrics?: CaseStudyMetric[] | null;
  readonly results?: string[] | null;
  readonly quote?: CaseStudyQuote | null;
  readonly cta?: {
    readonly label?: string | null;
    readonly href?: string | null;
  } | null;
}

export function CaseStudyCompactSection({
  title = "Referenzprojekt",
  client,
  sector,
  summary,
  metrics = [],
  results = [],
  quote,
  cta,
}: CaseStudyCompactProps) {
  const normalizedMetrics = Array.isArray(metrics) ? metrics : [];
  const normalizedResults = Array.isArray(results) ? results : [];

  return (
    <AuroraSection
      variant="muted"
      withTopDivider
      withBottomDivider
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
    >
      <div className="layout-shell">
        <div className="grid gap-[var(--space-6)] lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-[var(--space-8)]">
          <Card className="border-border/60">
            <CardHeader className="space-y-[var(--space-3)]">
              <div className="flex flex-wrap items-center gap-[var(--space-2)] text-[length:var(--step--2)] uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
                {client ? <Badge variant="outline">{client}</Badge> : null}
                {sector ? <span>{sector}</span> : null}
              </div>
              <CardTitle className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
                {title}
              </CardTitle>
              {summary ? (
                <CardDescription className="text-pretty text-[length:var(--step--1)] leading-relaxed text-[color:var(--color-text-muted)]">
                  {summary}
                </CardDescription>
              ) : null}
            </CardHeader>
            <CardContent className="space-y-[var(--space-6)]">
              {normalizedMetrics.length > 0 ? (
                <div className="grid gap-[var(--space-3)] sm:grid-cols-2">
                  {normalizedMetrics.map(({ _key, label, value }, index) => (
                    <div
                      key={_key ?? `${label ?? "metric"}-${index}`}
                      className="rounded-2xl border border-[color:var(--color-border-muted)] bg-[color:var(--surface-muted)] px-[var(--space-4)] py-[var(--space-3)]"
                    >
                      <p className="text-[length:var(--step--2)] uppercase tracking-[0.18em] text-[color:var(--color-text-muted)]">
                        {label}
                      </p>
                      <p className="mt-[var(--space-1)] text-[length:var(--step-1)] font-semibold text-[color:var(--color-text-base)]">
                        {value}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}

              {normalizedResults.length > 0 ? (
                <ul className="list-disc space-y-[var(--space-2)] pl-[var(--space-4)] text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                  {normalizedResults.map((item, index) => (
                    <li key={`result-${index}`}>{item}</li>
                  ))}
                </ul>
              ) : null}

              {cta?.label && cta?.href ? (
                <Button size="sm" asChild>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ) : null}
            </CardContent>
          </Card>

          {quote?.text ? (
            <Card className="border-border/60 bg-[color:var(--surface-muted)]">
              <CardContent className="flex h-full flex-col justify-between gap-[var(--space-6)] p-[var(--space-6)]">
                <div className="space-y-[var(--space-4)]">
                  <Quote
                    size={32}
                    className="text-[color:var(--color-brand-primary-active)]"
                    aria-hidden
                  />
                  <p className="text-lg italic text-[color:var(--color-text-muted)]">
                    “{quote.text}”
                  </p>
                </div>
                <div className="text-sm font-medium text-[color:var(--color-text-muted)]">
                  {quote.author ? <div>{quote.author}</div> : null}
                  {quote.role ? (
                    <div className="text-xs uppercase tracking-[0.24em] text-[color:var(--color-text-muted)]/80">
                      {quote.role}
                    </div>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
      </div>
    </AuroraSection>
  );
}

import { Badge } from "@workspace/ui/components/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import { ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

import { AuroraSection } from "../ui/aurora-section";

interface NormItem {
  readonly _key?: string;
  readonly title?: string;
  readonly code?: string | null;
  readonly summary?: string | null;
  readonly mandatory?: boolean | null;
  readonly link?: string | null;
}

interface StandardsBadgeProps {
  readonly _type: "standardsBadge";
  readonly _key: string;
  readonly title?: string;
  readonly intro?: string;
  readonly norms?: NormItem[];
  readonly notes?: string[] | null;
}

export function StandardsBadgeSection({
  title = "Relevante Normen & Standards",
  intro,
  norms = [],
  notes = [],
}: StandardsBadgeProps) {
  const normalizedNorms = Array.isArray(norms) ? norms : [];
  const normalizedNotes = Array.isArray(notes) ? notes : [];

  if (normalizedNorms.length === 0) {
    return null;
  }

  return (
    <AuroraSection
      variant="muted"
      withTopDivider
      withBottomDivider
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
    >
      <div className="layout-shell">
        <div className="grid gap-[var(--space-10)] lg:grid-cols-[minmax(0,3.5fr)_minmax(0,5.5fr)]">
          <div className="content-readable space-y-[var(--space-4)]">
            <Badge className="inline-flex items-center gap-2 bg-[color:var(--color-brand-primary-soft)] text-[color:var(--color-brand-primary-active)]">
              <ShieldCheck size={16} aria-hidden />
              Normen & Richtlinien
            </Badge>
            <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
              {title}
            </h2>
            {intro ? (
              <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                {intro}
              </p>
            ) : null}
            {normalizedNotes.length > 0 ? (
              <ul className="mt-[var(--space-2)] list-disc space-y-[var(--space-2)] pl-[var(--space-4)] text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                {normalizedNotes.map((note, index) => (
                  <li key={`note-${index}`}>{note}</li>
                ))}
              </ul>
            ) : null}
          </div>
          <div className="grid gap-[var(--space-4)]">
            {normalizedNorms.map(
              ({ _key, title: normTitle, code, summary, mandatory, link }) => (
                <Card
                  key={_key ?? `${normTitle ?? "norm"}-${code ?? "n/a"}`}
                  className="border-border/60"
                >
                  <CardHeader className="flex flex-col gap-[var(--space-2)] sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-[var(--space-1)]">
                      <CardTitle className="text-lg font-semibold">
                        {normTitle ?? code ?? "Norm"}
                      </CardTitle>
                      {code ? (
                        <CardDescription className="font-mono text-xs uppercase tracking-[0.24em] text-[color:var(--color-brand-primary-active)]">
                          {code}
                        </CardDescription>
                      ) : null}
                    </div>
                    {mandatory ? (
                      <Badge className="bg-amber-100 text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
                        Verpflichtend
                      </Badge>
                    ) : null}
                  </CardHeader>
                  <CardContent className="space-y-[var(--space-3)] text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                    {summary ? (
                      <p className="leading-relaxed">{summary}</p>
                    ) : null}
                    {link ? (
                      <Link
                        href={link}
                        className={cn(
                          "inline-flex items-center gap-2 text-sm font-medium",
                          "text-[color:var(--color-brand-primary-active)] transition-colors hover:text-[color:var(--color-interactive-cta)]",
                        )}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Offizielle Quelle
                        <ExternalLink size={14} aria-hidden />
                      </Link>
                    ) : null}
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </div>
      </div>
    </AuroraSection>
  );
}

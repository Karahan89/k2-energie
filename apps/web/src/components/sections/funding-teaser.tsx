import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { ExternalLink, PiggyBank } from "lucide-react";
import Link from "next/link";

import { AuroraSection } from "../ui/aurora-section";

interface FundingItem {
  readonly _key?: string;
  readonly title?: string;
  readonly fundingRate?: string | null;
  readonly summary?: string | null;
  readonly eligible?: string | null;
}

interface FundingSource {
  readonly _key?: string;
  readonly label?: string | null;
  readonly url?: string | null;
}

interface FundingTeaserProps {
  readonly _type: "fundingTeaser";
  readonly _key: string;
  readonly title?: string;
  readonly description?: string;
  readonly items?: FundingItem[];
  readonly sources?: FundingSource[] | null;
}

export function FundingTeaserSection({
  title = "Fördermittel & Zuschüsse",
  description,
  items = [],
  sources = [],
}: FundingTeaserProps) {
  const normalizedItems = Array.isArray(items) ? items : [];
  const normalizedSources = Array.isArray(sources) ? sources : [];

  if (normalizedItems.length === 0) {
    return null;
  }

  return (
    <AuroraSection
      variant="muted"
      withTopDivider
      withBottomDivider
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
    >
      <div className="layout-shell space-y-[var(--space-8)]">
        <div className="content-readable mx-auto text-center space-y-[var(--space-3)]">
          <Badge className="inline-flex items-center gap-2 bg-[color:var(--color-brand-primary-soft)] text-[color:var(--color-brand-primary-active)]">
            <PiggyBank size={16} aria-hidden />
            Förderprogramme
          </Badge>
          <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
            {title}
          </h2>
          {description ? (
            <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-[var(--space-4)] md:grid-cols-2">
          {normalizedItems.map(
            (
              { _key, title: itemTitle, fundingRate, summary, eligible },
              index,
            ) => (
              <Card
                key={_key ?? `${itemTitle ?? "funding"}-${index}`}
                className="h-full border-border/60"
              >
                <CardHeader className="space-y-[var(--space-2)]">
                  <CardTitle className="text-lg font-semibold text-[color:var(--color-text-base)]">
                    {itemTitle ?? "Förderprogramm"}
                  </CardTitle>
                  {fundingRate ? (
                    <Badge className="w-fit bg-emerald-100 text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-200">
                      {fundingRate}
                    </Badge>
                  ) : null}
                </CardHeader>
                <CardContent className="space-y-[var(--space-3)] text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                  {summary ? (
                    <CardDescription>{summary}</CardDescription>
                  ) : null}
                  {eligible ? (
                    <div className="rounded-md bg-[color:var(--surface-muted)] px-[var(--space-3)] py-[var(--space-2)]">
                      Förderberechtigt: {eligible}
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            ),
          )}
        </div>

        {normalizedSources.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-[var(--space-3)]">
            {normalizedSources.map(({ _key, label, url }, index) =>
              url && label ? (
                <Button
                  key={_key ?? `${label}-${index}`}
                  variant="outline"
                  size="sm"
                  asChild
                >
                  <Link href={url} target="_blank" rel="noreferrer noopener">
                    {label}
                    <ExternalLink size={14} className="ml-1" aria-hidden />
                  </Link>
                </Button>
              ) : null,
            )}
          </div>
        ) : null}
      </div>
    </AuroraSection>
  );
}

import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  Fan,
  GaugeCircle,
  Lightbulb,
  PanelTop,
  Snowflake,
  Wind,
} from "lucide-react";
import Link from "next/link";

import { AuroraSection } from "../ui/aurora-section";

const iconMap = {
  air: GaugeCircle,
  snowflake: Snowflake,
  wind: Wind,
  light: Lightbulb,
  heat: PanelTop,
  control: Fan,
} as const;

type IconKey = keyof typeof iconMap;

interface ProcessGridItem {
  readonly _key?: string;
  readonly title?: string;
  readonly description?: string | null;
  readonly icon?: IconKey | null;
  readonly kpi?: string | null;
}

interface ProcessGridProps {
  readonly _type: "processGrid";
  readonly _key: string;
  readonly title?: string;
  readonly description?: string;
  readonly items?: ProcessGridItem[];
  readonly cta?: {
    readonly label?: string | null;
    readonly href?: string | null;
  } | null;
}

export function ProcessGridSection({
  title = "Anlagen & Prozesse im Fokus",
  description,
  items = [],
  cta,
}: ProcessGridProps) {
  const normalizedItems = Array.isArray(items) ? items : [];

  if (normalizedItems.length === 0) {
    return null;
  }

  return (
    <AuroraSection
      variant="muted"
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
      withTopDivider
      withBottomDivider
    >
      <div className="layout-shell space-y-[var(--space-8)]">
        <div className="content-readable mx-auto text-center space-y-[var(--space-3)]">
          <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
            {title}
          </h2>
          {description ? (
            <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>

        <div className="grid gap-[var(--space-4)] md:grid-cols-2 xl:grid-cols-3">
          {normalizedItems.map(
            (
              {
                _key,
                title: itemTitle,
                description: itemDescription,
                icon,
                kpi,
              },
              index,
            ) => {
              const Icon = icon
                ? (iconMap[icon as IconKey] ?? iconMap.air)
                : iconMap.air;

              return (
                <Card
                  key={_key ?? `${itemTitle ?? "process"}-${index}`}
                  className="h-full border-border/60 transition-shadow hover:shadow-[var(--shadow-soft)]"
                >
                  <CardHeader className="space-y-[var(--space-3)]">
                    <div className="flex items-center gap-[var(--space-3)]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[color:var(--color-brand-primary-soft)] text-[color:var(--color-brand-primary-active)]">
                        <Icon size={22} aria-hidden />
                      </div>
                      <CardTitle className="text-lg font-semibold text-[color:var(--color-text-base)]">
                        {itemTitle ?? "Bereich"}
                      </CardTitle>
                    </div>
                    {itemDescription ? (
                      <CardDescription className="text-[length:var(--step--1)] leading-relaxed text-[color:var(--color-text-muted)]">
                        {itemDescription}
                      </CardDescription>
                    ) : null}
                  </CardHeader>
                  {kpi ? (
                    <CardContent>
                      <div className="rounded-lg bg-[color:var(--surface-muted)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--step--2)] font-medium text-[color:var(--color-text-muted)]">
                        KPI: {kpi}
                      </div>
                    </CardContent>
                  ) : null}
                </Card>
              );
            },
          )}
        </div>

        {cta?.label && cta?.href ? (
          <div className="flex justify-center pt-[var(--space-4)]">
            <Button size="lg" asChild>
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        ) : null}
      </div>
    </AuroraSection>
  );
}

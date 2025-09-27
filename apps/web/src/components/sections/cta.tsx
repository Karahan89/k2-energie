import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";

export type CTABlockProps = PagebuilderType<"cta">;

export function CTABlock({ richText, title, eyebrow, buttons }: CTABlockProps) {
  return (
    <AmbientSurface
      id="cta"
      variant="default"
      withTopDivider
      className="my-[var(--space-10)] py-[var(--space-12)] md:my-[var(--space-14)] lg:py-[var(--space-16)]"
    >
      <div className="layout-shell">
        <div className="mx-auto max-w-3xl space-y-[var(--space-5)] text-center">
          {eyebrow && (
            <Badge
              variant="secondary"
              className="mx-auto w-max rounded-full border border-[color:var(--border)] bg-[color:var(--surface-subtle)] px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em] text-[color:var(--brand-blue-900)]"
            >
              {eyebrow}
            </Badge>
          )}

          <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
            {title}
          </h2>

          <div className="text-[length:var(--step--1)] text-[color:var(--neutral-500)]">
            <RichText richText={richText} className="text-pretty" />
          </div>

          <SanityButtons
            buttons={buttons}
            buttonClassName="min-w-[min(100%,10rem)] sm:min-w-[10rem]"
            className="mt-[var(--space-3)] flex flex-col items-center justify-center gap-[var(--space-3)] sm:flex-row"
          />

          <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--neutral-500)]">
            Kostenfreie Erstberatung · Fördermittelcheck inklusive ·
            Individueller Maßnahmenplan
          </p>
        </div>
      </div>
    </AmbientSurface>
  );
}

import { Badge } from "@workspace/ui/components/badge";

import type { PagebuilderType } from "@/types";

import { RichText } from "../elements/rich-text";
import { SanityButtons } from "../elements/sanity-buttons";

export type CTABlockProps = PagebuilderType<"cta">;

export function CTABlock({ richText, title, eyebrow, buttons }: CTABlockProps) {
  return (
    <section className="my-[var(--space-10)] bg-[color:var(--brand-800)] text-[color:var(--neutral-000)]">
      <div className="layout-shell py-[var(--space-10)] md:py-[var(--space-12)]">
        <div className="mx-auto flex flex-col items-start gap-[var(--space-6)] md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl space-y-[var(--space-3)] text-left">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="w-max rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em] text-white"
              >
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-3xl font-semibold sm:text-[length:var(--step-3)]">
              {title}
            </h2>
            <div className="text-[length:var(--step--1)] text-white/80">
              <RichText richText={richText} className="text-pretty" />
            </div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">
              Kostenfreie Erstberatung · Fördermittelcheck inklusive ·
              Individueller Maßnahmenplan
            </p>
          </div>

          <SanityButtons
            buttons={buttons}
            buttonClassName="min-w-[min(100%,12rem)] sm:min-w-[12rem]"
            className="flex flex-col items-stretch gap-[var(--space-3)] sm:flex-row"
          />
        </div>
      </div>
    </section>
  );
}

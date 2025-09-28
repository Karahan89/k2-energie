import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Badge } from "@workspace/ui/components/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";

type FaqAccordionProps = PagebuilderType<"faqAccordion">;

export function FaqAccordion({
  eyebrow,
  title,
  subtitle,
  faqs,
  link,
}: FaqAccordionProps) {
  return (
    <AmbientSurface
      id="faq"
      variant="muted"
      className="my-[var(--space-12)] py-[var(--space-12)]"
    >
      <div className="layout-shell">
        <div className="flex w-full flex-col items-center text-center">
          <div className="content-readable flex flex-col items-center space-y-[var(--space-3)] text-center sm:space-y-[var(--space-4)]">
            {eyebrow && (
              <Badge
                variant="secondary"
                className="rounded-full border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em] text-[color:var(--brand-800)] dark:text-[color:var(--neutral-000)]/85"
              >
                {eyebrow}
              </Badge>
            )}
            <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--neutral-500)]">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto mt-[var(--space-8)] max-w-3xl lg:mt-[var(--space-10)]">
          <div className="rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] px-6 py-6 shadow-[var(--shadow-soft)] sm:px-8">
            <Accordion
              type="single"
              collapsible
              className="w-full"
              defaultValue={faqs?.[0]?._id}
            >
              {faqs?.map((faq, index) => (
                <AccordionItem
                  value={faq?._id}
                  key={`AccordionItem-${faq?._id ?? index}-${index}`}
                  className="border-b border-[color:var(--border)]/60 last:border-none"
                >
                  <AccordionTrigger className="group py-4 text-left text-[length:var(--step--1)] font-medium text-[color:var(--brand-800)] transition-colors hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] dark:text-[color:var(--neutral-000)]">
                    <span className="flex items-center justify-between gap-3 text-left">
                      {faq?.title}
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-[color:var(--brand-800)] transition-transform duration-200 group-data-[state=open]:rotate-45 dark:text-[color:var(--neutral-000)]"
                        aria-hidden="true"
                      />
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4 text-[color:var(--neutral-500)]">
                    <RichText
                      richText={faq?.richText ?? []}
                      className="text-[length:var(--step--1)] leading-relaxed"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {link?.href && (
              <div className="mt-[var(--space-4)] border-t border-[color:var(--border)] pt-[var(--space-4)] text-left">
                {link.title && (
                  <p className="text-[length:var(--step--2)] uppercase tracking-[0.24em] text-[color:var(--neutral-500)]">
                    {link.title}
                  </p>
                )}
                <Link
                  href={link.href ?? "#"}
                  target={link.openInNewTab ? "_blank" : "_self"}
                  className="mt-1 inline-flex items-center gap-2 text-[length:var(--step--1)] font-semibold text-[color:var(--brand-800)] transition-colors hover:text-[color:var(--accent-500)] dark:text-[color:var(--neutral-000)]"
                >
                  {link?.description}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AmbientSurface>
  );
}

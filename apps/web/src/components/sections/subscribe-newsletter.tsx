"use client";
import { Button } from "@workspace/ui/components/button";
import { ChevronRight, LoaderCircle } from "lucide-react";
import Form from "next/form";
import { useFormStatus } from "react-dom";

// import { newsletterSubmission } from "@/action/newsletter-submission";
import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";

type SubscribeNewsletterProps = PagebuilderType<"subscribeNewsletter">;

export default function SubscribeNewsletterButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      size="icon"
      type="submit"
      disabled={pending}
      variant="default"
      aria-label={
        pending ? "Abonnement wird gesendet" : "Zum Newsletter anmelden"
      }
      className="shrink-0"
    >
      <span className="flex items-center justify-center">
        {pending ? (
          <LoaderCircle
            className="size-5 animate-spin text-primary-foreground"
            strokeWidth={2}
            aria-hidden="true"
          />
        ) : (
          <ChevronRight
            className="size-5 text-primary-foreground"
            strokeWidth={2}
            aria-hidden="true"
          />
        )}
      </span>
    </Button>
  );
}

export function SubscribeNewsletter({
  title,
  subTitle,
  helperText,
}: SubscribeNewsletterProps) {
  return (
    <AmbientSurface
      id="subscribe"
      variant="muted"
      className="my-[var(--space-12)] py-[var(--space-12)]"
      withTopDivider
    >
      <div className="layout-shell">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-[var(--space-6)] rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] p-8 shadow-[var(--shadow-soft)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 space-y-[var(--space-3)] text-left">
            <h2 className="text-2xl font-semibold text-[color:var(--brand-800)] dark:text-[color:var(--neutral-000)]">
              {title || "Förder-Update für Eigentümer:innen"}
            </h2>
            {subTitle && (
              <RichText
                richText={subTitle}
                className="text-sm leading-relaxed text-[color:var(--neutral-500)]"
              />
            )}
            <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--neutral-500)]">
              Monatlicher Newsletter · Relevante BAFA & KfW Änderungen · Keine
              Werbung
            </p>
          </div>
          <Form
            className="flex w-full max-w-md flex-col gap-[var(--space-3)] sm:flex-row"
            action={() => {}}
          >
            <div className="flex w-full items-center gap-[var(--space-2)] rounded-full border border-[color:var(--input)] bg-[color:var(--surface-subtle)] px-[var(--space-3)] py-[var(--space-2)]">
              <input
                type="email"
                name="email"
                required
                placeholder="E-Mail-Adresse"
                className="w-full bg-transparent text-[length:var(--step--1)] text-[color:var(--foreground)] placeholder:text-[color:var(--neutral-500)] focus-visible:outline-none"
              />
              <SubscribeNewsletterButton />
            </div>
          </Form>
        </div>
        {helperText && (
          <div className="mt-[var(--space-3)] text-center text-xs text-[color:var(--neutral-500)]">
            <RichText richText={helperText} />
          </div>
        )}
      </div>
    </AmbientSurface>
  );
}

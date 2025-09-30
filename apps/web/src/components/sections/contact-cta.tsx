import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Mail, PhoneCall, User } from "lucide-react";
import Link from "next/link";

import { AuroraSection } from "../ui/aurora-section";

interface ContactCtaProps {
  readonly _type: "contactCta";
  readonly _key: string;
  readonly title?: string;
  readonly description?: string;
  readonly contactName?: string | null;
  readonly contactRole?: string | null;
  readonly phone?: string | null;
  readonly email?: string | null;
  readonly cta?: {
    readonly label?: string | null;
    readonly href?: string | null;
  } | null;
  readonly secondaryCta?: {
    readonly label?: string | null;
    readonly href?: string | null;
  } | null;
}

export function ContactCtaSection({
  title = "Jetzt unverbindlich anfragen",
  description,
  contactName,
  contactRole,
  phone,
  email,
  cta,
  secondaryCta,
}: ContactCtaProps) {
  return (
    <AuroraSection
      variant="muted"
      withTopDivider
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
    >
      <div className="layout-shell">
        <Card className="border-border/60 bg-[color:var(--surface-muted)]">
          <CardContent className="flex flex-col gap-[var(--space-6)] p-[var(--space-6)] sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-[var(--space-3)] text-center sm:text-left">
              <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
                {title}
              </h2>
              {description ? (
                <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
                  {description}
                </p>
              ) : null}
              <div className="flex flex-col items-center gap-[var(--space-2)] text-sm text-[color:var(--color-text-muted)] sm:items-start">
                {contactName ? (
                  <div className="inline-flex items-center gap-[var(--space-2)]">
                    <User size={16} aria-hidden />
                    <span>
                      {contactName}
                      {contactRole ? ` · ${contactRole}` : ""}
                    </span>
                  </div>
                ) : null}
                {phone ? (
                  <a
                    className="inline-flex items-center gap-[var(--space-2)] transition-colors hover:text-[color:var(--color-text-base)]"
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                  >
                    <PhoneCall size={16} aria-hidden />
                    {phone}
                  </a>
                ) : null}
                {email ? (
                  <a
                    className="inline-flex items-center gap-[var(--space-2)] transition-colors hover:text-[color:var(--color-text-base)]"
                    href={`mailto:${email}`}
                  >
                    <Mail size={16} aria-hidden />
                    {email}
                  </a>
                ) : null}
              </div>
            </div>

            <div className="flex w-full max-w-sm flex-col gap-[var(--space-3)]">
              {cta?.label && cta?.href ? (
                <Button size="lg" asChild>
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ) : null}
              {secondaryCta?.label && secondaryCta?.href ? (
                <Button size="lg" variant="outline" asChild>
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </Button>
              ) : null}
            </div>
          </CardContent>
        </Card>
      </div>
    </AuroraSection>
  );
}

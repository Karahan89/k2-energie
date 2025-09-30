"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { type FormEvent, useState } from "react";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { AuroraSection } from "../ui/aurora-section";

type ContactFormProps = PagebuilderType<"contactForm">;

type ContactField = NonNullable<ContactFormProps["fields"]>[number];

const fieldTypeToInputType: Record<string, string> = {
  text: "text",
  email: "email",
  tel: "tel",
  textarea: "text",
};

const baseFieldClasses =
  "w-full rounded-2xl border border-[color:var(--input-border)] bg-[color:var(--input-background)] px-[var(--space-3)] text-[color:var(--input-text)] shadow-soft transition-colors placeholder:text-[color:var(--input-placeholder)] focus-visible:outline-none focus-visible:ring-[var(--focus-ring-width)] focus-visible:ring-[color:var(--focus-ring-color)] focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--color-surface-base)] dark:focus-visible:ring-offset-[color:var(--color-background-base)]";

export function ContactFormSection({
  eyebrow,
  title,
  intro,
  fields,
  privacyNotice,
  submitLabel,
  successMessage,
}: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    form.reset();
    setSubmitted(true);
  };

  const renderField = (field: ContactField) => {
    const id = `contact-${field.name}`;
    const isTextArea = field.fieldType === "textarea";

    if (isTextArea) {
      return (
        <textarea
          id={id}
          name={field.name ?? id}
          required={field.required ?? false}
          aria-required={field.required ?? false}
          placeholder={field.placeholder ?? ""}
          className={cn(baseFieldClasses, "min-h-32 py-[var(--space-3)]")}
        />
      );
    }

    return (
      <input
        id={id}
        name={field.name ?? id}
        type={fieldTypeToInputType[field.fieldType ?? "text"] ?? "text"}
        required={field.required ?? false}
        aria-required={field.required ?? false}
        placeholder={field.placeholder ?? ""}
        className={cn(baseFieldClasses, "h-12")}
      />
    );
  };

  return (
    <AuroraSection
      variant="muted"
      withAurora={true}
      withTopDivider={true}
      withBottomDivider={true}
      className="py-[var(--space-16)] md:py-[var(--space-20)] lg:py-[var(--space-24)]"
    >
      <div className="layout-shell flex flex-col gap-[var(--space-8)] lg:flex-row">
        <div className="flex-1 space-y-[var(--space-4)]">
          {eyebrow ? (
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">
              {eyebrow}
            </span>
          ) : null}
          <h2 className="font-serif text-[length:var(--step-3)] leading-[1.2] text-[color:var(--color-brand-primary-active)] dark:text-[color:var(--color-text-inverse)]">
            {title}
          </h2>
          {intro?.length ? (
            <RichText
              richText={intro}
              className="text-[color:var(--color-text-muted)]"
            />
          ) : null}
          {submitted && successMessage ? (
            <p className="rounded-2xl border border-[color:var(--color-status-success)] bg-[color:var(--color-status-success-bg)] px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--step--1)] text-[color:var(--color-status-success)]">
              {successMessage}
            </p>
          ) : null}
        </div>
        <form
          className="flex-1 space-y-[var(--space-4)]"
          onSubmit={handleSubmit}
          noValidate
        >
          {fields?.map((field) => (
            <div
              key={field._key ?? field.name ?? field.label}
              className="flex flex-col gap-[var(--space-2)]"
            >
              <label
                htmlFor={`contact-${field.name}`}
                className="text-sm font-medium text-[color:var(--color-text-base)]"
              >
                {field.label}
                {field.required ? (
                  <span className="text-[color:var(--color-status-error)]">
                    {" "}
                    *
                  </span>
                ) : null}
              </label>
              {renderField(field)}
            </div>
          ))}
          <div className="flex flex-col gap-[var(--space-4)] md:flex-row md:items-center md:justify-between">
            {privacyNotice?.length ? (
              <RichText
                richText={privacyNotice}
                className="text-xs text-[color:var(--color-text-muted)]"
              />
            ) : null}
            <Button type="submit" className="md:ml-auto">
              {submitLabel || "Nachricht senden"}
            </Button>
          </div>
        </form>
      </div>
    </AuroraSection>
  );
}

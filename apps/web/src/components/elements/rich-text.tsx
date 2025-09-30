"use client";

import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextReactComponents,
} from "next-sanity";

import { parseChildrenToSlug } from "@/utils";

import { SanityImage } from "./sanity-image";

const baseParagraphClass =
  "text-[length:var(--step--1)] leading-[var(--line-base)] text-[color:var(--color-text-muted)]";

function headingClasses(level: 2 | 3 | 4 | 5 | 6) {
  const shared = "first:mt-0 text-pretty";
  switch (level) {
    case 2:
      return cn(
        shared,
        "mt-[var(--space-6)] font-serif text-[length:var(--step-3)] leading-[1.2] tracking-[var(--tracking-tight)] text-[color:var(--color-brand-primary-active)]",
      );
    case 3:
      return cn(
        shared,
        "mt-[var(--space-5)] font-sans text-[length:var(--step-2)] font-semibold leading-[1.3] text-[color:var(--color-brand-primary-active)]",
      );
    case 4:
      return cn(
        shared,
        "mt-[var(--space-4)] font-sans text-[length:var(--step-1)] font-semibold leading-[1.35] text-[color:var(--color-text-base)]",
      );
    case 5:
      return cn(
        shared,
        "mt-[var(--space-3)] font-sans text-[length:var(--step-0)] font-semibold leading-[1.4] text-[color:var(--color-text-base)]",
      );
    case 6:
    default:
      return cn(
        shared,
        "mt-[var(--space-3)] font-sans text-[length:var(--step--1)] font-semibold uppercase tracking-[var(--tracking-wide)] text-[color:var(--color-text-muted)]",
      );
  }
}

const listClassName = cn(
  baseParagraphClass,
  "ms-[var(--space-4)] list-outside space-y-[var(--space-2)] ps-[var(--space-3)]",
);

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className={baseParagraphClass}>{children}</p>,
    h2: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h2 id={slug} className={headingClasses(2)}>
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h3 id={slug} className={headingClasses(3)}>
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h4 id={slug} className={headingClasses(4)}>
          {children}
        </h4>
      );
    },
    h5: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h5 id={slug} className={headingClasses(5)}>
          {children}
        </h5>
      );
    },
    h6: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h6 id={slug} className={headingClasses(6)}>
          {children}
        </h6>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul
        className={cn(
          listClassName,
          "list-disc marker:text-[color:var(--color-brand-primary)]",
        )}
      >
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol
        className={cn(
          listClassName,
          "list-decimal marker:font-semibold marker:text-[color:var(--color-brand-primary-active)]",
        )}
      >
        {children}
      </ol>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="rounded-md border border-[color:var(--color-border-muted)] bg-[color:var(--color-surface-muted)] px-[var(--space-1)] py-[var(--space-1)] text-[length:var(--step--2)] text-[color:var(--color-text-base)]">
        {children}
      </code>
    ),
    brand: ({ children }) => (
      <span className="font-semibold text-[color:var(--color-text-brand)]">
        {children}
      </span>
    ),
    customLink: ({ children, value }) => {
      if (!value.href || value.href === "#") {
        console.warn("RichText: link is not set", value);
        return (
          <span className="underline decoration-dotted underline-offset-[0.3em] text-[color:var(--color-status-warning)]">
            Link nicht gesetzt
          </span>
        );
      }
      return (
        <Link
          className="underline decoration-dotted underline-offset-[0.3em] text-[color:var(--color-interactive-cta)] transition-colors hover:text-[color:var(--color-interactive-cta-hover)]"
          href={value.href}
          prefetch={false}
          target={value.openInNewTab ? "_blank" : "_self"}
          rel={value.openInNewTab ? "noreferrer" : undefined}
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.id) return null;
      return (
        <figure className="space-y-[var(--space-2)]">
          <SanityImage
            image={value}
            className="h-auto w-full rounded-3xl object-cover"
            width={1600}
            height={900}
          />
          {value?.caption ? (
            <figcaption className="text-center text-[length:var(--step--2)] text-[color:var(--color-text-muted)]">
              {value.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  hardBreak: () => <br />,
};

export function RichText<T>({
  richText,
  className,
}: {
  richText?: T | null;
  className?: string;
}) {
  if (!richText) return null;

  return (
    <div
      className={cn(
        "richtext flex flex-col gap-[var(--space-3)] text-[length:var(--step--1)] leading-[var(--line-base)] text-[color:var(--color-text-muted)]",
        className,
      )}
    >
      <PortableText
        value={richText as unknown as PortableTextBlock[]}
        components={components}
        onMissingComponent={(_, { nodeType, type }) =>
          console.log("missing component", nodeType, type)
        }
      />
    </div>
  );
}

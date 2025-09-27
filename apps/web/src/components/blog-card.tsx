"use client";
import Link from "next/link";

import type { QueryBlogIndexPageDataResult } from "@/lib/sanity/sanity.types";

import { SanityImage } from "./elements/sanity-image";

type Blog = NonNullable<
  NonNullable<QueryBlogIndexPageDataResult>["blogs"]
>[number];

interface BlogImageProps {
  image: Blog["image"];
  title?: string | null;
}

function BlogImage({ image, title }: BlogImageProps) {
  if (!image?.id) return null;

  return (
    <SanityImage
      image={image}
      width={800}
      height={400}
      alt={title ?? "Blog post image"}
      className="aspect-[16/9] w-full rounded-3xl border border-white/40 object-cover shadow-soft sm:aspect-[2/1] lg:aspect-[3/2]"
    />
  );
}

interface BlogCardProps {
  blog: Blog;
}

function BlogMeta({ publishedAt }: { publishedAt: string | null }) {
  return (
    <div className="flex items-center gap-3 py-[var(--space-2)] text-[length:var(--step--2)] uppercase tracking-[0.18em] text-muted-foreground">
      <time
        dateTime={publishedAt ?? ""}
        className="glass-surface glass-surface-neutral rounded-full px-4 py-1"
      >
        {publishedAt
          ? new Date(publishedAt).toLocaleDateString("de-DE", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })
          : ""}
      </time>
    </div>
  );
}

function BlogContent({
  title,
  slug,
  description,
  isFeatured,
}: {
  title: string | null;
  slug: string | null;
  description: string | null;
  isFeatured?: boolean;
}) {
  const HeadingTag = isFeatured ? "h2" : "h3";
  const headingClasses = isFeatured
    ? "text-balance text-[length:var(--step-2)] font-semibold leading-snug"
    : "text-balance text-[length:var(--step-0)] font-semibold leading-tight";

  return (
    <div className="group relative space-y-[var(--space-3)]">
      <HeadingTag className={headingClasses}>
        <Link href={slug ?? "#"}>
          <span className="absolute inset-0" />
          {title}
        </Link>
      </HeadingTag>
      <p className="content-readable text-[length:var(--step--1)] leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

export function FeaturedBlogCard({ blog }: BlogCardProps) {
  const { title, publishedAt, slug, description, image } = blog ?? {};

  return (
    <article className="glass-surface glass-surface-neutral grid w-full grid-cols-1 gap-[var(--space-5)] rounded-3xl p-6 shadow-soft transition-transform hover:-translate-y-[3px] hover:shadow-elevated lg:grid-cols-[1.05fr_0.95fr] lg:p-8">
      <BlogImage image={image} title={title} />
      <div className="flex flex-col gap-[var(--space-4)]">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent
          title={title}
          slug={slug}
          description={description}
          isFeatured
        />
        {/* <AuthorSection authors={authors} /> */}
      </div>
    </article>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  if (!blog) {
    return (
      <article className="grid grid-cols-1 gap-4 w-full">
        <div className="h-48 bg-muted rounded-2xl animate-pulse" />
        <div className="space-y-2">
          <div className="h-4 w-24 bg-muted rounded animate-pulse" />
          <div className="h-6 w-full bg-muted rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
        </div>
      </article>
    );
  }

  const { title, publishedAt, slug, description, image } = blog;

  return (
    <article className="glass-surface glass-surface-neutral flex w-full flex-col gap-[var(--space-3)] rounded-2xl p-5 shadow-soft transition-transform hover:-translate-y-[2px] hover:shadow-elevated">
      <div className="relative w-full overflow-hidden rounded-3xl">
        <BlogImage image={image} title={title} />
        <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/30" />
      </div>
      <div className="flex flex-col gap-[var(--space-3)]">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent title={title} slug={slug} description={description} />
        {/* <AuthorSection authors={authors} /> */}
      </div>
    </article>
  );
}

export function BlogHeader({
  title,
  description,
}: {
  title: string | null;
  description: string | null;
}) {
  return (
    <div className="layout-shell">
      <div className="content-readable mx-auto text-center">
        <h1 className="text-balance text-[length:var(--step-2)] font-semibold sm:text-[length:var(--step-3)]">
          {title}
        </h1>
        <p className="mt-[var(--space-3)] text-[length:var(--step--1)] leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

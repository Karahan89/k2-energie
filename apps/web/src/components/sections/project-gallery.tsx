import { Button } from "@workspace/ui/components/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

import type { PagebuilderType, SanityImageProps } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";
import { AuroraSection } from "../ui/aurora-section";

type ProjectGalleryProps = PagebuilderType<"projectGallery">;

type GalleryProject = NonNullable<ProjectGalleryProps["projects"]>[number];

const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  year: "numeric",
  month: "long",
});

function formatDate(date?: string | null) {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return dateFormatter.format(parsed);
}

function resolveHref(slug?: string | null) {
  if (!slug) return "#";
  return slug.startsWith("/") ? slug : `/${slug}`;
}

function ProjectCard({ project }: { project: GalleryProject }) {
  const href = resolveHref(project.slug);
  const formattedDate = formatDate(project.date);
  const coverImage =
    project.coverImage && typeof project.coverImage === "object"
      ? (project.coverImage as SanityImageProps)
      : undefined;

  return (
    <Link
      href={href}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-strong)] shadow-[var(--shadow-soft)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[color:var(--surface-muted)]">
        {coverImage ? (
          <SanityImage
            image={coverImage}
            alt={project.title ?? "Referenz"}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-[color:var(--color-text-muted)]">
            Bild folgt
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-[var(--space-3)] p-[var(--space-5)]">
        {formattedDate ? (
          <span className="text-xs uppercase tracking-[0.3em] text-[color:var(--color-text-muted)]">
            {formattedDate}
          </span>
        ) : null}
        <h3 className="text-xl font-semibold text-[color:var(--color-brand-primary-active)] group-hover:text-[color:var(--color-brand-primary-hover)] dark:text-[color:var(--color-text-inverse)]">
          {project.title}
        </h3>
        {project.summary ? (
          <p className="text-sm leading-relaxed text-[color:var(--color-text-muted)]">
            {project.summary}
          </p>
        ) : null}
        <span className="mt-auto inline-flex items-center gap-[var(--space-2)] text-sm font-semibold text-[color:var(--color-brand-primary)] group-hover:text-[color:var(--color-brand-primary-hover)]">
          Referenz ansehen
          <ChevronRight className="size-4" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function ProjectGallerySection({
  title,
  intro,
  projects,
  buttons,
}: ProjectGalleryProps) {
  if (!projects?.length) {
    return null;
  }

  return (
    <AuroraSection
      variant="default"
      withAurora={true}
      withTopDivider={true}
      withBottomDivider={true}
      className="py-[var(--space-16)] md:py-[var(--space-20)] lg:py-[var(--space-24)]"
    >
      <div className="layout-shell space-y-[var(--space-8)]">
        <div className="space-y-[var(--space-3)]">
          <h2 className="text-3xl font-semibold text-[color:var(--color-brand-primary-active)] dark:text-[color:var(--color-text-inverse)]">
            {title}
          </h2>
          {intro?.length ? (
            <RichText
              richText={intro}
              className="max-w-3xl text-[color:var(--color-text-muted)]"
            />
          ) : null}
        </div>
        <div
          className="grid-cards min-w-0-children"
          style={{ "--card-min": "300px" } as any}
        >
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        {buttons?.length ? (
          <div className="flex flex-wrap gap-[var(--space-3)]">
            {buttons.map((cta, index) => {
              if (!cta?.href) return null;
              return (
                <Button
                  key={cta._key ?? cta.text ?? cta.href ?? `button-${index}`}
                  asChild
                  variant={cta.variant ?? "default"}
                >
                  <Link
                    href={cta.href}
                    target={cta.openInNewTab ? "_blank" : undefined}
                    rel={cta.openInNewTab ? "noreferrer" : undefined}
                  >
                    {cta.text ?? "Mehr erfahren"}
                  </Link>
                </Button>
              );
            })}
          </div>
        ) : null}
      </div>
    </AuroraSection>
  );
}

"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute } from "next-sanity";
import { useCallback, useMemo } from "react";

import { dataset, projectId, studioUrl } from "@/config";
import type { QueryHomePageDataResult } from "@/lib/sanity/sanity.types";

import { CaseStudyCompactSection } from "./sections/case-study-compact";
import { ContactCtaSection } from "./sections/contact-cta";
import { ContactFormSection } from "./sections/contact-form-modern";
import { CTABlock } from "./sections/cta";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";
import { FundingTeaserSection } from "./sections/funding-teaser";
import { HeroBlock } from "./sections/hero-modern";
import { ImageLinkCards } from "./sections/image-link-cards";
import { ProcessGridSection } from "./sections/process-grid";
import { ProjectGallerySection } from "./sections/project-gallery-modern";
import { ServiceListSection } from "./sections/service-list";
import { StandardsBadgeSection } from "./sections/standards-badge";
import { SectionTransition } from "./ui/section-transition";

// More specific and descriptive type aliases
type PageBuilderBlock = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number];

export interface PageBuilderProps {
  readonly pageBuilder?: PageBuilderBlock[];
  readonly id: string;
  readonly type: string;
}

interface SanityDataAttributeConfig {
  readonly id: string;
  readonly type: string;
  readonly path: string;
}

/**
 * Helper function to create consistent Sanity data attributes
 */
function createSanityDataAttribute(config: SanityDataAttributeConfig): string {
  return createDataAttribute({
    id: config.id,
    baseUrl: studioUrl,
    projectId,
    dataset,
    type: config.type,
    path: config.path,
  }).toString();
}

/**
 * Error fallback component for unknown block types
 */
function UnknownBlockError({
  blockType,
  blockKey,
}: {
  blockType: string;
  blockKey: string;
}) {
  return (
    <div
      key={`${blockType}-${blockKey}`}
      className="flex items-center justify-center p-8 text-center text-muted-foreground bg-muted rounded-lg border-2 border-dashed border-muted-foreground/20"
      role="alert"
      aria-label={`Unknown block type: ${blockType}`}
    >
      <div className="space-y-2">
        <p>Component not found for block type:</p>
        <code className="font-mono text-sm bg-background px-2 py-1 rounded">
          {blockType}
        </code>
      </div>
    </div>
  );
}

/**
 * Hook to handle optimistic updates for page builder blocks
 */
interface PageBuilderOptimisticAction {
  readonly id?: string;
  readonly document?: {
    readonly pageBuilder?: PageBuilderBlock[] | null;
  } | null;
}

function useOptimisticPageBuilder(
  initialBlocks: PageBuilderBlock[],
  documentId: string,
) {
  return useOptimistic<PageBuilderBlock[], PageBuilderOptimisticAction>(
    initialBlocks,
    (currentBlocks, action) => {
      const optimisticAction = action as
        | PageBuilderOptimisticAction
        | undefined;
      if (
        optimisticAction?.id === documentId &&
        optimisticAction.document?.pageBuilder
      ) {
        return optimisticAction.document.pageBuilder as PageBuilderBlock[];
      }
      return currentBlocks;
    },
  );
}

/**
 * Custom hook for block component rendering logic
 */
function useBlockRenderer(id: string, type: string) {
  const createBlockDataAttribute = useCallback(
    (blockKey: string) =>
      createSanityDataAttribute({
        id,
        type,
        path: `pageBuilder[_key=="${blockKey}"]`,
      }),
    [id, type],
  );

  const renderBlock = useCallback(
    (block: PageBuilderBlock) => {
      const blockKey = `${block._type}-${block._key ?? "unknown"}`;
      const dataAttribute =
        typeof block._key === "string" && block._key.length > 0
          ? createBlockDataAttribute(block._key)
          : undefined;

      switch (block._type) {
        case "cta":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <CTABlock {...block} />
            </div>
          );
        case "faqAccordion":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <FaqAccordion {...block} />
            </div>
          );
        case "hero":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <HeroBlock {...block} />
            </div>
          );
        case "featureCardsIcon":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <FeatureCardsWithIcon {...block} />
            </div>
          );
        case "imageLinkCards":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ImageLinkCards {...block} />
            </div>
          );
        case "standardsBadge":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <StandardsBadgeSection {...block} />
            </div>
          );
        case "processGrid":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ProcessGridSection {...block} />
            </div>
          );
        case "fundingTeaser":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <FundingTeaserSection {...block} />
            </div>
          );
        case "caseStudyCompact":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <CaseStudyCompactSection {...block} />
            </div>
          );
        case "contactCta":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ContactCtaSection {...block} />
            </div>
          );
        case "contactForm":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ContactFormSection {...block} />
            </div>
          );
        case "projectGallery":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ProjectGallerySection {...block} />
            </div>
          );
        case "serviceList":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ServiceListSection {...block} />
            </div>
          );
        default: {
          const fallback = block as { _type?: string; _key?: string };
          return (
            <UnknownBlockError
              key={blockKey}
              blockType={fallback._type ?? "unknown"}
              blockKey={fallback._key ?? blockKey}
            />
          );
        }
      }
    },
    [createBlockDataAttribute],
  );

  return { renderBlock };
}

/**
 * PageBuilder component for rendering dynamic content blocks from Sanity CMS
 */
export function PageBuilder({
  pageBuilder: initialBlocksProp,
  id,
  type,
}: PageBuilderProps) {
  const initialBlocks = initialBlocksProp ?? ([] as PageBuilderBlock[]);
  const blocks = useOptimisticPageBuilder(initialBlocks, id);
  const { renderBlock } = useBlockRenderer(id, type);

  const containerDataAttribute = useMemo(
    () => createSanityDataAttribute({ id, type, path: "pageBuilder" }),
    [id, type],
  );

  if (!blocks.length) {
    return null;
  }

  return (
    <div
      className="flex w-full flex-col"
      data-sanity={containerDataAttribute}
      aria-label="Page content"
    >
      {blocks.map((block, index) => (
        <SectionTransition
          key={`${block._type}-${block._key ?? "unknown"}-${index}`}
          variant="slide"
          className="delay-100"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {renderBlock(block)}
        </SectionTransition>
      ))}
    </div>
  );
}

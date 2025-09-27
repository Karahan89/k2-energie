"use client";

import { useOptimistic } from "@sanity/visual-editing/react";
import { createDataAttribute } from "next-sanity";
import { useCallback, useMemo } from "react";

import { dataset, projectId, studioUrl } from "@/config";
import type { QueryHomePageDataResult } from "@/lib/sanity/sanity.types";

import { CTABlock } from "./sections/cta";
import { FaqAccordion } from "./sections/faq-accordion";
import { FeatureCardsWithIcon } from "./sections/feature-cards-with-icon";
import { HeroBlock } from "./sections/hero";
import { ImageLinkCards } from "./sections/image-link-cards";
import { SubscribeNewsletter } from "./sections/subscribe-newsletter";

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
      if (action?.id === documentId && action.document?.pageBuilder) {
        return action.document.pageBuilder;
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
        case "subscribeNewsletter":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <SubscribeNewsletter {...block} />
            </div>
          );
        case "imageLinkCards":
          return (
            <div key={blockKey} data-sanity={dataAttribute}>
              <ImageLinkCards {...block} />
            </div>
          );
        default:
          return (
            <UnknownBlockError
              key={blockKey}
              blockType={block._type}
              blockKey={block._key ?? blockKey}
            />
          );
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
  pageBuilder: initialBlocks = [],
  id,
  type,
}: PageBuilderProps) {
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
      className="flex w-full flex-col gap-[var(--space-8)] sm:gap-[var(--space-10)]"
      data-sanity={containerDataAttribute}
      aria-label="Page content"
    >
      {blocks.map(renderBlock)}
    </div>
  );
}

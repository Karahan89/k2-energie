import { notFound } from "next/navigation";

import { PageBuilder, type PageBuilderProps } from "@/components/pagebuilder";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { querySlugPageData, querySlugPagePaths } from "@/lib/sanity/query";
import type { QuerySlugPageDataResult } from "@/lib/sanity/sanity.types";
import { getSEOMetadata } from "@/lib/seo";

function normalizeSlug(slug: string) {
  if (!slug) return slug;
  return slug.startsWith("/") ? slug.slice(1) : slug;
}

async function fetchSlugPageData(slug: string, stega = true) {
  const normalizedSlug = normalizeSlug(slug);
  const slugWithLeading = normalizedSlug.startsWith("/")
    ? normalizedSlug
    : `/${normalizedSlug}`;
  return await sanityFetch({
    query: querySlugPageData,
    params: { slug: normalizedSlug || slugWithLeading, slugWithLeading },
    stega,
  });
}

function extractTitle(data: QuerySlugPageDataResult | null | undefined) {
  if (!data) return "";
  if ("title" in data && typeof data.title === "string") return data.title;
  if ("name" in data && typeof data.name === "string") return data.name;
  return data.seoTitle ?? "";
}

function extractDescription(data: QuerySlugPageDataResult | null | undefined) {
  if (!data) return "";
  if ("description" in data && typeof data.description === "string") {
    return data.description;
  }
  if ("summary" in data && typeof data.summary === "string") {
    return data.summary;
  }
  if ("bio" in data && typeof data.bio === "string") {
    return data.bio;
  }
  return data.seoDescription ?? "";
}

async function fetchSlugPagePaths() {
  const slugs = await client.fetch(querySlugPagePaths);
  const paths: { slug: string[] }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const parts = slug.split("/").filter(Boolean);
    if (parts.length === 0) continue;
    paths.push({ slug: parts });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString, false);
  return getSEOMetadata(
    pageData
      ? {
          title: extractTitle(pageData),
          description: extractDescription(pageData),
          slug: pageData?.slug,
          contentId: pageData?._id,
          contentType: pageData?._type,
        }
      : {},
  );
}

export async function generateStaticParams() {
  return await fetchSlugPagePaths();
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString);

  if (!pageData) {
    return notFound();
  }

  const pageBlocks = Array.isArray(
    (pageData as { pageBuilder?: PageBuilderProps["pageBuilder"] }).pageBuilder,
  )
    ? ((pageData as { pageBuilder?: PageBuilderProps["pageBuilder"] })
        .pageBuilder ?? [])
    : [];

  const pageTitle = extractTitle(pageData);
  const pageDescription = extractDescription(pageData);

  return pageBlocks.length === 0 ? (
    <div className="flex min-h-[50vh] flex-col items-center justify-center p-4 text-center">
      <h1 className="mb-4 text-2xl font-semibold capitalize">{pageTitle}</h1>
      <p className="mb-6 max-w-2xl text-muted-foreground">
        {pageDescription ||
          "Für diese Seite sind noch keine Inhalte hinterlegt."}
      </p>
    </div>
  ) : (
    <PageBuilder
      pageBuilder={pageBlocks}
      id={pageData._id}
      type={pageData._type}
    />
  );
}

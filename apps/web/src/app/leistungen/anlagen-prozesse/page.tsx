import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { ServiceListSection } from "@/components/sections/service-list";
import { sanityFetch } from "@/lib/sanity/live";
import { getSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

const categorySlug = "anlagen-prozesse";

const categoryQuery = /* groq */ `
  *[_type == "serviceCategory" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description,
    slug,
    icon,
    color,
    pageBuilder,
    seoTitle,
    seoDescription,
    seoNoIndex,
    ogTitle,
    ogDescription,
    ogImage
  }
`;

type CategoryPageData = {
  readonly _id: string;
  readonly _type: string;
  readonly title?: string;
  readonly description?: string;
  readonly slug?: { readonly current?: string };
  readonly icon?: string;
  readonly color?: string;
  readonly pageBuilder?: Parameters<typeof PageBuilder>[0]["pageBuilder"];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  readonly seoNoIndex?: boolean;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly ogImage?: unknown;
} | null;

async function fetchCategoryData() {
  return (await sanityFetch({
    query: categoryQuery,
    params: { slug: categorySlug },
    stega: true,
  })) as { data: CategoryPageData };
}

const DEFAULT_TITLE = "Anlagen & Prozesse";
const DEFAULT_DESCRIPTION =
  "Effizienzprojekte für Anlagen und Prozesse: Druckluft, Kälte, Lüftung, Beleuchtung, Abwärme und MSR.";

export async function generateMetadata() {
  const { data: category } = await fetchCategoryData();

  if (!category) {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
    };
  }

  return getSEOMetadata({
    title: category.seoTitle || category.title || DEFAULT_TITLE,
    description:
      category.seoDescription || category.description || DEFAULT_DESCRIPTION,
    slug: `leistungen/${categorySlug}`,
    contentId: category._id,
    contentType: category._type,
    seoNoIndex: category.seoNoIndex === true,
  });
}

export default async function AnlagenProzessePage() {
  const { data: category } = await fetchCategoryData();

  if (!category) {
    return notFound();
  }

  const pageBuilder = Array.isArray(category.pageBuilder)
    ? category.pageBuilder
    : [];

  const hasBlocks = pageBuilder.length > 0;

  return (
    <main className="space-y-12 py-12">
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {category.title || DEFAULT_TITLE}
        </h1>
        <p className="text-lg text-muted-foreground">
          {category.description || DEFAULT_DESCRIPTION}
        </p>
      </section>

      {hasBlocks ? (
        <PageBuilder
          pageBuilder={pageBuilder}
          id={category._id}
          type={category._type}
        />
      ) : (
        <section className="mx-auto max-w-6xl">
          <ServiceListSection
            _type="serviceList"
            _key="anlagen-prozesse-fallback"
            presetAudience={["nwg"]}
            presetDomain={["anlagen", "prozesse"]}
            enableClientFilters
            showCategories={false}
            maxItems={0}
          />
        </section>
      )}
    </main>
  );
}

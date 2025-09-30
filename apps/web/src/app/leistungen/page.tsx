import { notFound } from "next/navigation";

import { PageBuilder, type PageBuilderProps } from "@/components/pagebuilder";
import { ServiceListSection } from "@/components/sections/service-list";
import { sanityFetch } from "@/lib/sanity/live";
import { getSEOMetadata } from "@/lib/seo";

export const revalidate = 60;

const queryServicePage = `*[_type == "service"][0]{
  _id,
  _type,
  title,
  description,
  slug,
  pageBuilder,
  seoTitle,
  seoDescription,
  ogTitle,
  ogDescription,
  ogImage
}`;

type ServicePageData = {
  _id: string;
  _type: string;
  title: string;
  description: string;
  slug: { current: string };
  pageBuilder?: PageBuilderProps["pageBuilder"];
  seoTitle?: string;
  seoDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: unknown;
};

async function fetchServicePageData() {
  return (await sanityFetch({
    query: queryServicePage,
    stega: true,
  })) as { data: ServicePageData | null };
}

export async function generateMetadata() {
  const { data: pageData } = await fetchServicePageData();

  if (!pageData) {
    return {
      title: "Leistungen - k2-energie",
      description:
        "Unsere Leistungen im Bereich Energieberatung und Sanierungsplanung",
    };
  }

  return getSEOMetadata({
    title: pageData.seoTitle || pageData.title,
    description: pageData.seoDescription || pageData.description,
    slug: pageData.slug?.current,
    contentId: pageData._id,
    contentType: pageData._type,
  });
}

export default async function LeistungenPage() {
  const { data: pageData } = await fetchServicePageData();

  if (!pageData) {
    return notFound();
  }

  const pageBlocks = Array.isArray(pageData.pageBuilder)
    ? pageData.pageBuilder
    : [];

  const pageTitle = pageData.title;
  const pageDescription = pageData.description;

  return (
    <main className="space-y-12 py-12">
      <section className="mx-auto max-w-3xl space-y-4 text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">
          {pageTitle}
        </h1>
        <p className="text-lg text-muted-foreground">
          {pageDescription ||
            "Entdecken Sie unser komplettes Leistungsspektrum für Wohn- und Nichtwohngebäude."}
        </p>
      </section>

      {pageBlocks.length > 0 ? (
        <PageBuilder
          pageBuilder={pageBlocks}
          id={pageData._id}
          type={pageData._type}
        />
      ) : (
        <section className="mx-auto max-w-6xl">
          <ServiceListSection
            _type="serviceList"
            _key="leistungen-gesamt-fallback"
            showCategories
            enableClientFilters
            maxItems={0}
          />
        </section>
      )}
    </main>
  );
}

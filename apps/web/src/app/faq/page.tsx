import { notFound } from "next/navigation";

import { PageBuilder, type PageBuilderProps } from "@/components/pagebuilder";
import { client } from "@/lib/sanity/client";
import { sanityFetch } from "@/lib/sanity/live";
import { getSEOMetadata } from "@/lib/seo";

const queryFaqPage = `*[_type == "faq"][0]{
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

type FaqPageData = {
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
  ogImage?: any;
};

async function fetchFaqPageData() {
  return await sanityFetch({
    query: queryFaqPage,
    stega: true,
  });
}

export async function generateMetadata() {
  const { data: pageData } = await fetchFaqPageData();

  if (!pageData) {
    return {
      title: "Häufige Fragen - k2-energie",
      description:
        "Antworten auf häufige Fragen zur Energieberatung und Sanierungsplanung",
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

export default async function FaqPage() {
  const { data: pageData } = await fetchFaqPageData();

  if (!pageData) {
    return notFound();
  }

  const pageBlocks = Array.isArray(pageData.pageBuilder)
    ? pageData.pageBuilder
    : [];

  const pageTitle = pageData.title;
  const pageDescription = pageData.description;

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

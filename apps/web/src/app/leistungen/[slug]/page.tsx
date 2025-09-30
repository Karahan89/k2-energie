import { notFound } from "next/navigation";

import { PageBuilder } from "@/components/pagebuilder";
import { client } from "@/lib/sanity/client";
import { getSEOMetadata } from "@/lib/seo";
import { sanityFetch } from "@/lib/sanity/live";

export const revalidate = 60;

const serviceQuery = /* groq */ `
  *[_type == "serviceItem" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    teaser,
    slug,
    icon,
    audience,
    domain,
    lifecycle,
    serviceType,
    tags,
    featured,
    category,
    categoryRef->{
      _id,
      title,
      "slug": slug.current
    },
    pageBuilder,
    seoTitle,
    seoDescription,
    seoNoIndex,
    ogTitle,
    ogDescription,
    ogImage
  }
`;

const serviceSlugsQuery = /* groq */ `
  *[_type == "serviceItem" && defined(slug.current)]{
    "slug": slug.current
  }
`;

const staticSanityClient = client.withConfig({
  token: undefined,
  perspective: "published",
  stega: false,
  useCdn: true,
});

interface ServiceDocument {
  readonly _id: string;
  readonly _type: string;
  readonly title?: string;
  readonly teaser?: string;
  readonly slug?: { readonly current?: string };
  readonly icon?: string;
  readonly audience?: string[];
  readonly domain?: string[];
  readonly lifecycle?: string[];
  readonly serviceType?: string[];
  readonly tags?: string[];
  readonly featured?: boolean;
  readonly category?: string | null;
  readonly categoryRef?: {
    readonly _id?: string;
    readonly title?: string;
    readonly slug?: string | null;
  } | null;
  readonly pageBuilder?: Parameters<typeof PageBuilder>[0]["pageBuilder"];
  readonly seoTitle?: string;
  readonly seoDescription?: string;
  readonly seoNoIndex?: boolean;
  readonly ogTitle?: string;
  readonly ogDescription?: string;
  readonly ogImage?: unknown;
}

async function fetchServiceItem(slug: string) {
  return (await sanityFetch({
    query: serviceQuery,
    params: { slug },
    stega: true,
  })) as { data: ServiceDocument | null };
}

async function fetchServiceItemStatic(slug: string) {
  const data = await staticSanityClient.fetch<ServiceDocument | null>(
    serviceQuery,
    { slug },
  );

  return { data };
}

export async function generateStaticParams() {
  const data =
    await staticSanityClient.fetch<Array<{ slug?: string }>>(serviceSlugsQuery);

  if (!Array.isArray(data)) {
    return [];
  }

  return data
    .map((entry) => entry?.slug)
    .filter((slug): slug is string => typeof slug === "string")
    .map((slug) => ({ slug }));
}

type PageParams = { slug: string };

export async function generateMetadata({
  params,
}: {
  readonly params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const { data: service } = await fetchServiceItemStatic(slug);

  if (!service) {
    return {
      title: "Leistung nicht gefunden",
    };
  }

  return getSEOMetadata({
    title: service.seoTitle || service.title || "Leistung",
    description: service.seoDescription || service.teaser || undefined,
    slug: `leistungen/${slug}`,
    contentId: service._id,
    contentType: service._type,
    seoNoIndex: service.seoNoIndex === true,
  });
}

const labelMap: Record<string, string> = {
  wg: "Wohngebäude",
  nwg: "Nichtwohngebäude",
  gebaeude: "Gebäude",
  anlagen: "Anlagen",
  prozesse: "Prozesse",
  neubau: "Neubau",
  bestand: "Bestand",
  beratung: "Beratung",
  nachweis: "Nachweis",
  foerderung: "Förderung",
  audit: "Audit",
  zertifizierung: "Zertifizierung",
};

const baseTagClass =
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide";
const primaryTagClass = "border-transparent bg-primary/10 text-primary";
const outlineTagClass = "border-border text-muted-foreground";

export default async function ServiceDetailPage({
  params,
}: {
  readonly params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const { data: service } = await fetchServiceItem(slug);

  if (!service) {
    return notFound();
  }

  const pageBuilder = Array.isArray(service.pageBuilder)
    ? service.pageBuilder
    : [];

  if (pageBuilder.length === 0) {
    return (
      <article className="space-y-12 py-12">
        <header className="mx-auto flex max-w-4xl flex-col gap-6 text-center">
          <div className="flex flex-wrap justify-center gap-2">
            {service.categoryRef?.title ? (
              <span className={`${baseTagClass} ${primaryTagClass}`}>
                {service.categoryRef.title}
              </span>
            ) : null}
            {(service.audience ?? []).map((aud) => (
              <span
                key={`audience-${aud}`}
                className={`${baseTagClass} ${outlineTagClass}`}
              >
                {labelMap[aud] ?? aud}
              </span>
            ))}
            {(service.serviceType ?? []).map((type) => (
              <span
                key={`serviceType-${type}`}
                className={`${baseTagClass} ${outlineTagClass}`}
              >
                {labelMap[type] ?? type}
              </span>
            ))}
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground">
            {service.title ?? "Leistung"}
          </h1>
          {service.teaser ? (
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
              {service.teaser}
            </p>
          ) : null}
        </header>

        <div className="mx-auto max-w-3xl text-center text-muted-foreground">
          Für diese Leistung wurden in Sanity noch keine Inhaltsblöcke
          hinterlegt.
        </div>
      </article>
    );
  }

  return (
    <article className="py-12">
      <PageBuilder
        pageBuilder={pageBuilder}
        id={service._id}
        type={service._type}
      />
    </article>
  );
}

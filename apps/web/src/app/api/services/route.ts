import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { sanityFetch } from "@/lib/sanity/live";

export const revalidate = 60;

const SERVICE_PROJECTION = /* groq */ `
  _id,
  _type,
  title,
  slug,
  teaser,
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
    "slug": slug.current,
    order
  }
`;

function parseListParam(searchParams: URLSearchParams, key: string): string[] {
  const value = searchParams.get(key);

  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter((entry) => entry.length > 0);
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const audience = parseListParam(searchParams, "audience");
    const domain = parseListParam(searchParams, "domain");
    const lifecycle = parseListParam(searchParams, "lifecycle");
    const serviceType = parseListParam(searchParams, "serviceType");
    const tags = parseListParam(searchParams, "tags");
    const featured = searchParams.get("featured") === "true";
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number.parseInt(limitParam, 10) : NaN;

    const filters = [
      `_type == "serviceItem"`,
      `(!defined(seoHideFromLists) || seoHideFromLists == false)`,
    ];

    const params: Record<string, unknown> = {};

    if (audience.length > 0) {
      filters.push(`count(audience[@ in $audience]) > 0`);
      params.audience = audience;
    }

    if (domain.length > 0) {
      filters.push(`count(domain[@ in $domain]) > 0`);
      params.domain = domain;
    }

    if (lifecycle.length > 0) {
      filters.push(`count(lifecycle[@ in $lifecycle]) > 0`);
      params.lifecycle = lifecycle;
    }

    if (serviceType.length > 0) {
      filters.push(`count(serviceType[@ in $serviceType]) > 0`);
      params.serviceType = serviceType;
    }

    if (tags.length > 0) {
      filters.push(`count(tags[@ in $tags]) > 0`);
      params.tags = tags;
    }

    if (featured) {
      filters.push(`featured == true`);
    }

    const filterClause = filters.join(" && ");

    const query = /* groq */ `*[
      ${filterClause}
    ] | order(categoryRef->order asc, title asc) {
      ${SERVICE_PROJECTION}
    }`;

    const { data } = await sanityFetch({
      query,
      params,
      stega: false,
    });

    const services = Array.isArray(data) ? data : [];

    const limitedServices =
      Number.isFinite(limit) && limit > 0 ? services.slice(0, limit) : services;

    return NextResponse.json({
      services: limitedServices,
      success: true,
      filters: {
        audience,
        domain,
        lifecycle,
        serviceType,
        tags,
        featured,
        limit: Number.isFinite(limit) && limit > 0 ? limit : undefined,
      },
    });
  } catch (error) {
    console.error("Error fetching services:", error);

    return NextResponse.json(
      {
        services: [],
        success: false,
        error: "Failed to fetch services",
      },
      { status: 500 },
    );
  }
}

"use client";

import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import {
  ArrowRight,
  Building2,
  Factory,
  Home,
  Leaf,
  Lightbulb,
  TrendingUp,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { AuroraSection } from "../ui/aurora-section";

type AudienceValue = "wg" | "nwg";
type DomainValue = "gebaeude" | "anlagen" | "prozesse";
type LifecycleValue = "neubau" | "bestand";
type ServiceTypeValue =
  | "beratung"
  | "nachweis"
  | "foerderung"
  | "audit"
  | "zertifizierung";

type FilterKey = "lifecycle" | "domain" | "serviceType";

interface FilterGroup {
  key: FilterKey;
  label: string;
  options: { value: string; label: string }[];
}

const FILTER_GROUPS: FilterGroup[] = [
  {
    key: "lifecycle",
    label: "Lebenszyklus",
    options: [
      { value: "neubau", label: "Neubau" },
      { value: "bestand", label: "Bestand" },
    ],
  },
  {
    key: "domain",
    label: "Bereich",
    options: [
      { value: "anlagen", label: "Anlagen" },
      { value: "prozesse", label: "Prozesse" },
    ],
  },
  {
    key: "serviceType",
    label: "Leistungstyp",
    options: [
      { value: "foerderung", label: "Förderung" },
      { value: "audit", label: "Audit" },
      { value: "zertifizierung", label: "Zertifizierung" },
    ],
  },
];

const iconMap = {
  zap: Zap,
  home: Home,
  leaf: Leaf,
  "trending-up": TrendingUp,
  wrench: Wrench,
  lightbulb: Lightbulb,
} as const;

const categoryPresentation = {
  wohngebaeude: {
    label: "Wohngebäude",
    icon: Home,
    badgeClass:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-100",
  },
  nichtwohngebaeude: {
    label: "Nichtwohngebäude",
    icon: Building2,
    badgeClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-100",
  },
  "anlagen-prozesse": {
    label: "Anlagen & Prozesse",
    icon: Factory,
    badgeClass:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/60 dark:text-orange-100",
  },
} as const;

interface ServiceItem {
  _id: string;
  _type?: string;
  title: string;
  slug: { current: string };
  teaser?: string;
  icon?: keyof typeof iconMap;
  audience?: AudienceValue[];
  domain?: DomainValue[];
  lifecycle?: LifecycleValue[];
  serviceType?: ServiceTypeValue[];
  tags?: string[];
  featured?: boolean;
  category?: string | null;
  categoryRef?: {
    _id?: string;
    title?: string;
    slug?: string | null;
    order?: number | null;
  } | null;
}

interface ServiceListProps {
  _type: "serviceList";
  _key: string;
  title?: string;
  description?: string;
  showCategories?: boolean;
  maxItems?: number;
  showFeaturedOnly?: boolean;
  layout?: "grid" | "list" | "cards";
  showIcons?: boolean;
  showTeaser?: boolean;
  presetAudience?: readonly string[] | null;
  presetDomain?: readonly string[] | null;
  presetLifecycle?: readonly string[] | null;
  presetServiceType?: readonly string[] | null;
  presetTags?: readonly string[] | null;
  enableClientFilters?: boolean | null;
}

type FilterState = Record<FilterKey, string[]>;

const INITIAL_FILTER_STATE: FilterState = {
  lifecycle: [],
  domain: [],
  serviceType: [],
};

function unique(values: readonly string[] | undefined | null): string[] {
  if (!values || values.length === 0) {
    return [];
  }

  return Array.from(new Set(values.filter(Boolean)));
}

const layoutGridMap: Record<NonNullable<ServiceListProps["layout"]>, string> = {
  grid: "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  cards: "grid gap-6 grid-cols-1 md:grid-cols-2",
  list: "grid gap-6 grid-cols-1",
};

export function ServiceListSection({
  title = "Unsere Leistungen",
  description,
  showCategories = true,
  maxItems = 6,
  showFeaturedOnly = false,
  layout = "grid",
  showIcons = true,
  showTeaser = true,
  presetAudience = [],
  presetDomain = [],
  presetLifecycle = [],
  presetServiceType = [],
  presetTags = [],
  enableClientFilters = false,
}: ServiceListProps) {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] =
    useState<FilterState>(INITIAL_FILTER_STATE);

  const hasActiveClientFilters = Object.values(selectedFilters).some(
    (values) => values.length > 0,
  );

  const queryString = useMemo(() => {
    const params = new URLSearchParams();

    const audienceValues = unique(presetAudience);
    const domainValues = unique(
      selectedFilters.domain.length > 0 ? selectedFilters.domain : presetDomain,
    );
    const lifecycleValues = unique(
      selectedFilters.lifecycle.length > 0
        ? selectedFilters.lifecycle
        : presetLifecycle,
    );
    const serviceTypeValues = unique(
      selectedFilters.serviceType.length > 0
        ? selectedFilters.serviceType
        : presetServiceType,
    );
    const tagValues = unique(presetTags);

    if (audienceValues.length > 0) {
      params.set("audience", audienceValues.join(","));
    }

    if (domainValues.length > 0) {
      params.set("domain", domainValues.join(","));
    }

    if (lifecycleValues.length > 0) {
      params.set("lifecycle", lifecycleValues.join(","));
    }

    if (serviceTypeValues.length > 0) {
      params.set("serviceType", serviceTypeValues.join(","));
    }

    if (tagValues.length > 0) {
      params.set("tags", tagValues.join(","));
    }

    if (showFeaturedOnly) {
      params.set("featured", "true");
    }

    if (maxItems > 0) {
      params.set("limit", String(maxItems));
    }

    return params.toString();
  }, [
    presetAudience,
    presetDomain,
    presetLifecycle,
    presetServiceType,
    presetTags,
    selectedFilters.domain,
    selectedFilters.lifecycle,
    selectedFilters.serviceType,
    showFeaturedOnly,
    maxItems,
  ]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchServicesData() {
      try {
        setLoading(true);
        setError(null);

        const endpoint = queryString
          ? `/api/services?${queryString}`
          : "/api/services";

        const response = await fetch(endpoint, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch services (${response.status})`);
        }

        const data = await response.json();
        const fetchedServices: ServiceItem[] = Array.isArray(data?.services)
          ? data.services
          : [];

        setServices(fetchedServices);
      } catch (err) {
        if ((err as Error).name === "AbortError") {
          return;
        }
        console.error("Error fetching services:", err);
        setError("Fehler beim Laden der Leistungen");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchServicesData();

    return () => {
      controller.abort();
    };
  }, [queryString]);

  const categoryGroups = useMemo(() => {
    if (!showCategories) {
      return [] as Array<{
        key: string;
        slug: string | null;
        title: string;
        order: number;
        items: ServiceItem[];
      }>;
    }

    const map = new Map<
      string,
      {
        key: string;
        slug: string | null;
        title: string;
        order: number;
        items: ServiceItem[];
      }
    >();

    services.forEach((service) => {
      const slug =
        service.categoryRef?.slug ?? service.category ?? "ohne-kategorie";
      const order =
        typeof service.categoryRef?.order === "number"
          ? service.categoryRef.order
          : Number.MAX_SAFE_INTEGER;
      const fallbackLabel =
        slug && slug in categoryPresentation
          ? categoryPresentation[slug as keyof typeof categoryPresentation]
              .label
          : "Weitere Leistungen";
      const title = service.categoryRef?.title ?? fallbackLabel;
      const key = slug ?? `category-${order}`;

      const existing = map.get(key);

      if (existing) {
        existing.items.push(service);
        return;
      }

      map.set(key, {
        key,
        slug,
        title,
        order,
        items: [service],
      });
    });

    return Array.from(map.values()).sort(
      (a, b) =>
        a.order - b.order ||
        a.title.localeCompare(b.title, "de", { sensitivity: "base" }),
    );
  }, [services, showCategories]);

  const toggleFilter = (key: FilterKey, value: string) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[key]);
      if (current.has(value)) {
        current.delete(value);
      } else {
        current.add(value);
      }

      return {
        ...prev,
        [key]: Array.from(current),
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({
      lifecycle: [],
      domain: [],
      serviceType: [],
    });
  };

  const renderServiceItem = (service: ServiceItem) => {
    const IconComponent = service.icon ? iconMap[service.icon] : null;
    const categorySlug = service.categoryRef?.slug ?? undefined;
    const categoryInfo =
      categorySlug && categorySlug in categoryPresentation
        ? categoryPresentation[
            categorySlug as keyof typeof categoryPresentation
          ]
        : null;
    const badgeLabel =
      service.categoryRef?.title ??
      categoryInfo?.label ??
      service.category ??
      undefined;

    if (layout === "list") {
      return (
        <div
          key={service._id}
          className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
        >
          {showIcons && IconComponent && (
            <div className="flex-shrink-0">
              <IconComponent className="h-6 w-6 text-primary" />
            </div>
          )}
          <div className="flex-1">
            <div className="mb-1 flex items-center gap-2">
              <h3 className="font-semibold">{service.title}</h3>
              {badgeLabel && (
                <Badge
                  variant="secondary"
                  className={
                    categoryInfo?.badgeClass ??
                    "bg-muted text-muted-foreground dark:bg-muted/50"
                  }
                >
                  {badgeLabel}
                </Badge>
              )}
            </div>
            {showTeaser && service.teaser && (
              <p className="text-sm text-muted-foreground">{service.teaser}</p>
            )}
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href={`/leistungen/${service.slug.current}`}>
              Details <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      );
    }

    if (layout === "cards") {
      return (
        <Card
          key={service._id}
          className="h-full transition-shadow hover:shadow-lg"
        >
          <CardHeader>
            <div className="mb-2 flex items-center justify-between">
              {showIcons && IconComponent && (
                <IconComponent className="h-8 w-8 text-primary" />
              )}
              {badgeLabel && (
                <Badge
                  variant="secondary"
                  className={
                    categoryInfo?.badgeClass ??
                    "bg-muted text-muted-foreground dark:bg-muted/50"
                  }
                >
                  {badgeLabel}
                </Badge>
              )}
            </div>
            <CardTitle className="text-xl">{service.title}</CardTitle>
            {showTeaser && service.teaser && (
              <CardDescription>{service.teaser}</CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href={`/leistungen/${service.slug.current}`}>
                Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        key={service._id}
        className="group h-full transition-shadow hover:shadow-lg"
      >
        <CardHeader>
          <div className="mb-2 flex items-center justify-between">
            {showIcons && IconComponent && (
              <IconComponent className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
            )}
            {badgeLabel && (
              <Badge
                variant="secondary"
                className={
                  categoryInfo?.badgeClass ??
                  "bg-muted text-muted-foreground dark:bg-muted/50"
                }
              >
                {badgeLabel}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl">{service.title}</CardTitle>
          {showTeaser && service.teaser && (
            <CardDescription>{service.teaser}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <Button
            asChild
            variant="outline"
            className="w-full transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
          >
            <Link href={`/leistungen/${service.slug.current}`}>
              Mehr erfahren <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  };

  const renderFilterControls = () => (
    <div className="space-y-[var(--space-4)]">
      <div className="flex flex-col gap-[var(--space-3)] md:flex-row md:flex-wrap">
        {FILTER_GROUPS.map((group) => (
          <div key={group.key} className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {group.label}:
            </span>
            {group.options.map((option) => {
              const isActive = selectedFilters[group.key].includes(
                option.value,
              );
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleFilter(group.key, option.value)}
                  className={`rounded-full border px-[var(--space-3)] py-[calc(var(--space-2)*0.75)] text-sm font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground hover:bg-muted"
                  }`}
                  aria-pressed={isActive}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      {hasActiveClientFilters && (
        <div>
          <button
            type="button"
            onClick={resetFilters}
            className="text-sm font-medium text-primary underline-offset-4 hover:underline"
          >
            Filter zurücksetzen
          </button>
        </div>
      )}
    </div>
  );

  let content: React.ReactNode;

  if (loading) {
    content = (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground">Lade Leistungen...</p>
      </div>
    );
  } else if (error) {
    content = (
      <div className="flex items-center justify-center py-10">
        <p className="text-destructive">{error}</p>
      </div>
    );
  } else if (services.length === 0) {
    content = (
      <div className="flex items-center justify-center py-10">
        <p className="text-muted-foreground">
          {hasActiveClientFilters
            ? "Keine Leistungen für die aktuelle Filterauswahl."
            : "Keine Leistungen verfügbar."}
        </p>
      </div>
    );
  } else if (showCategories) {
    content = (
      <div className="space-y-12">
        {categoryGroups.map((group) => {
          const categoryInfo =
            group.slug && group.slug in categoryPresentation
              ? categoryPresentation[
                  group.slug as keyof typeof categoryPresentation
                ]
              : null;

          return (
            <div key={group.key}>
              <div className="mb-6 flex items-center gap-3">
                {categoryInfo?.icon && (
                  <categoryInfo.icon className="h-6 w-6 text-primary" />
                )}
                <h3 className="text-2xl font-semibold">{group.title}</h3>
              </div>
              <div className={layoutGridMap[layout]}>
                {group.items.map((item) => renderServiceItem(item))}
              </div>
            </div>
          );
        })}
      </div>
    );
  } else {
    content = (
      <div className={layoutGridMap[layout]}>
        {services.map((service) => renderServiceItem(service))}
      </div>
    );
  }

  return (
    <AuroraSection
      variant="muted"
      withTopDivider
      withBottomDivider
      className="py-[var(--space-16)] sm:py-[var(--space-20)]"
    >
      <div className="layout-shell space-y-[var(--space-8)]">
        <div className="content-readable mx-auto text-center space-y-[var(--space-3)]">
          <h2 className="text-balance text-3xl font-semibold sm:text-[length:var(--step-3)]">
            {title}
          </h2>
          {description ? (
            <p className="text-pretty text-[length:var(--step--1)] text-[color:var(--color-text-muted)]">
              {description}
            </p>
          ) : null}
        </div>

        {enableClientFilters ? (
          <div className="content-readable mx-auto">
            {renderFilterControls()}
          </div>
        ) : null}

        <div>{content}</div>
      </div>
    </AuroraSection>
  );
}

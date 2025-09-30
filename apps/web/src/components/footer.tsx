import type {
  QueryNavigationDataResult,
  QuerySiteSettingsResult,
} from "@/lib/sanity/sanity.types";

import { FooterSection } from "./ui/footer-section";

type NavigationItem = QueryNavigationDataResult["footer"][number];
type SiteSettings = QuerySiteSettingsResult;

interface FooterProps {
  navigation?: NavigationItem[];
  settings?: SiteSettings;
  footerData?: any;
}

export function Footer({ navigation = [], settings, footerData }: FooterProps) {
  return (
    <FooterSection
      navigation={navigation}
      settings={settings}
      footerData={footerData}
    />
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-[var(--space-10)] pb-8">
      <section className="layout-shell">
        <div className="flex flex-col items-center justify-center space-y-4 py-12">
          <div className="h-8 w-32 animate-pulse rounded bg-[color:var(--color-surface-muted)]" />
          <div className="h-4 w-48 animate-pulse rounded bg-[color:var(--color-surface-muted)]" />
          <div className="flex space-x-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 animate-pulse rounded-full bg-[color:var(--color-surface-muted)]"
              />
            ))}
          </div>
        </div>
      </section>
    </footer>
  );
}

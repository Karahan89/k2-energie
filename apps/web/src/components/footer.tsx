import Link from "next/link";

import type {
  QueryNavigationDataResult,
  QuerySiteSettingsResult,
} from "@/lib/sanity/sanity.types";
import type { SanityImageProps } from "@/types";

import { Logo } from "./logo";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
  YoutubeIcon,
} from "./social-icons";

type NavigationItem = QueryNavigationDataResult["footer"][number];
type SocialLinks = NonNullable<QuerySiteSettingsResult>["socialLinks"];
type SiteSettings = QuerySiteSettingsResult;

interface FooterProps {
  navigation?: NavigationItem[];
  settings?: SiteSettings;
}

interface SocialLinksProps {
  data: SocialLinks;
}

function chunk<T>(input: T[], size: number): T[][] {
  if (size <= 0) {
    return input.length ? [input] : [];
  }
  const result: T[][] = [];
  for (let i = 0; i < input.length; i += size) {
    result.push(input.slice(i, i + size));
  }
  return result;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: InstagramIcon,
      label: "Instagram",
    },
    {
      url: facebook,
      Icon: FacebookIcon,
      label: "Facebook",
    },
    { url: twitter, Icon: XIcon, label: "Twitter" },
    {
      url: linkedin,
      Icon: LinkedinIcon,
      label: "LinkedIn",
    },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "YouTube",
    },
  ].filter((link) => link.url);

  if (socialLinks.length === 0) return null;

  return (
    <ul className="flex items-center space-x-6 text-[color:var(--neutral-000)]/70">
      {socialLinks.map(({ url, Icon, label }) => (
        <li
          key={url}
          className="font-medium transition-colors hover:text-[color:var(--brand-accent-amber)]"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={`Folge uns auf ${label}`}
          >
            <Icon className="fill-[color:var(--neutral-000)]/70 transition-colors hover:fill-[color:var(--brand-accent-amber)]" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function Footer({ navigation = [], settings }: FooterProps) {
  const navItems = navigation.filter((item) => Boolean(item?.href));
  const columnCount = navItems.length > 6 ? 3 : 2;
  const chunkSize = navItems.length
    ? Math.ceil(navItems.length / columnCount)
    : 0;
  const rows = chunk(navItems, chunkSize);
  const gridColumnsClass =
    columnCount === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
  const year = new Date().getFullYear();
  const logoImage = settings?.logo as SanityImageProps | undefined;

  return (
    <footer className="mt-[var(--space-10)] bg-[color:var(--brand-blue-900)] text-[color:var(--neutral-000)]">
      <section className="layout-shell py-[var(--space-10)]">
        <div className="flex flex-col items-center justify-between gap-8 text-center text-[color:var(--neutral-000)]/85 lg:flex-row lg:text-left">
          <div className="flex w-full max-w-80 shrink flex-col items-center justify-between gap-5 lg:items-start">
            <div>
              <span className="flex items-center justify-center gap-4 lg:justify-start">
                <Logo
                  image={logoImage}
                  alt={settings?.siteTitle ?? "K2 Energieberatung"}
                />
              </span>
              {settings?.siteDescription && (
                <p className="mt-6 text-sm text-[color:var(--neutral-000)]/70">
                  {settings.siteDescription}
                </p>
              )}
            </div>
            {settings?.socialLinks && (
              <div className="flex justify-center lg:justify-start">
                <SocialLinks data={settings.socialLinks} />
              </div>
            )}
          </div>

          {rows.length > 0 && (
            <div
              className={`grid w-full max-w-3xl grid-cols-2 gap-6 text-left text-[color:var(--neutral-000)]/85 ${gridColumnsClass} lg:gap-12`}
            >
              {rows.map((column, index) => (
                <div key={`footer-column-${index}`} className="space-y-3">
                  {column.map((item) => (
                    <Link
                      key={item._id ?? item.href}
                      href={item.href ?? "#"}
                      target={item.openInNewTab ? "_blank" : undefined}
                      rel={
                        item.openInNewTab ? "noopener noreferrer" : undefined
                      }
                      className="block text-sm font-medium text-[color:var(--neutral-000)]/70 transition-colors hover:text-[color:var(--brand-accent-amber)]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-[var(--space-8)] border-t border-[color:var(--neutral-000)]/20 pt-[var(--space-4)]">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-[color:var(--neutral-000)]/70 lg:flex-row lg:text-left">
            <span>
              © {year} {settings?.siteTitle ?? "K2 Energieberatung"}
            </span>
            <div className="flex justify-center gap-4 lg:justify-end">
              {navItems.slice(0, 3).map((item) => (
                <Link
                  key={`footer-meta-${item._id ?? item.href}`}
                  href={item.href ?? "#"}
                  className="transition-colors hover:text-[color:var(--brand-accent-amber)]"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-[var(--space-10)] pb-8">
      <section className="layout-shell">
        <div className="flex flex-col items-center justify-between gap-8 text-center lg:flex-row lg:text-left">
          <div className="flex w-full max-w-80 shrink flex-col items-center justify-between gap-5 lg:items-start">
            <div>
              <span className="flex items-center justify-center gap-4 lg:justify-start">
                <div className="h-[40px] w-[80px] rounded bg-muted animate-pulse" />
              </span>
              <div className="mt-6 h-16 w-full rounded bg-muted animate-pulse" />
            </div>
            <div className="flex items-center space-x-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="h-6 w-6 rounded bg-muted animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="grid w-full max-w-3xl grid-cols-2 gap-6 md:grid-cols-3 lg:gap-12">
            {[1, 2, 3].map((col) => (
              <div key={col}>
                <div className="mb-4 h-6 w-24 rounded bg-muted animate-pulse" />
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="h-4 w-full rounded bg-muted animate-pulse"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-[var(--space-8)] border-t pt-[var(--space-4)]">
          <div className="flex flex-col items-center justify-between gap-4 text-center text-sm text-muted-foreground lg:flex-row lg:text-left">
            <div className="h-4 w-48 rounded bg-muted animate-pulse" />
            <div className="flex justify-center gap-4 lg:justify-end">
              <div className="h-4 w-32 rounded bg-muted animate-pulse" />
              <div className="h-4 w-24 rounded bg-muted animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}

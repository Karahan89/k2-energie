"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useMemo, useState } from "react";

import type {
  QueryNavigationDataResult,
  QuerySiteSettingsResult,
} from "@/lib/sanity/sanity.types";
import type { SanityImageProps } from "@/types";

import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";

type NavigationItem = QueryNavigationDataResult["header"][number];

interface NavbarProps {
  navigation?: NavigationItem[];
  siteSettings?: QuerySiteSettingsResult;
}

const headerStyle: CSSProperties = {
  backgroundColor:
    "color-mix(in srgb, var(--color-surface-elevated) 92%, transparent 8%)",
};

const mobilePanelStyle: CSSProperties = {
  backgroundColor:
    "color-mix(in srgb, var(--color-surface-elevated) 94%, transparent 6%)",
};

export function Navbar({ navigation = [], siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = useMemo(
    () => (navigation ?? []).filter((item) => Boolean(item?.href)),
    [navigation],
  );
  const logoImage = siteSettings?.logo as SanityImageProps | undefined;

  function toggleMenu() {
    setIsOpen((previous) => !previous);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header
      className="sticky top-0 z-40 border-b border-[color:var(--color-border-muted)] bg-[color:var(--color-surface-elevated)] text-[color:var(--color-text-base)] shadow-soft backdrop-blur-xl transition-colors dark:border-[color:var(--color-border-muted)]/60 dark:bg-[color:var(--color-background-base)] dark:text-[color:var(--color-text-inverse)]"
      style={headerStyle}
    >
      <div className="layout-shell flex items-center justify-between py-[var(--space-2)]">
        <Logo
          image={logoImage}
          alt={siteSettings?.siteTitle ?? "K2 Energieberatung"}
        />

        <nav className="hidden items-center gap-[var(--space-2)] md:flex">
          {navItems.map((item) => (
            <Link
              key={item._id ?? item.href}
              href={item.href ?? "#"}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              className="rounded-full px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--step--1)] font-medium text-[color:var(--color-brand-primary)] transition-colors hover:bg-[color:var(--color-brand-secondary)] hover:text-[color:var(--color-brand-primary-active)] dark:text-[color:var(--color-text-inverse)]/80 dark:hover:bg-[color:var(--surface-muted)]/80 dark:hover:text-[color:var(--color-text-inverse)]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-[var(--space-2)]">
          <ModeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--color-brand-secondary)]/60 p-[var(--space-2)] text-[color:var(--color-brand-primary)] transition-colors hover:bg-[color:var(--color-brand-secondary)] md:hidden dark:border-[color:var(--color-border-muted)]/40 dark:bg-[color:var(--surface-muted)]/70 dark:text-[color:var(--color-text-inverse)] dark:hover:bg-[color:var(--surface-muted)]/90"
            onClick={toggleMenu}
            aria-label="Navigation öffnen"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {isOpen && navItems.length > 0 && (
        <div
          className="border-t border-[color:var(--color-border-muted)] bg-[color:var(--color-surface-elevated)] md:hidden dark:border-[color:var(--color-border-muted)]/40 dark:bg-[color:var(--color-background-base)]"
          style={mobilePanelStyle}
        >
          <nav className="layout-shell flex flex-col gap-[var(--space-3)] py-[var(--space-4)]">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item._id ?? item.href}`}
                href={item.href ?? "#"}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="rounded-xl px-[var(--space-3)] py-[var(--space-2)] text-[length:var(--step--1)] font-medium text-[color:var(--color-brand-primary)] transition-colors hover:bg-[color:var(--color-brand-secondary)] dark:text-[color:var(--color-text-inverse)]/80 dark:hover:bg-[color:var(--surface-muted)]/80"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

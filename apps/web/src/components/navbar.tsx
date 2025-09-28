"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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

export function Navbar({ navigation = [], siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = (navigation ?? []).filter((item) => Boolean(item?.href));
  const logoImage = siteSettings?.logo as SanityImageProps | undefined;

  function toggleMenu() {
    setIsOpen((previous) => !previous);
  }

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--brand-900)]/20 bg-white/85 text-[color:var(--brand-900)] shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 dark:border-[color:var(--neutral-100)]/12 dark:bg-[color:var(--background)]/85 dark:text-[color:var(--neutral-000)] dark:supports-[backdrop-filter]:bg-[color:var(--background)]/70">
      <div className="layout-shell flex items-center justify-between py-1.5">
        <Logo
          image={logoImage}
          alt={siteSettings?.siteTitle ?? "K2 Energieberatung"}
        />

        <nav className="hidden items-center gap-1.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item._id ?? item.href}
              href={item.href ?? "#"}
              target={item.openInNewTab ? "_blank" : undefined}
              rel={item.openInNewTab ? "noopener noreferrer" : undefined}
              className="rounded-full px-3 py-1.5 text-sm font-medium text-[color:var(--brand-700)] transition-colors hover:bg-[color:var(--brand-100)] hover:text-[color:var(--brand-900)] dark:text-[color:var(--neutral-000)]/80 dark:hover:bg-[color:var(--surface-muted)]/80 dark:hover:text-[color:var(--neutral-000)]"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full border border-[color:var(--brand-200)]/60 p-2 text-[color:var(--brand-700)] transition-colors hover:bg-[color:var(--brand-100)] md:hidden dark:border-[color:var(--neutral-100)]/25 dark:bg-[color:var(--surface-muted)]/70 dark:text-[color:var(--neutral-000)] dark:hover:bg-[color:var(--surface-muted)]/90"
            onClick={toggleMenu}
            aria-label="Navigation öffnen"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {isOpen && navItems.length > 0 && (
        <div className="border-t border-[color:var(--brand-200)] bg-white/90 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70 md:hidden dark:border-[color:var(--neutral-100)]/15 dark:bg-[color:var(--background)]/85 dark:supports-[backdrop-filter]:bg-[color:var(--background)]/70">
          <nav className="layout-shell flex flex-col gap-3 py-4">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item._id ?? item.href}`}
                href={item.href ?? "#"}
                target={item.openInNewTab ? "_blank" : undefined}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="rounded-xl px-3 py-2 text-sm font-medium text-[color:var(--brand-700)] transition-colors hover:bg-[color:var(--brand-100)] dark:text-[color:var(--neutral-000)]/80 dark:hover:bg-[color:var(--surface-muted)]/80"
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

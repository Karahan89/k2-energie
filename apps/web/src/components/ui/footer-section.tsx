"use client";

import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { Switch } from "@workspace/ui/components/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import {
  Facebook,
  Instagram,
  Linkedin,
  Moon,
  Sun,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import * as React from "react";

import type {
  QueryNavigationDataResult,
  QuerySiteSettingsResult,
} from "@/lib/sanity/sanity.types";
import type { SanityImageProps } from "@/types";

import { Logo } from "../logo";

type NavigationItem = QueryNavigationDataResult["footer"][number];
type SocialLinks = NonNullable<QuerySiteSettingsResult>["socialLinks"];
type SiteSettings = QuerySiteSettingsResult;

// Footer Schema Types
interface FooterContactInfo {
  companyName?: string;
  address?: string;
  phone?: string;
  email?: string;
}

interface FooterSocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

interface FooterLink {
  title: string;
  href: string;
  openInNewTab?: boolean;
}

interface FooterLinks {
  quickLinks?: FooterLink[];
}

interface CopyrightLinks {
  copyrightLinks?: FooterLink[];
}

interface FooterData {
  _id: string;
  title?: string;
  contactInfo?: FooterContactInfo;
  socialLinks?: FooterSocialLinks;
  footerLinks?: FooterLinks;
  copyrightLinks?: CopyrightLinks;
  copyrightText?: string;
}

interface FooterSectionProps {
  navigation?: NavigationItem[];
  settings?: SiteSettings;
  footerData?: FooterData;
}

interface SocialLinksProps {
  data?: SocialLinks | null;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    { name: "Facebook", url: facebook, icon: Facebook },
    { name: "Twitter", url: twitter, icon: Twitter },
    { name: "Instagram", url: instagram, icon: Instagram },
    { name: "LinkedIn", url: linkedin, icon: Linkedin },
  ].filter(
    (link): link is { name: string; url: string; icon: typeof Facebook } =>
      typeof link.url === "string" && link.url.length > 0,
  );

  if (socialLinks.length === 0) return null;

  return (
    <div className="flex space-x-4">
      {socialLinks.map(({ name, url, icon: Icon }) => (
        <TooltipProvider key={name}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full"
                asChild
              >
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow us on ${name}`}
                >
                  <Icon className="h-4 w-4" />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Follow us on {name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
}

export function FooterSection({
  navigation = [],
  settings,
  footerData,
}: FooterSectionProps) {
  const [isDarkMode, setIsDarkMode] = React.useState(true);

  const navItems = navigation.filter((item) => Boolean(item?.href));
  const year = new Date().getFullYear();
  const logoImage = settings?.logo as SanityImageProps | undefined;

  // Use footer data or fallback to navigation items
  const contactInfo = footerData?.contactInfo || {
    companyName: "K2 Energieberatung",
    address: "Lengede, Deutschland",
    phone: "+49 (0) 123 456-7890",
    email: "info@k2-energie.de",
  };

  const socialLinks = footerData?.socialLinks || settings?.socialLinks;
  const quickLinks =
    footerData?.footerLinks?.quickLinks || navItems.slice(0, 5);
  const copyrightLinks = footerData?.copyrightLinks?.copyrightLinks || [
    { title: "Impressum", href: "/impressum", openInNewTab: false },
    { title: "Datenschutz", href: "/datenschutz", openInNewTab: false },
  ];
  const copyrightText = footerData?.copyrightText || "Alle Rechte vorbehalten.";

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Branding Section */}
          <div className="relative">
            <div className="mb-6">
              <Logo
                image={logoImage}
                alt={contactInfo.companyName}
                width={170}
                height={40}
                priority={true}
              />
            </div>
            <h2 className="mb-4 text-2xl font-bold tracking-tight">
              {contactInfo.companyName}
            </h2>
            <p className="text-muted-foreground">
              {settings?.siteDescription ||
                "Ihr Partner für nachhaltige Energieberatung und Sanierungsplanung."}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Schnellzugriff</h3>
            <nav className="space-y-2 text-sm">
              {quickLinks.map((item, index) => {
                const href = item.href ?? "#";
                const key = `quick-${href}-${index}`;

                return (
                  <Link
                    key={key}
                    href={href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="block transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>
            <address className="space-y-2 text-sm not-italic">
              <p>{contactInfo.companyName}</p>
              <p>{contactInfo.address}</p>
              <p>Telefon: {contactInfo.phone}</p>
              <p>E-Mail: {contactInfo.email}</p>
            </address>
          </div>

          {/* Social Links & Settings */}
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Folgen Sie uns</h3>
            <div className="mb-6">
              <SocialLinks data={settings?.socialLinks} />
            </div>

            {/* Logo */}
            <div className="mb-6">
              <Logo
                image={logoImage}
                alt={settings?.siteTitle ?? "K2 Energieberatung"}
              />
            </div>

            {/* Dark Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Dark Mode umschalten
              </Label>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {year} {settings?.siteTitle ?? contactInfo.companyName}.{" "}
            {copyrightText}
          </p>
          {copyrightLinks.length > 0 && (
            <nav className="flex gap-4 text-sm">
              {copyrightLinks.map((item, index) => {
                const href = item.href ?? "#";
                const key = `copyright-${href}-${index}`;

                return (
                  <Link
                    key={key}
                    href={href}
                    target={item.openInNewTab ? "_blank" : undefined}
                    rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                    className="transition-colors hover:text-primary"
                  >
                    {item.title}
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}

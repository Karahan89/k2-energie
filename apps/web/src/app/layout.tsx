import "@workspace/ui/globals.css";

import { Inter, Source_Serif_4 } from "next/font/google";
import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity";
import { preconnect } from "react-dom";

import { Footer, FooterSkeleton } from "@/components/footer";
import { CombinedJsonLd } from "@/components/json-ld";
import { Navbar } from "@/components/navbar";
import { PreviewBar } from "@/components/preview-bar";
import { Providers } from "@/components/providers";
import { getNavigationData } from "@/lib/navigation";
import { SanityLive } from "@/lib/sanity/live";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  preconnect("https://cdn.sanity.io");
  const nav = await getNavigationData();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} font-sans antialiased`}
      >
        <Providers>
          <Navbar
            navigation={nav.headerNavigation}
            siteSettings={nav.siteSettings}
          />
          {children}
          {nav.footerNavigation.length || nav.siteSettings || nav.footerData ? (
            <Footer
              navigation={nav.footerNavigation}
              settings={nav.siteSettings}
              footerData={nav.footerData}
            />
          ) : (
            <FooterSkeleton />
          )}
          <SanityLive />
          <CombinedJsonLd includeWebsite includeOrganization />
          {(await draftMode()).isEnabled && (
            <>
              <PreviewBar />
              <VisualEditing />
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}

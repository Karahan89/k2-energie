import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityImage } from "../elements/sanity-image";
import { AuroraSection } from "../ui/aurora-section";

export type ImageLinkCardsProps = PagebuilderType<"imageLinkCards">;

type ImageLinkCard = NonNullable<
  NonNullable<PagebuilderType<"imageLinkCards">["cards"]>
>[number];

function ImageLinkCard({ card }: { card: ImageLinkCard }) {
  const { image, description, title, href } = card ?? {};

  return (
    <Link
      href={href ?? "#"}
      className="group flex flex-col gap-2 transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="relative overflow-hidden rounded-lg aspect-video mb-2 bg-muted">
        {image?.id ? (
          <SanityImage
            image={image}
            loading="lazy"
            width={400}
            height={225}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Kein Bild</span>
          </div>
        )}
      </div>
      <h3 className="text-xl tracking-tight font-semibold group-hover:text-primary transition-colors duration-200">
        {title}
      </h3>
      <p className="text-muted-foreground text-base leading-relaxed">
        {description}
      </p>
    </Link>
  );
}

export function ImageLinkCards({
  richText,
  title,
  eyebrow,
  cards,
}: ImageLinkCardsProps) {
  return (
    <AuroraSection
      variant="default"
      withAurora={true}
      withTopDivider={true}
      withBottomDivider={true}
      className="py-[var(--space-12)] md:py-[var(--space-16)] lg:py-[var(--space-20)]"
    >
      <div className="layout-shell">
        <div className="w-full py-20 lg:py-40">
          <div className="flex flex-col gap-10">
            {/* Header Section */}
            <div className="flex gap-4 flex-col items-start">
              {eyebrow && (
                <div>
                  <Badge
                    variant="secondary"
                    className="glass-surface glass-surface-neutral rounded-full px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em]"
                  >
                    {eyebrow}
                  </Badge>
                </div>
              )}
              <div className="flex gap-2 flex-col">
                <h2 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular text-left">
                  {title}
                </h2>
                {richText && (
                  <div className="max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground text-left">
                    <RichText richText={richText} className="text-lg" />
                  </div>
                )}
              </div>
            </div>

            {/* Cards Grid */}
            {Array.isArray(cards) && cards.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, idx) => (
                  <ImageLinkCard key={card._key || idx} card={card} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuroraSection>
  );
}

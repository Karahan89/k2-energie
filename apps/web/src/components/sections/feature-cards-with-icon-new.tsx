"use client";

import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight } from "lucide-react";

import type { PagebuilderType } from "@/types";

import { AmbientSurface } from "../ambient-surface";
import { RichText } from "../elements/rich-text";
import { SanityIcon } from "../elements/sanity-icon";

export type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon">;

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
  index: number;
};

// Gradient-Konfigurationen für verschiedene Karten
const gradientConfigs = [
  {
    gradient: "from-purple-500/20 via-pink-500/20 to-purple-600/20",
    border: "border-purple-200/30",
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-600",
  },
  {
    gradient: "from-blue-500/20 via-cyan-500/20 to-blue-600/20",
    border: "border-blue-200/30",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    gradient: "from-green-500/20 via-emerald-500/20 to-green-600/20",
    border: "border-green-200/30",
    iconBg: "bg-green-500/10",
    iconColor: "text-green-600",
  },
  {
    gradient: "from-orange-500/20 via-amber-500/20 to-orange-600/20",
    border: "border-orange-200/30",
    iconBg: "bg-orange-500/10",
    iconColor: "text-orange-600",
  },
  {
    gradient: "from-indigo-500/20 via-violet-500/20 to-indigo-600/20",
    border: "border-indigo-200/30",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-600",
  },
  {
    gradient: "from-rose-500/20 via-pink-500/20 to-rose-600/20",
    border: "border-rose-200/30",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-600",
  },
] as const;

type GradientConfig = (typeof gradientConfigs)[number];

const getGradientConfig = (index: number): GradientConfig =>
  gradientConfigs[index % gradientConfigs.length] ?? gradientConfigs[0];

function FeatureCard({ card, index }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  const config = getGradientConfig(index);

  return (
    <div className="relative h-80 group">
      {/* Hintergrund mit Gradient */}
      <div
        className={cn(
          "absolute inset-0 rounded-3xl overflow-hidden",
          "bg-gradient-to-br",
          config.gradient,
          "transition-all duration-500 group-hover:scale-105",
        )}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        </div>
      </div>

      {/* Karten-Inhalt */}
      <div
        className={cn(
          "relative z-10 p-8 rounded-3xl h-full flex flex-col",
          "bg-black/80 backdrop-blur-sm",
          "border border-white/20 dark:border-white/10",
          config.border,
          "transition-all duration-300 group-hover:bg-black/90",
        )}
      >
        {/* Icon */}
        <div
          className={cn(
            "mb-6 w-12 h-12 rounded-xl flex items-center justify-center",
            config.iconBg,
            "transition-all duration-300 group-hover:scale-110",
          )}
        >
          <SanityIcon icon={icon} className={cn("size-6", config.iconColor)} />
        </div>

        {/* Titel */}
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors duration-200">
          {title}
        </h3>

        {/* Beschreibung */}
        <div className="leading-relaxed flex-grow text-gray-100 font-medium">
          <RichText richText={richText} className="text-sm leading-relaxed" />
        </div>

        {/* Call-to-Action */}
        <div className="mt-6 flex items-center text-sm font-bold text-gray-200 group-hover:text-white transition-colors duration-200">
          <span className="mr-2">Mehr erfahren</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
}

export function FeatureCardsWithIcon({
  eyebrow,
  title,
  richText,
  cards,
}: FeatureCardsWithIconProps) {
  return (
    <AmbientSurface
      id="features-new"
      variant="default"
      className="my-[var(--space-6)] py-[var(--space-8)] md:my-[var(--space-8)] md:py-[var(--space-8)] lg:my-[var(--space-10)] lg:py-[var(--space-10)]"
    >
      <div className="layout-shell">
        <section className="min-h-screen py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-background dark:to-background">
          <div className="max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="text-center mb-16">
              {eyebrow && (
                <div className="mb-4">
                  <Badge
                    variant="secondary"
                    className="glass-surface glass-surface-neutral rounded-full px-4 py-2 text-[length:var(--step--2)] uppercase tracking-[0.18em]"
                  >
                    {eyebrow}
                  </Badge>
                </div>
              )}
              <h2 className="text-4xl md:text-5xl font-light text-gray-900 dark:text-white mb-6">
                {title}
              </h2>
              {richText && (
                <div className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  <RichText richText={richText} className="text-pretty" />
                </div>
              )}
            </div>

            {/* Cards Grid */}
            {Array.isArray(cards) && cards.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cards.map((card, index) => (
                  <FeatureCard
                    key={`FeatureCard-${card?._key}-${index}`}
                    card={card}
                    index={index}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </AmbientSurface>
  );
}

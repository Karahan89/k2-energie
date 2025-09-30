"use client";
import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import React from "react";

interface AuroraSectionProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  variant?: "default" | "hero" | "muted";
  withAurora?: boolean;
  withTopDivider?: boolean;
  withBottomDivider?: boolean;
  className?: string;
}

export const AuroraSection = ({
  children,
  variant = "default",
  withAurora = true,
  withTopDivider = false,
  withBottomDivider = false,
  className,
  ...props
}: AuroraSectionProps) => {
  const variantClasses = {
    default: "bg-[color:var(--color-background-base)]",
    hero: "bg-[color:var(--color-background-subtle)]",
    muted: "bg-[color:var(--color-background-muted)]",
  };

  return (
    <section
      className={cn(
        "relative overflow-hidden",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {/* Top Divider */}
      {withTopDivider && (
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-muted)] to-transparent" />
      )}

      {/* Aurora Background */}
      {withAurora && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className={cn(
              `
              [--white-gradient:repeating-linear-gradient(100deg,var(--color-background-base)_0%,var(--color-background-base)_7%,transparent_10%,transparent_12%,var(--color-background-base)_16%)]
              [--dark-gradient:repeating-linear-gradient(100deg,var(--color-background-base)_0%,var(--color-background-base)_7%,transparent_10%,transparent_12%,var(--color-background-base)_16%)]
              [--aurora:repeating-linear-gradient(100deg,var(--color-brand-primary)_10%,var(--color-brand-primary-hover)_15%,var(--color-brand-primary-soft)_20%,var(--color-brand-secondary)_25%,var(--color-brand-primary)_30%)]
              [background-image:var(--white-gradient),var(--aurora)]
              dark:[background-image:var(--dark-gradient),var(--aurora)]
              [background-size:300%,_200%]
              [background-position:50%_50%,50%_50%]
              filter blur-[10px] invert dark:invert-0
              after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
              after:dark:[background-image:var(--dark-gradient),var(--aurora)]
              after:[background-size:200%,_100%] 
              after:animate-aurora after:[background-attachment:fixed] after:mix-blend-difference
              absolute -inset-[10px] opacity-15 will-change-transform
              [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
            )}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>

      {/* Bottom Divider */}
      {withBottomDivider && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[color:var(--color-border-muted)] to-transparent" />
      )}
    </section>
  );
};

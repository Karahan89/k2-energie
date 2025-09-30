"use client";
import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import React from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col h-full items-center justify-center bg-[color:var(--color-background-base)] dark:bg-[color:var(--color-background-base)] text-[color:var(--color-text-base)] transition-colors duration-300",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 overflow-hidden">
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
            pointer-events-none
            absolute -inset-[10px] opacity-30 will-change-transform`,

            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,transparent_70%)]`,
          )}
        ></div>
      </div>
      {children}
    </div>
  );
};

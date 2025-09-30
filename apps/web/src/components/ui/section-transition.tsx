"use client";
import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";
import React from "react";

interface SectionTransitionProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  variant?: "fade" | "slide" | "aurora";
  className?: string;
}

export const SectionTransition = ({
  children,
  variant = "fade",
  className,
  ...props
}: SectionTransitionProps) => {
  const variantClasses = {
    fade: "opacity-0 animate-fade-in",
    slide: "translate-y-8 opacity-0 animate-slide-up",
    aurora: "opacity-0 animate-fade-in",
  };

  return (
    <div
      className={cn(
        "transition-all duration-700 ease-out",
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

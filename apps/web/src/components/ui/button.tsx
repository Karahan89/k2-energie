import { Slot } from "@radix-ui/react-slot";
import { cn } from "@workspace/ui/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  [
    "group relative inline-flex items-center justify-center gap-[var(--space-2)]",
    "rounded-[var(--radius-lg)] border border-transparent font-semibold tracking-[0.01em]",
    "transition-[transform,box-shadow,background-color,color,border-color]",
    "duration-[var(--motion-duration-2)] ease-[var(--motion-ease-standard)]",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
    "focus-visible:[outline-color:var(--color-status-info)]",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "border-[color:var(--color-interactive-cta)]",
          "bg-[var(--color-interactive-cta)]",
          "text-[var(--color-text-inverse)]",
          "shadow-[var(--shadow-soft)]",
          "hover:-translate-y-[1px]",
          "hover:bg-[var(--color-interactive-cta-hover)]",
        ].join(" "),
        secondary: [
          "border-[color:var(--color-border-muted)]",
          "bg-[var(--color-surface-subtle)]",
          "text-[var(--color-text-base)]",
          "hover:-translate-y-[1px]",
          "hover:bg-[var(--color-surface-elevated)]",
        ].join(" "),
        outline: [
          "border-[color:var(--color-border-strong)]",
          "bg-transparent",
          "text-[var(--color-text-base)]",
          "hover:bg-[var(--color-surface-subtle)]",
        ].join(" "),
        ghost: [
          "border-transparent",
          "bg-transparent",
          "text-[var(--color-text-muted)]",
          "hover:bg-[var(--color-surface-subtle)]",
        ].join(" "),
        link: [
          "border-transparent bg-transparent px-0 py-0",
          "text-[color:var(--color-brand-primary)] underline underline-offset-4",
          "hover:text-[color:var(--color-brand-primary-hover)]",
        ].join(" "),
      },
      size: {
        sm: "min-h-[2.25rem] px-[var(--space-3)] py-[calc(var(--space-2)/2)] text-[length:var(--step--1)]",
        md: "min-h-[2.75rem] px-[var(--space-4)] py-[var(--space-2)] text-[length:var(--step--1)]",
        lg: "min-h-[3.25rem] px-[var(--space-5)] py-[var(--space-3)] text-[length:var(--step-0)]",
        icon: "size-[3rem] p-0 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps =
  | (React.ComponentPropsWithoutRef<"button"> & { asChild?: false })
  | (React.ComponentPropsWithoutRef<typeof Slot> & { asChild: true });

type VariantPropsWithDefaults = VariantProps<typeof buttonVariants>;

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps & VariantPropsWithDefaults) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };

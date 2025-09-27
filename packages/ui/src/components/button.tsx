import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-[length:var(--step--1)] font-semibold tracking-[0.02em] transition-[transform,box-shadow,background-color,color,filter] duration-200 ease-out disabled:pointer-events-none disabled:opacity-60 glass-surface select-none touch-manipulation [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--background)] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "glass-surface-accent text-[color:var(--accent-foreground)] hover:-translate-y-[1px] hover:shadow-elevated focus-visible:ring-ring/80",
        destructive:
          "glass-surface-danger hover:-translate-y-[1px] hover:shadow-elevated focus-visible:ring-[color:var(--destructive)]/70",
        outline:
          "glass-surface-neutral border border-border/60 text-foreground hover:text-[color:var(--primary-strong)] hover:shadow-elevated",
        secondary:
          "glass-surface-secondary hover:-translate-y-[1px] hover:shadow-elevated",
        ghost:
          "glass-surface-neutral hover:text-[color:var(--primary-strong)] hover:shadow-soft",
        link:
          "glass-surface-neutral px-0 py-0 text-[length:var(--step--1)] underline-offset-4 shadow-none hover:underline hover:text-primary",
      },
      size: {
        default: "min-h-12 px-6 py-3 has-[>svg]:px-5",
        sm: "min-h-11 px-5 py-2.5 gap-1.5 has-[>svg]:px-4 text-[length:var(--step--2)]",
        lg: "min-h-[3.5rem] px-7 py-3.5 has-[>svg]:px-6 text-[length:var(--step-0)]",
        icon: "size-12 min-h-12 p-0 [&_svg]:size-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

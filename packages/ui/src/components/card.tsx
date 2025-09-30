import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const cardVariants = cva(
  "rounded-[var(--radius-lg)] border border-[var(--card-border)] bg-[var(--card-background)] text-[var(--card-text)] shadow-[var(--card-shadow)] transition-shadow",
  {
    variants: {
      variant: {
        default: "border-[var(--card-border)]",
        elevated: "border-[var(--card-border)] shadow-[var(--shadow-elevated)]",
        outlined: "border-[var(--color-border-strong)]",
        ghost: "border-transparent shadow-none",
      },
      padding: {
        none: "p-0",
        sm: "p-3",
        default: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
    },
  }
)

const cardHeaderVariants = cva("flex flex-col space-y-1.5")
const cardTitleVariants = cva("text-[length:var(--font-size-2)] font-semibold leading-none tracking-tight")
const cardDescriptionVariants = cva("text-[length:var(--font-size-0)] text-[var(--color-text-muted)]")
const cardContentVariants = cva("pt-0")
const cardFooterVariants = cva("flex items-center pt-0")

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>

export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export type CardDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>

export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardHeaderVariants(), className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(cardTitleVariants(), className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(cardDescriptionVariants(), className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardContentVariants(), className)}
      {...props}
    />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardFooterVariants(), className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
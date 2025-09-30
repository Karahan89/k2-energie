import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-[var(--radius-md)] border border-[var(--input-border)] bg-[var(--input-background)] px-3 py-2 text-[length:var(--font-size-0)] text-[var(--input-text)] placeholder:text-[var(--input-placeholder)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring-color)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-[var(--input-border-error)] aria-invalid:ring-[var(--color-status-error)]/20 dark:aria-invalid:ring-[var(--color-status-error)]/40",
  {
    variants: {
      variant: {
        default: "border-[var(--input-border)] hover:border-[var(--input-border-hover)] focus-visible:border-[var(--input-border-focus)]",
        error: "border-[var(--input-border-error)] focus-visible:border-[var(--input-border-error)] focus-visible:ring-[var(--color-status-error)]/50",
        success: "border-[var(--input-border-success)] focus-visible:border-[var(--input-border-success)] focus-visible:ring-[var(--color-status-success)]/50",
      },
      size: {
        sm: "h-8 px-2 text-[length:var(--font-size--1)]",
        default: "h-10 px-3 text-[length:var(--font-size-0)]",
        lg: "h-12 px-4 text-[length:var(--font-size-1)]",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  error?: boolean
  success?: boolean
  helperText?: string
  errorMessage?: string
  successMessage?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, success, helperText, errorMessage, successMessage, ...props }, ref) => {
    // Determine variant based on error/success state
    const inputVariant = error ? "error" : success ? "success" : variant

    return (
      <div className="space-y-1">
        <input
          className={cn(inputVariants({ variant: inputVariant, size, className }))}
          ref={ref}
          aria-invalid={error}
          aria-describedby={
            error && errorMessage
              ? `${props.id}-error`
              : success && successMessage
              ? `${props.id}-success`
              : helperText
              ? `${props.id}-helper`
              : undefined
          }
          {...props}
        />
        {error && errorMessage && (
          <p
            id={`${props.id}-error`}
            className="text-[length:var(--font-size--1)] text-[var(--color-status-error)]"
            role="alert"
          >
            {errorMessage}
          </p>
        )}
        {success && successMessage && (
          <p
            id={`${props.id}-success`}
            className="text-[length:var(--font-size--1)] text-[var(--color-status-success)]"
          >
            {successMessage}
          </p>
        )}
        {helperText && !error && !success && (
          <p
            id={`${props.id}-helper`}
            className="text-[length:var(--font-size--1)] text-[var(--color-text-muted)]"
          >
            {helperText}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }
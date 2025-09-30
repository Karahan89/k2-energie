import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@workspace/ui/lib/utils"

const dialogVariants = cva(
  "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-[var(--modal-border)] bg-[var(--modal-background)] p-6 shadow-[var(--modal-shadow)] duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[var(--radius-lg)]",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-lg",
        lg: "max-w-2xl",
        xl: "max-w-4xl",
        full: "max-w-[95vw] max-h-[95vh]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

const dialogOverlayVariants = cva(
  "fixed inset-0 z-50 bg-[var(--modal-overlay)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
)

const dialogContentVariants = cva(
  "relative flex w-full flex-col overflow-hidden"
)

const dialogHeaderVariants = cva(
  "flex flex-col space-y-1.5 text-center sm:text-left"
)

const dialogTitleVariants = cva(
  "text-[length:var(--font-size-2)] font-semibold leading-none tracking-tight text-[var(--modal-text)]"
)

const dialogDescriptionVariants = cva(
  "text-[length:var(--font-size-0)] text-[var(--color-text-muted)]"
)

const dialogFooterVariants = cva(
  "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2"
)

const dialogCloseVariants = cva(
  "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-[var(--color-background-base)] transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[var(--focus-ring-color)] focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--color-background-muted)] data-[state=open]:text-[var(--color-text-muted)]"
)

export type DialogProps = React.ComponentPropsWithoutRef<"dialog"> &
  VariantProps<typeof dialogVariants> & {
    open?: boolean
    onOpenChange?: (open: boolean) => void
  }

export type DialogContentProps = React.HTMLAttributes<HTMLDivElement>

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>

export type DialogTitleProps = React.HTMLAttributes<HTMLHeadingElement>

export type DialogDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>

export type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement>

// Dialog Root Component
const Dialog = React.forwardRef<HTMLDialogElement, DialogProps>(
  ({ className, size, open, onOpenChange, children, ...props }, ref) => {
    const dialogRef = React.useRef<HTMLDialogElement>(null)

    React.useEffect(() => {
      const dialog = dialogRef.current
      if (!dialog) return

      if (open) {
        dialog.showModal()
      } else {
        dialog.close()
      }
    }, [open])

    const handleClose = React.useCallback(() => {
      onOpenChange?.(false)
    }, [onOpenChange])

    const handleKeyDown = React.useCallback((event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose()
      }
    }, [handleClose])

    return (
      <dialog
        ref={ref || dialogRef}
        className={cn(dialogVariants({ size, className }))}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </dialog>
    )
  }
)
Dialog.displayName = "Dialog"

// Dialog Overlay
const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dialogOverlayVariants(), className)}
      {...props}
    />
  )
)
DialogOverlay.displayName = "DialogOverlay"

// Dialog Content
const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dialogContentVariants(), className)}
      {...props}
    >
      {children}
    </div>
  )
)
DialogContent.displayName = "DialogContent"

// Dialog Header
const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dialogHeaderVariants(), className)}
      {...props}
    />
  )
)
DialogHeader.displayName = "DialogHeader"

// Dialog Title
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn(dialogTitleVariants(), className)}
      {...props}
    />
  )
)
DialogTitle.displayName = "DialogTitle"

// Dialog Description
const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(dialogDescriptionVariants(), className)}
      {...props}
    />
  )
)
DialogDescription.displayName = "DialogDescription"

// Dialog Footer
const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(dialogFooterVariants(), className)}
      {...props}
    />
  )
)
DialogFooter.displayName = "DialogFooter"

// Dialog Close Button
const DialogClose = React.forwardRef<HTMLButtonElement, DialogCloseProps>(
  ({ className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(dialogCloseVariants(), className)}
      {...props}
    >
      {children || (
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      <span className="sr-only">Schließen</span>
    </button>
  )
)
DialogClose.displayName = "DialogClose"

export {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
}
import { cn } from "@workspace/ui/lib/utils";
import type { ReactNode } from "react";

type SurfaceVariant = "default" | "muted" | "hero";

const surfaceByVariant: Record<SurfaceVariant, string> = {
  default:
    "bg-[color:var(--surface-strong)] border border-[color:var(--border)] shadow-[var(--shadow-soft)]",
  muted:
    "bg-[color:var(--surface-muted)] border border-[color:var(--border)] shadow-[var(--shadow-soft)]",
  hero: "bg-[color:var(--surface-subtle)] border border-[color:var(--border)] shadow-[var(--shadow-elevated)]",
};

const accentByVariant: Record<SurfaceVariant, string[]> = {
  hero: [
    "absolute -top-24 right-24 h-48 w-48 rounded-full bg-[color:var(--accent-400)]/14 blur-[120px]",
    "absolute bottom-[-20%] left-1/3 h-40 w-40 rounded-full bg-[color:var(--brand-200)]/18 blur-[110px]",
  ],
  default: [
    "absolute -top-20 left-16 h-36 w-36 rounded-full bg-[color:var(--brand-100)]/18 blur-[95px]",
  ],
  muted: [
    "absolute bottom-[-18%] right-20 h-32 w-32 rounded-full bg-[color:var(--brand-200)]/16 blur-[90px]",
  ],
};

export interface AmbientSurfaceProps
  extends React.ComponentPropsWithoutRef<"section"> {
  readonly variant?: SurfaceVariant;
  readonly children: ReactNode;
  readonly withTopDivider?: boolean;
  readonly withBottomDivider?: boolean;
}

export function AmbientSurface({
  children,
  className,
  variant = "default",
  withTopDivider,
  withBottomDivider = true,
  ...props
}: AmbientSurfaceProps) {
  const accents = accentByVariant[variant] ?? [];

  return (
    <section
      {...props}
      className={cn(
        "relative isolate overflow-hidden rounded-3xl",
        "transition-colors duration-300",
        surfaceByVariant[variant],
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {accents.map((accent, index) => (
          <span key={`accent-${variant}-${index}`} className={accent} />
        ))}
        {withTopDivider ? (
          <span className="absolute inset-x-0 top-0 h-px bg-[color:var(--border)]/60" />
        ) : null}
        {withBottomDivider ? (
          <span className="absolute inset-x-0 bottom-0 h-px bg-[color:var(--border)]/60" />
        ) : null}
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}

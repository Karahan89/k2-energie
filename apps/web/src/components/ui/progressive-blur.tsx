import { cn } from "@workspace/ui/lib/utils";
import type { CSSProperties, ReactNode } from "react";

export interface BlurLayer {
  readonly className?: string;
  readonly style?: CSSProperties;
}

export interface ProgressiveBlurProps
  extends React.ComponentPropsWithoutRef<"div"> {
  readonly children?: ReactNode;
  readonly layers?: BlurLayer[];
}

const defaultLayers: BlurLayer[] = [
  {
    className:
      "absolute -top-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-[var(--color-brand-primary)] opacity-[0.2] blur-[160px]",
  },
  {
    className:
      "absolute bottom-[-30%] left-1/3 h-[22rem] w-[22rem] rounded-full bg-[var(--color-interactive-cta)] opacity-[0.15] blur-[180px]",
  },
  {
    className:
      "absolute -bottom-16 left-12 h-[18rem] w-[18rem] rounded-full bg-[var(--color-brand-secondary)] opacity-[0.1] blur-[140px]",
  },
];

export function ProgressiveBlur({
  children,
  className,
  layers = defaultLayers,
  ...props
}: ProgressiveBlurProps) {
  return (
    <div
      {...props}
      className={cn(
        "relative isolate overflow-hidden bg-[var(--color-surface-base)]",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {layers.map((layer, index) => (
          <span
            key={`blur-layer-${index}`}
            className={cn("block", layer.className)}
            style={layer.style}
          />
        ))}
      </div>
      {children}
    </div>
  );
}

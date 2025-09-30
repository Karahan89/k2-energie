import { cn } from "@workspace/ui/lib/utils";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import useMeasure from "react-use-measure";

export interface InfiniteSliderProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly speed?: number;
  readonly pauseOnHover?: boolean;
  readonly ariaLabel?: string;
}

/**
 * Horizontales Auto-Scrolling mit Framer Motion. Respektiert `prefers-reduced-motion`.
 */
export function InfiniteSlider({
  children,
  className,
  speed = 60,
  pauseOnHover = true,
  ariaLabel,
}: InfiniteSliderProps) {
  const autoplayControls = useAnimation();
  const prefersReducedMotion = useReducedMotion();
  const [isPaused, setIsPaused] = useState(false);
  const [trackRef, { width }] = useMeasure();

  const items = useMemo(() => React.Children.toArray(children), [children]);

  useEffect(() => {
    let mounted = true;

    async function loop() {
      if (prefersReducedMotion || width === 0 || items.length === 0) {
        await autoplayControls.set({ x: 0 });
        return;
      }

      const duration = width / speed;
      while (mounted && !isPaused) {
        await autoplayControls.start({
          x: -width,
          transition: {
            duration,
            ease: "linear",
          },
        });
        await autoplayControls.set({ x: 0 });
      }
    }

    loop();

    return () => {
      mounted = false;
      autoplayControls.stop();
    };
  }, [
    autoplayControls,
    prefersReducedMotion,
    width,
    speed,
    isPaused,
    items.length,
  ]);

  const duplicates = useMemo(() => {
    if (items.length === 0) return null;
    return items.map((item, index) => (
      <div key={`clone-${index}`} className="flex items-center">
        {item}
      </div>
    ));
  }, [items]);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden",
        "rounded-full border border-[color:var(--color-border-muted)]",
        className,
      )}
      onPointerEnter={pauseOnHover ? () => setIsPaused(true) : undefined}
      onPointerLeave={pauseOnHover ? () => setIsPaused(false) : undefined}
      aria-label={ariaLabel}
    >
      <motion.div
        className="flex w-max items-center"
        animate={autoplayControls}
        aria-hidden={prefersReducedMotion ? undefined : true}
      >
        <div className="flex items-center" ref={trackRef}>
          {items.map((item, index) => (
            <div key={`item-${index}`} className="flex items-center">
              {item}
            </div>
          ))}
        </div>
        {duplicates}
      </motion.div>
    </div>
  );
}

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties, FC } from "react";

const containerStyle: CSSProperties = {
  backgroundColor:
    "color-mix(in srgb, var(--color-surface-muted) 88%, transparent 12%)",
};

export const PreviewBar: FC = () => {
  const path = usePathname();
  return (
    <div className="fixed bottom-1 left-0 right-0 z-10 px-2 md:bottom-2 md:px-4">
      <div
        className="mx-auto max-w-96 rounded-md border border-[color:var(--color-border-muted)] p-2 shadow-soft backdrop-blur-sm"
        style={containerStyle}
      >
        <div className="flex items-center">
          <div className="flex-1">
            <p className="text-xs text-[color:var(--color-text-muted)]">
              Viewing the website in preview mode.
            </p>
          </div>
          <Link
            className="text-xs font-medium text-[color:var(--color-interactive-cta)] transition-colors hover:text-[color:var(--color-interactive-cta-hover)]"
            href={`/api/disable-draft?slug=${path}`}
            prefetch={false}
          >
            Exit
          </Link>
        </div>
      </div>
    </div>
  );
};

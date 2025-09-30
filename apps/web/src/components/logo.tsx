import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import type { Maybe, SanityImageProps } from "@/types";

import { SanityImage } from "./elements/sanity-image";

const LOGO_URL =
  "https://cdn.sanity.io/images/s6kuy1ts/production/68c438f68264717e93c7ba1e85f1d0c4b58b33c2-1200x621.svg";

interface LogoProps {
  src?: Maybe<string>;
  image?: Maybe<SanityImageProps>;
  alt?: Maybe<string>;
  width?: number;
  height?: number;
  priority?: boolean;
}

const DEFAULT_WIDTH = 170;
const DEFAULT_HEIGHT = 40;

export function Logo({
  src,
  alt = "logo",
  image,
  width = DEFAULT_WIDTH,
  height = DEFAULT_HEIGHT,
  priority = true,
}: LogoProps) {
  const resolvedAlt = alt ?? "logo";
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/" aria-label="Zur Startseite">
      <span
        className="inline-flex items-center justify-center"
        style={{ width, height }}
      >
        {image ? (
          <SanityImage
            image={image}
            alt={resolvedAlt}
            className={`h-full w-full object-contain transition-all duration-300 ${
              isDarkMode
                ? "brightness-150 contrast-125 saturate-150 hue-rotate-10"
                : ""
            }`}
            loading="eager"
            decoding="sync"
          />
        ) : (
          <Image
            src={src ?? LOGO_URL}
            alt={resolvedAlt}
            width={width}
            height={height}
            className={`h-full w-full object-contain transition-all duration-300 ${
              isDarkMode
                ? "brightness-150 contrast-125 saturate-150 hue-rotate-10"
                : ""
            }`}
            loading="eager"
            priority={priority}
            decoding="sync"
            style={{ width, height }}
          />
        )}
      </span>
    </Link>
  );
}

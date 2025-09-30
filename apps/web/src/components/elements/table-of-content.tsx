"use client";
import type { FC } from "react";

import type { SanityRichTextProps } from "@/types";

interface TableOfContentProps {
  richText?: SanityRichTextProps;
  className?: string;
  maxDepth?: number;
}

export const TableOfContent: FC<TableOfContentProps> = () => null;

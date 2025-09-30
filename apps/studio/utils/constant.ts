import {
  BlockElementIcon,
  ComposeIcon,
  InlineElementIcon,
  InsertAboveIcon,
  SearchIcon,
} from "@sanity/icons";
import type { FieldGroupDefinition } from "sanity";

export const GROUP = {
  SEO: "seo",
  MAIN_CONTENT: "main-content",
  CARD: "card",
  RELATED: "related",
  OG: "og",
};

export const GROUPS: FieldGroupDefinition[] = [
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeIcon,
    title: "Inhalt",
    default: true,
  },
  {
    name: GROUP.SEO,
    icon: SearchIcon,
    title: "SEO & Suchmaschinenoptimierung",
    description: "Einstellungen für bessere Sichtbarkeit in Suchmaschinen",
  },
  {
    name: GROUP.OG,
    icon: InsertAboveIcon,
    title: "Social Media",
    description: "Vorschau-Bilder und Texte für Facebook, Twitter etc.",
  },
  {
    name: GROUP.CARD,
    icon: BlockElementIcon,
    title: "Karten-Ansicht",
    description: "Einstellungen für die Darstellung in Übersichten",
  },
  {
    name: GROUP.RELATED,
    icon: InlineElementIcon,
    title: "Verwandte Inhalte",
    description: "Links zu anderen Seiten und Inhalten",
  },
];

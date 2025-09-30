import {
  Building2,
  ClipboardList,
  CogIcon,
  CompassIcon,
  File,
  FileText,
  Gavel,
  HomeIcon,
  Landmark,
  type LucideIcon,
  MessageCircle,
  PanelBottom,
  PanelBottomIcon,
  PhoneCall,
  Settings2,
  SparkleIcon,
  TrendingUpDown,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import { createSlugBasedStructure } from "./components/nested-pages-strucure";
import type { SchemaType, SingletonType } from "./schemaTypes";
import { getTitleCase } from "./utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title("K2 Energieberatung CMS")
    .items([
      // Hauptseiten
      S.listItem()
        .title("🏠 Hauptseiten")
        .icon(HomeIcon)
        .child(
          S.list()
            .title("Hauptseiten")
            .items([
              createSingleTon({
                S,
                type: "homePage",
                title: "Startseite",
                icon: HomeIcon,
              }),
              createSingleTon({
                S,
                type: "companyPage",
                title: "Unternehmen",
                icon: Building2,
              }),
              createSingleTon({
                S,
                type: "contactPage",
                title: "Kontakt",
                icon: PhoneCall,
              }),
              createSingleTon({
                S,
                type: "service",
                title: "Leistungen",
                icon: SparkleIcon,
              }),
              createSingleTon({
                S,
                type: "project",
                title: "Projekte & Referenzen",
                icon: Landmark,
              }),
            ]),
        ),

      S.divider(),

      // Inhalte
      S.listItem()
        .title("📄 Inhalte")
        .icon(FileText)
        .child(
          S.list()
            .title("Inhalte")
            .items([
              createSlugBasedStructure(S, "page"),
              createList({
                S,
                type: "serviceItem",
                title: "Einzelne Leistungen",
                icon: SparkleIcon,
              }),
              createList({
                S,
                type: "serviceCategory",
                title: "Leistungskategorien",
                icon: PanelBottom,
              }),
              createList({
                S,
                type: "projectItem",
                title: "Einzelne Projekte",
                icon: Landmark,
              }),
              createList({
                S,
                type: "faq",
                title: "Häufige Fragen",
                icon: MessageCircle,
              }),
              createList({
                S,
                type: "legalPage",
                title: "Rechtliches",
                icon: Gavel,
              }),
            ]),
        ),

      S.divider(),

      // Technische Einstellungen
      S.listItem()
        .title("⚙️ Einstellungen")
        .icon(Settings2)
        .child(
          S.list()
            .title("Einstellungen")
            .items([
              createSingleTon({
                S,
                type: "siteSettings",
                title: "Globale Einstellungen",
                icon: CogIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: "Footer",
                icon: PanelBottomIcon,
              }),
              S.listItem()
                .title("Navigation")
                .icon(ClipboardList)
                .child(
                  S.list()
                    .title("Navigation verwalten")
                    .items([
                      S.listItem()
                        .title("Header Navigation")
                        .icon(CompassIcon)
                        .child(
                          S.documentList()
                            .title("Header Navigation")
                            .filter(
                              '_type == "navigationItem" && location == "header"',
                            )
                            .defaultOrdering([
                              { field: "order", direction: "asc" },
                            ]),
                        ),
                      S.listItem()
                        .title("Footer Navigation")
                        .icon(CompassIcon)
                        .child(
                          S.documentList()
                            .title("Footer Navigation")
                            .filter(
                              '_type == "navigationItem" && location == "footer"',
                            )
                            .defaultOrdering([
                              { field: "order", direction: "asc" },
                            ]),
                        ),
                      S.divider(),
                      S.listItem()
                        .title("Alle Navigationseinträge")
                        .icon(ClipboardList)
                        .child(
                          S.documentList()
                            .title("Alle Navigationseinträge")
                            .filter('_type == "navigationItem"')
                            .defaultOrdering([
                              { field: "location", direction: "asc" },
                              { field: "order", direction: "asc" },
                            ]),
                        ),
                    ]),
                ),
              createList({
                S,
                type: "redirect",
                title: "Weiterleitungen",
                icon: TrendingUpDown,
              }),
            ]),
        ),
    ]);
};

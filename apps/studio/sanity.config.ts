import { assist } from "@sanity/assist";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { unsplashImageAsset } from "sanity-plugin-asset-source-unsplash";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media } from "sanity-plugin-media";

import { Logo } from "./components/logo";
import { locations } from "./location";
import { presentationUrl } from "./plugins/presentation-url";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { getPresentationUrl } from "./utils/helper";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET;

export default defineConfig({
  name: "default",
  title: "K2 Energieberatung CMS",
  icon: Logo,
  projectId: projectId,
  dataset: dataset ?? "production",
  releases: {
    enabled: true,
  },
  plugins: [
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: getPresentationUrl(),
        previewMode: {
          enable: "/api/presentation-draft",
        },
      },
    }),
    structureTool({
      structure,
    }),
    presentationUrl(),
    visionTool(),
    unsplashImageAsset(),
    media(),
    iconPicker(),
    assist(),
  ],
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") return [];
      return prev;
    },
  },
  schema: {
    types: schemaTypes,
    templates: [
      {
        id: "nested-page-template",
        title: "Neue Unterseite",
        schemaType: "page",
        description:
          "Erstellen Sie eine neue Unterseite mit automatischem URL-Slug",
        value: (props: { slug?: string; title?: string }) => {
          return {
            ...(props.slug
              ? { slug: { current: props.slug, _type: "slug" } }
              : {}),
            ...(props.title ? { title: props.title } : {}),
          };
        },
        parameters: [
          {
            name: "slug",
            type: "string",
            title: "URL-Slug",
            description: "Die Web-Adresse für diese Seite (z.B. 'ueber-uns')",
          },
          {
            name: "title",
            type: "string",
            title: "Seitentitel",
            description: "Der Titel der Seite",
          },
        ],
      },
      {
        id: "service-template",
        title: "Neue Leistung",
        schemaType: "service",
        description:
          "Erstellen Sie eine neue Dienstleistung für Ihr Ingenieurbüro",
        value: (props: { title?: string }) => {
          return {
            ...(props.title ? { title: props.title } : {}),
          };
        },
        parameters: [
          {
            name: "title",
            type: "string",
            title: "Leistungstitel",
            description: "z.B. 'Energieberatung für Wohngebäude'",
          },
        ],
      },
      {
        id: "project-template",
        title: "Neues Projekt",
        schemaType: "project",
        description: "Erstellen Sie eine neue Projekt-Referenz",
        value: (props: { title?: string }) => {
          return {
            ...(props.title ? { title: props.title } : {}),
          };
        },
        parameters: [
          {
            name: "title",
            type: "string",
            title: "Projekttitel",
            description: "z.B. 'Energetische Sanierung Einfamilienhaus'",
          },
        ],
      },
    ],
  },
});

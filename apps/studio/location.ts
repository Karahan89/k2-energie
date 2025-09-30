import { defineLocations } from "sanity/presentation";

export const locations = {
  home: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: () => {
      return {
        locations: [
          {
            title: "Home",
            href: "/",
          },
        ],
      };
    },
  }),
  page: defineLocations({
    select: {
      title: "title",
      slug: "slug.current",
    },
    resolve: (doc) => {
      return {
        locations: [
          {
            title: doc?.title || "Untitled",
            href: `${doc?.slug}`,
          },
        ],
      };
    },
  }),
  service: defineLocations({
    select: {
      title: "title",
    },
    resolve: () => {
      return {
        locations: [
          {
            title: "Leistungen",
            href: "/leistungen",
          },
        ],
      };
    },
  }),
  project: defineLocations({
    select: {
      title: "title",
    },
    resolve: () => {
      return {
        locations: [
          {
            title: "Projekte & Referenzen",
            href: "/projekte",
          },
        ],
      };
    },
  }),
};

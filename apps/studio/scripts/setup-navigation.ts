import { createClient, type SanityClient } from "@sanity/client";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset =
  process.env.SANITY_STUDIO_DATASET ?? process.env.NEXT_PUBLIC_SANITY_DATASET;

const token =
  process.env.SANITY_WRITE_TOKEN ??
  process.env.SANITY_API_TOKEN ??
  process.env.SANITY_STUDIO_WRITE_TOKEN ??
  process.env.SANITY_EXEC_USER_TOKEN ??
  process.env.SANITY_CLI_USER_TOKEN ??
  process.env.SANITY_AUTH_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET environment variables.",
  );
}

if (!token) {
  throw new Error(
    "Missing Sanity write token. Pass --with-user-token or configure SANITY_WRITE_TOKEN.",
  );
}

const client: SanityClient = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

/**
 * Script to set up the main navigation structure
 * This creates the essential navigation items for the website
 */

const navigationItems = [
  // Header Navigation
  {
    _type: "navigationItem",
    title: "Startseite",
    location: "header",
    order: 1,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "homePage", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "Leistungen",
    location: "header",
    order: 2,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "service", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "Projekte",
    location: "header",
    order: 3,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "project", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "Über uns",
    location: "header",
    order: 4,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "companyPage", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "Kontakt",
    location: "header",
    order: 5,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "contactPage", // This will be replaced with actual ID
    },
  },
  // Footer Navigation
  {
    _type: "navigationItem",
    title: "Impressum",
    location: "footer",
    order: 1,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "legalPage", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "Datenschutz",
    location: "footer",
    order: 2,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "legalPage", // This will be replaced with actual ID
    },
  },
  {
    _type: "navigationItem",
    title: "FAQ",
    location: "footer",
    order: 3,
    kind: "internal",
    internal: {
      _type: "reference",
      _ref: "faq", // This will be replaced with actual ID
    },
  },
];

export async function setupNavigation() {
  console.log("🚀 Setting up navigation structure...");

  try {
    // First, get the actual IDs of the singleton documents
    const singletons = await client.fetch(`
      *[_type in ["homePage", "companyPage", "contactPage", "service", "project", "faq"]]{
        _id,
        _type
      }
    `);

    // Create a mapping of type to ID
    const typeToId = singletons.reduce((acc: Record<string, string>, doc: any) => {
      acc[doc._type] = doc._id;
      return acc;
    }, {});

    // Get legal pages
    const legalPages = await client.fetch(`
      *[_type == "legalPage"]{
        _id,
        category
      }
    `);

    // Find specific legal pages
    const impressumPage = legalPages.find((page: any) => page.category === "impressum");
    const datenschutzPage = legalPages.find((page: any) => page.category === "datenschutz");

    // Update navigation items with actual IDs
    const updatedItems = navigationItems.map((item) => {
      const newItem = { ...item };
      
      if (item.internal) {
        const refType = item.internal._ref;
        if (refType === "legalPage") {
          if (item.title === "Impressum" && impressumPage) {
            newItem.internal._ref = impressumPage._id;
          } else if (item.title === "Datenschutz" && datenschutzPage) {
            newItem.internal._ref = datenschutzPage._id;
          }
        } else if (typeToId[refType]) {
          newItem.internal._ref = typeToId[refType];
        }
      }
      
      return newItem;
    });

    // Check if navigation items already exist
    const existingItems = await client.fetch(`
      *[_type == "navigationItem"]{
        _id,
        title,
        location
      }
    `);

    // Only create items that don't exist
    const itemsToCreate = updatedItems.filter((item) => {
      return !existingItems.some((existing: any) => 
        existing.title === item.title && existing.location === item.location
      );
    });

    if (itemsToCreate.length === 0) {
      console.log("✅ All navigation items already exist");
      return;
    }

    // Create the navigation items
    const createdItems = await client.create(itemsToCreate);
    
    console.log(`✅ Created ${createdItems.length} navigation items:`);
    createdItems.forEach((item: any) => {
      console.log(`  - ${item.title} (${item.location})`);
    });

  } catch (error) {
    console.error("❌ Error setting up navigation:", error);
    throw error;
  }
}

// Run the script if called directly
if (require.main === module) {
  setupNavigation()
    .then(() => {
      console.log("🎉 Navigation setup completed!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Navigation setup failed:", error);
      process.exit(1);
    });
}

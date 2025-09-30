import path from "node:path";

import { createClient, type SanityClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: path.resolve(process.cwd(), ".env.local") });
loadEnv({ path: path.resolve(process.cwd(), ".env") });
loadEnv({ path: path.resolve(process.cwd(), "..", ".env") });

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

const client: SanityClient = createClient({
  projectId,
  dataset,
  apiVersion: "2025-08-29",
  useCdn: false,
  token,
});

const categories = [
  {
    title: "Wohngebäude",
    slug: "wohngebaeude",
    description: "Energieberatung und Sanierungsfahrpläne für Wohngebäude",
    icon: "home",
    order: 1,
    color: "blue",
    isActive: true,
  },
  {
    title: "Nichtwohngebäude",
    slug: "nichtwohngebaeude",
    description:
      "Energieberatung und Audits für Gewerbe, Industrie und öffentliche Gebäude",
    icon: "building-2",
    order: 2,
    color: "green",
    isActive: true,
  },
  {
    title: "Anlagen & Prozesse",
    slug: "anlagen-prozesse",
    description: "Spezialisierte Energieberatung für Anlagen und Prozesse",
    icon: "factory",
    order: 3,
    color: "orange",
    isActive: true,
  },
];

async function setupServiceCategories() {
  try {
    console.log("🚀 Setting up Service Categories...");

    for (const categoryData of categories) {
      // Check if category already exists
      const existingCategory = await client.fetch(
        `*[_type == "serviceCategory" && slug.current == "${categoryData.slug}"][0]`,
      );

      if (existingCategory) {
        console.log(`✅ Category "${categoryData.title}" already exists`);
        continue;
      }

      // Create category
      const category = await client.create({
        _type: "serviceCategory",
        ...categoryData,
      });

      console.log(
        `✅ Created category: ${categoryData.title} (${category._id})`,
      );
    }

    console.log("🎉 Service Categories setup completed!");
  } catch (error: any) {
    console.error("❌ Error setting up service categories:", error.message);
    throw error;
  }
}

// Run the setup
setupServiceCategories().catch((error) => {
  console.error("Setup failed:", error);
  process.exit(1);
});

#!/usr/bin/env tsx

import { createClient, type SanityClient } from "@sanity/client";
import { loadEnvConfig } from "@next/env";

// Load environment variables
const { combinedEnv } = loadEnvConfig(process.cwd());

const projectId = combinedEnv.SANITY_STUDIO_PROJECT_ID || combinedEnv.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = combinedEnv.SANITY_STUDIO_DATASET || combinedEnv.NEXT_PUBLIC_SANITY_DATASET;
const token = combinedEnv.SANITY_WRITE_TOKEN || combinedEnv.SANITY_API_TOKEN || combinedEnv.SANITY_STUDIO_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing SANITY_STUDIO_PROJECT_ID or SANITY_STUDIO_DATASET environment variables."
  );
}

if (!token) {
  throw new Error(
    "Missing Sanity write token. Configure SANITY_WRITE_TOKEN environment variable."
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
 * Automatically set up navigation based on available pages
 */
async function setupNavigationAuto() {
  console.log("🚀 Setting up navigation automatically...");
  console.log(`📡 Project: ${projectId}`);
  console.log(`🗄️ Dataset: ${dataset}`);

  try {
    // Get all available singleton pages
    const singletons = await client.fetch(`
      *[_type in ["homePage", "companyPage", "contactPage", "service", "project", "faq"]]{
        _id,
        _type,
        title,
        "slug": slug.current
      }
    `);

    // Get legal pages
    const legalPages = await client.fetch(`
      *[_type == "legalPage"]{
        _id,
        title,
        category,
        "slug": slug.current
      }
    `);

    console.log("📄 Found singletons:", singletons.map(s => `${s._type}: ${s.title}`));
    console.log("📄 Found legal pages:", legalPages.map(l => `${l.category}: ${l.title}`));

    // Create mapping of type to document
    const typeToDoc = singletons.reduce((acc: Record<string, any>, doc: any) => {
      acc[doc._type] = doc;
      return acc;
    }, {});

    // Find specific legal pages
    const impressumPage = legalPages.find((page: any) => page.category === "impressum");
    const datenschutzPage = legalPages.find((page: any) => page.category === "datenschutz");

    // Define navigation structure
    const navigationItems = [
      // Header Navigation
      {
        _type: "navigationItem",
        title: "Startseite",
        location: "header",
        order: 1,
        kind: "internal",
        internal: typeToDoc.homePage ? { _type: "reference", _ref: typeToDoc.homePage._id } : null,
      },
      {
        _type: "navigationItem",
        title: "Leistungen",
        location: "header",
        order: 2,
        kind: "internal",
        internal: typeToDoc.service ? { _type: "reference", _ref: typeToDoc.service._id } : null,
      },
      {
        _type: "navigationItem",
        title: "Projekte",
        location: "header",
        order: 3,
        kind: "internal",
        internal: typeToDoc.project ? { _type: "reference", _ref: typeToDoc.project._id } : null,
      },
      {
        _type: "navigationItem",
        title: "Über uns",
        location: "header",
        order: 4,
        kind: "internal",
        internal: typeToDoc.companyPage ? { _type: "reference", _ref: typeToDoc.companyPage._id } : null,
      },
      {
        _type: "navigationItem",
        title: "Kontakt",
        location: "header",
        order: 5,
        kind: "internal",
        internal: typeToDoc.contactPage ? { _type: "reference", _ref: typeToDoc.contactPage._id } : null,
      },
      // Footer Navigation
      {
        _type: "navigationItem",
        title: "Impressum",
        location: "footer",
        order: 1,
        kind: "internal",
        internal: impressumPage ? { _type: "reference", _ref: impressumPage._id } : null,
      },
      {
        _type: "navigationItem",
        title: "Datenschutz",
        location: "footer",
        order: 2,
        kind: "internal",
        internal: datenschutzPage ? { _type: "reference", _ref: datenschutzPage._id } : null,
      },
      {
        _type: "navigationItem",
        title: "FAQ",
        location: "footer",
        order: 3,
        kind: "internal",
        internal: typeToDoc.faq ? { _type: "reference", _ref: typeToDoc.faq._id } : null,
      },
    ].filter(item => item.internal); // Only include items with valid references

    // Check existing navigation items
    const existingItems = await client.fetch(`
      *[_type == "navigationItem"]{
        _id,
        title,
        location,
        order
      }
    `);

    console.log(`📋 Found ${existingItems.length} existing navigation items`);

    // Only create items that don't exist
    const itemsToCreate = navigationItems.filter((item) => {
      return !existingItems.some((existing: any) => 
        existing.title === item.title && existing.location === item.location
      );
    });

    if (itemsToCreate.length === 0) {
      console.log("✅ All navigation items already exist");
      return;
    }

    console.log(`🆕 Creating ${itemsToCreate.length} new navigation items...`);

    // Create navigation items one by one
    const createdItems = [];
    for (const item of itemsToCreate) {
      try {
        const createdItem = await client.create(item);
        createdItems.push(createdItem);
        console.log(`  ✅ Created: ${item.title} (${item.location})`);
      } catch (error) {
        console.error(`  ❌ Failed to create ${item.title}:`, error.message);
      }
    }
    
    console.log("✅ Successfully created navigation items:");
    createdItems.forEach((item: any) => {
      console.log(`  - ${item.title} (${item.location}) - Order: ${item.order}`);
    });

    // Display current navigation structure
    console.log("\n📋 Current Navigation Structure:");
    console.log("Header:");
    const headerItems = [...existingItems, ...createdItems]
      .filter(item => item.location === "header")
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    headerItems.forEach(item => console.log(`  ${item.order}. ${item.title}`));

    console.log("Footer:");
    const footerItems = [...existingItems, ...createdItems]
      .filter(item => item.location === "footer")
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    footerItems.forEach(item => console.log(`  ${item.order}. ${item.title}`));

  } catch (error) {
    console.error("❌ Error setting up navigation:", error);
    throw error;
  }
}

// Run the script
setupNavigationAuto()
  .then(() => {
    console.log("\n🎉 Navigation setup completed successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n💥 Navigation setup failed:", error);
    process.exit(1);
  });

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
  apiVersion: "2025-08-29",
  useCdn: false,
  token,
});

async function checkFooter() {
  try {
    console.log("🔍 Checking Footer data...");

    const footer = await client.fetch('*[_type == "footer"][0]');
    
    console.log("📋 Footer data:");
    console.log(JSON.stringify(footer, null, 2));
    
    if (footer?.copyrightLinks?.copyrightLinks) {
      console.log("✅ Copyright links found:", footer.copyrightLinks.copyrightLinks.length);
    } else {
      console.log("❌ No copyright links found");
    }
    
  } catch (error: any) {
    console.error("❌ Failed to check footer:", error.message);
  }
}

checkFooter();

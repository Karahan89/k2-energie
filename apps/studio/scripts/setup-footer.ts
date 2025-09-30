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

async function setupFooter() {
  try {
    console.log("🚀 Setting up Footer configuration...");

    // Check if footer already exists
    const existingFooter = await client.fetch('*[_type == "footer"][0]');
    
    if (existingFooter) {
      console.log("✅ Footer configuration already exists:");
      console.log(`  - Title: ${existingFooter.title || "Not set"}`);
      console.log(`  - Company: ${existingFooter.contactInfo?.companyName || "Not set"}`);
      
      // Check if footer needs updating
      if (!existingFooter.contactInfo?.companyName || !existingFooter.copyrightLinks?.copyrightLinks) {
        console.log("🔄 Footer needs updating, applying default configuration...");
        
        const updateData = {
          contactInfo: {
            companyName: "K2 Energieberatung",
            address: "Lengede, Deutschland",
            phone: "+49 (0) 123 456-7890",
            email: "info@k2-energie.de",
          },
          socialLinks: {
            facebook: "",
            twitter: "",
            instagram: "",
            linkedin: "",
            youtube: "",
          },
          footerLinks: {
            quickLinks: [
              {
                title: "Startseite",
                href: "/",
                openInNewTab: false,
              },
              {
                title: "Leistungen",
                href: "/leistungen",
                openInNewTab: false,
              },
              {
                title: "Projekte",
                href: "/projekte",
                openInNewTab: false,
              },
              {
                title: "Über uns",
                href: "/unternehmen",
                openInNewTab: false,
              },
              {
                title: "Kontakt",
                href: "/kontakt",
                openInNewTab: false,
              },
            ],
          },
          copyrightLinks: {
            copyrightLinks: [
              {
                title: "Impressum",
                href: "/impressum",
                openInNewTab: false,
              },
              {
                title: "Datenschutz",
                href: "/datenschutz",
                openInNewTab: false,
              },
            ],
          },
          copyrightText: "Alle Rechte vorbehalten.",
        };

        const updatedFooter = await client
          .patch(existingFooter._id)
          .set(updateData)
          .commit();
        
        console.log("✅ Footer configuration updated successfully!");
        console.log(`  - ID: ${updatedFooter._id}`);
        console.log(`  - Company: ${updatedFooter.contactInfo.companyName}`);
      } else {
        console.log("ℹ️  Footer is already properly configured. You can edit it in the Studio.");
      }
      return;
    }

      // Create footer configuration
      const footerData = {
        _type: "footer",
        title: "Footer",
        contactInfo: {
          companyName: "K2 Energieberatung",
          address: "Lengede, Deutschland",
          phone: "+49 (0) 123 456-7890",
          email: "info@k2-energie.de",
        },
      socialLinks: {
        facebook: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        youtube: "",
      },
      footerLinks: {
        quickLinks: [
          {
            title: "Startseite",
            href: "/",
            openInNewTab: false,
          },
          {
            title: "Leistungen",
            href: "/leistungen",
            openInNewTab: false,
          },
          {
            title: "Projekte",
            href: "/projekte",
            openInNewTab: false,
          },
          {
            title: "Über uns",
            href: "/unternehmen",
            openInNewTab: false,
          },
          {
            title: "Kontakt",
            href: "/kontakt",
            openInNewTab: false,
          },
        ],
      },
      copyrightLinks: {
        copyrightLinks: [
          {
            title: "Impressum",
            href: "/impressum",
            openInNewTab: false,
          },
          {
            title: "Datenschutz",
            href: "/datenschutz",
            openInNewTab: false,
          },
        ],
      },
      copyrightText: "Alle Rechte vorbehalten.",
    };

    const createdFooter = await client.create(footerData);
    
    console.log("✅ Footer configuration created successfully!");
    console.log(`  - ID: ${createdFooter._id}`);
    console.log(`  - Title: ${createdFooter.title}`);
    console.log(`  - Company: ${createdFooter.contactInfo.companyName}`);
    
    console.log("\n📋 Next steps:");
    console.log("1. Go to Sanity Studio: http://localhost:3333");
    console.log("2. Navigate to: Einstellungen > Footer");
    console.log("3. Configure your social media links and customize the content");
    console.log("4. Update contact information as needed");

  } catch (error: any) {
    console.error("❌ Error setting up footer:", error.message);
    
    if (error.message.includes("Missing SANITY_STUDIO_PROJECT_ID")) {
      console.log("\n💡 Solution:");
      console.log("1. Create a .env.local file in the studio directory");
      console.log("2. Add your Sanity credentials:");
      console.log("   SANITY_STUDIO_PROJECT_ID=your_project_id");
      console.log("   SANITY_STUDIO_DATASET=production");
      console.log("   SANITY_WRITE_TOKEN=your_write_token");
    }
  }
}

// Run the setup
setupFooter();

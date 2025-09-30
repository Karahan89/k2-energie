#!/usr/bin/env tsx

import { setupNavigation } from "./setup-navigation";

/**
 * CLI script to set up navigation
 * Usage: npx tsx scripts/cli-setup-navigation.ts
 */

async function main() {
  console.log("🎯 K2 Energieberatung - Navigation Setup");
  console.log("=====================================");
  
  try {
    await setupNavigation();
    console.log("\n🎉 Navigation setup completed successfully!");
  } catch (error) {
    console.error("\n💥 Navigation setup failed:", error);
    process.exit(1);
  }
}

main();

import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd(), true);

async function main() {
  // Import only after .env.local has loaded.
  const { default: clientPromise } = await import("../db");

  const client = await clientPromise;
  const db = client.db();

  const result = await db.collection("blogAnalysis").updateMany(
    { status: { $exists: false } },
    { $set: { status: "legacy" } },
  );

  console.log({
    matched: result.matchedCount,
    updated: result.modifiedCount,
  });

  await client.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
import "dotenv/config";
import { defineConfig, env } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";

console.log("🔴 DATABASE_URL in prisma.config.ts =", process.env.DATABASE_URL);

export default defineConfig({
  migrate: {
    datasource: "db",
  },
   datasource: {
    url: env('DATABASE_URL'),
  },
  client: {
    adapter: new PrismaPg({
      connectionString: process.env.DATABASE_URL!,
    }),
  },
});


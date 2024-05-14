import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite", // "mysql" | "sqlite"
  out: "./server/db/migrations",
  migrations: {
    table: "migrations_custom", // default `__drizzle_migrations`,
    schema: "./server/db/schema.ts", // used in PostgreSQL only and default to `drizzle`
  },
  schema: "./server/db/schema.ts",
});

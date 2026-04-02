import path from "node:path";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, "schema.prisma"),
  datasource: {
    async url() {
      return env("DATABASE_URL_UNPOOLED") || env("DATABASE_URL");
    },
  },
  migrate: {
    async url() {
      return env("DATABASE_URL_UNPOOLED") || env("DATABASE_URL");
    },
  },
});

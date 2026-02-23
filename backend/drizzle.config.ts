import { defineConfig } from "drizzle-kit";
import { ENV } from "./src/config/env.ts";
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: ENV.DBURL!
  }
})
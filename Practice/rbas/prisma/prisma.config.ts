import "dotenv/config";  // <-- load .env file
import { defineConfig } from '@prisma/config';

// Log the resolved DATABASE_URL for debugging (temporary)
const resolvedDatabaseUrl = process.env.DATABASE_URL;
console.log('DEBUG prisma: resolved DATABASE_URL =', resolvedDatabaseUrl);

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: resolvedDatabaseUrl ?? (() => { 
      throw new Error('Environment variable DATABASE_URL is required'); 
    })(),
  },
});

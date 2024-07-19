/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url:'postgresql://neondb_owner:eUvIWEL9DsR5@ep-frosty-voice-a4njaewr.us-east-1.aws.neon.tech/ai-mock-interview-app?sslmode=require',
    }
  };
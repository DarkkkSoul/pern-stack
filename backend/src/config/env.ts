import dotenv from "dotenv";

dotenv.config({ quiet: true });

export const ENV = {
    PORT: process.env.PORT,
    DBURL: process.env.DB_URL,
    NODE_ENV: process.env.NODE_ENV,
    CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    CORS_ORIGIN: process.env.CORS_ORIGIN,
};

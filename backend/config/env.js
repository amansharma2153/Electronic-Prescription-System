import dotenv from 'dotenv';

// dotenv.config();
dotenv.config({ path: './.env' });

export const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET
};
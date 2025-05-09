import { config } from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
  config();
}

const required = ['PORT', 'JWT_KEY', 'SMTP_URL'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

console.log("Environment variables loaded successfully.");

export const PORT = process.env.PORT!;
export const JWT_KEY = process.env.JWT_KEY!;
export const SMTP_URL = process.env.SMTP_URL!;
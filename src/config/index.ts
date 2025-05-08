import { config } from 'dotenv';

if(process.env.NODE_ENV !== 'production'){
  config();
}

const required = ['PORT', 'JWT_KEY', 'SMTP_URL', 'SMTP_USER'];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Faltan variables de entorno: ${missing.join(', ')}`);
  process.exit(1);
}


export const PORT = process.env.PORT!;
export const JWT_KEY = process.env.JWT_KEY!;
export const SMTP_URL = process.env.SMTP_URL!;
export const SMTP_USER = process.env.SMTP_USER!;
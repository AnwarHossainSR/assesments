import 'dotenv/config';
import { z } from 'zod';

const optionalConfig = z.preprocess((value) => value === '' ? undefined : value, z.string().min(1).optional());

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().default(4000),
  CLIENT_ORIGIN: z.string().default('http://localhost:5173'),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(32),
  CLOUDINARY_CLOUD_NAME: optionalConfig,
  CLOUDINARY_API_KEY: optionalConfig,
  CLOUDINARY_API_SECRET: optionalConfig,
}).superRefine((value, ctx) => {
  const configured = [value.CLOUDINARY_CLOUD_NAME, value.CLOUDINARY_API_KEY, value.CLOUDINARY_API_SECRET].filter(Boolean).length;
  if (configured !== 0 && configured !== 3)
    ctx.addIssue({ code: 'custom', message: 'Cloudinary config must include all three values' });
});

export const env = envSchema.parse(process.env);
export const isProd = env.NODE_ENV === 'production';

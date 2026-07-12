import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import { errorHandler } from './lib/errors.js';
import { authRoutes } from './routes/auth.routes.js';

export function createApp() {
  const app = express();
  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/auth', authRoutes);

  app.use(errorHandler);
  return app;
}

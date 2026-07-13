import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { env } from './env.js';
import { ApiError, errorHandler } from './lib/errors.js';
import { securityHeaders, trustedOrigin } from './middleware/security.js';
import { authRoutes } from './routes/auth.routes.js';
import { postRoutes } from './routes/post.routes.js';
import { commentRoutes } from './routes/comment.routes.js';

export function createApp() {
  const app = express();
  app.use(securityHeaders);
  app.use(trustedOrigin);
  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(express.json());
  app.use(cookieParser());

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/auth', authRoutes);
  app.use('/api/posts', postRoutes);
  app.use('/api/comments', commentRoutes);

  app.use((_req, _res, next) => next(new ApiError(404, 'Not found')));
  app.use(errorHandler);
  return app;
}

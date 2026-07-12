import type { RequestHandler } from 'express';
import { verifyToken } from '../lib/auth/jwt.js';
import { ApiError } from '../lib/errors.js';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express { interface Request { userId: string } }
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const token = req.cookies?.token as string | undefined;
  const payload = token ? verifyToken(token) : null;
  if (!payload) return next(new ApiError(401, 'Not authenticated'));
  req.userId = payload.sub;
  next();
};

import type { RequestHandler } from 'express';
import { env, isProd } from '../env.js';
import { ApiError } from '../lib/errors.js';

const SAFE = new Set(['GET', 'HEAD', 'OPTIONS']);

export const trustedOrigin: RequestHandler = (req, _res, next) => {
  const origin = req.get('origin');
  if (!SAFE.has(req.method) && origin && origin !== env.CLIENT_ORIGIN)
    return next(new ApiError(403, 'Untrusted origin'));
  next();
};

export const securityHeaders: RequestHandler = (_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('Referrer-Policy', 'no-referrer');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  if (isProd) res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
};

export function createRateLimit({ limit, windowMs }: { limit: number; windowMs: number }): RequestHandler {
  // ponytail: process-local limiter; use Redis when API runs on multiple instances.
  const attempts = new Map<string, { count: number; resetAt: number }>();
  return (req, _res, next) => {
    const now = Date.now();
    const key = req.ip || req.socket.remoteAddress || 'unknown';
    const old = attempts.get(key);
    const hit = !old || old.resetAt <= now
      ? { count: 1, resetAt: now + windowMs }
      : { count: old.count + 1, resetAt: old.resetAt };
    attempts.set(key, hit);
    if (attempts.size > 10_000) attempts.clear();
    if (hit.count > limit) return next(new ApiError(429, 'Too many attempts'));
    next();
  };
}

export const authRateLimit = createRateLimit({ limit: 10, windowMs: 900_000 });

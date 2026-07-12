import { Router } from 'express';
import { validate } from '../lib/validate.js';
import { setAuthCookie, clearAuthCookie } from '../lib/auth/cookie.js';
import { signToken } from '../lib/auth/jwt.js';
import { registerUser, loginUser, registerSchema, loginSchema, toPublicUser } from '../services/auth.service.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { ApiError } from '../lib/errors.js';
import { prisma } from '../lib/prisma.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), async (req, res, next) => {
  try { const user = await registerUser(req.body); setAuthCookie(res, signToken(user.id)); res.status(201).json({ user }); }
  catch (err) { next(err); }
});

authRoutes.post('/login', validate(loginSchema), async (req, res, next) => {
  try { const user = await loginUser(req.body); setAuthCookie(res, signToken(user.id)); res.json({ user }); }
  catch (err) { next(err); }
});

authRoutes.post('/logout', (_req, res) => { clearAuthCookie(res); res.json({ ok: true }); });

authRoutes.get('/me', requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.userId } });
    if (!user) throw new ApiError(401, 'Not authenticated');
    res.json({ user: toPublicUser(user) });
  } catch (err) { next(err); }
});

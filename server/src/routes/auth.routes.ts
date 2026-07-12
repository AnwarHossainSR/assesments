import { Router } from 'express';
import { validate } from '../lib/validate.js';
import { setAuthCookie } from '../lib/auth/cookie.js';
import { signToken } from '../lib/auth/jwt.js';
import { registerUser, loginUser, registerSchema, loginSchema } from '../services/auth.service.js';

export const authRoutes = Router();

authRoutes.post('/register', validate(registerSchema), async (req, res, next) => {
  try { const user = await registerUser(req.body); setAuthCookie(res, signToken(user.id)); res.status(201).json({ user }); }
  catch (err) { next(err); }
});

authRoutes.post('/login', validate(loginSchema), async (req, res, next) => {
  try { const user = await loginUser(req.body); setAuthCookie(res, signToken(user.id)); res.json({ user }); }
  catch (err) { next(err); }
});

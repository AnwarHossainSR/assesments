import jwt from 'jsonwebtoken';
import { env } from '../../env.js';
const EXPIRES_IN = '7d';

export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, env.JWT_SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): { sub: string } | null {
  try {
    const payload = jwt.verify(token, env.JWT_SECRET);
    if (typeof payload === 'object' && payload && typeof payload.sub === 'string') return { sub: payload.sub };
    return null;
  } catch { return null; }
}

import type { Response } from 'express';
import { isProd } from '../../env.js';

const COOKIE = 'token';
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;
const opts = () => ({ httpOnly: true, secure: isProd, sameSite: 'lax' as const, path: '/' });

export function setAuthCookie(res: Response, token: string): void { res.cookie(COOKIE, token, { ...opts(), maxAge: MAX_AGE }); }
export function clearAuthCookie(res: Response): void { res.clearCookie(COOKIE, opts()); }

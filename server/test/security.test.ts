import { expect, test } from 'bun:test';
import type { NextFunction, Request, Response } from 'express';
import { createApp } from '../src/app.js';
import { setAuthCookie } from '../src/lib/auth/cookie.js';
import { createRateLimit } from '../src/middleware/security.js';

test('rejects hostile mutations and secures JSON 404 responses', async () => {
  const server = createApp().listen(0);

  try {
    await new Promise<void>((resolve, reject) => {
      if (server.listening) resolve();
      else {
        server.once('listening', resolve);
        server.once('error', reject);
      }
    });
    const address = server.address();
    if (!address || typeof address === 'string') throw new Error('Expected TCP server address');
    const baseUrl = `http://127.0.0.1:${address.port}`;

    const hostile = await fetch(baseUrl + '/api/auth/logout', {
      method: 'POST',
      headers: { Origin: 'https://evil.example' },
    });
    expect(hostile.status).toBe(403);

    const missing = await fetch(baseUrl + '/api/missing');
    expect(missing.status).toBe(404);
    expect(missing.headers.get('x-content-type-options')).toBe('nosniff');
    expect(missing.headers.get('x-frame-options')).toBe('DENY');
    expect(await missing.json()).toEqual({ error: 'Not found' });
  } finally {
    await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
  }
});

test('rate limiter rejects attempts over its limit', () => {
  const limit = createRateLimit({ limit: 2, windowMs: 60_000 });
  const req = { ip: '127.0.0.1', socket: { remoteAddress: '127.0.0.1' } } as Request;
  const errors: unknown[] = [];
  const next: NextFunction = (error?: unknown) => { errors.push(error); };

  limit(req, {} as Response, next);
  limit(req, {} as Response, next);
  limit(req, {} as Response, next);

  expect(errors[0]).toBeUndefined();
  expect(errors[1]).toBeUndefined();
  expect(errors[2]).toMatchObject({ status: 429 });
});

test('auth cookie is httpOnly and same-site', () => {
  const calls: unknown[][] = [];
  const response = {
    cookie: (...args: unknown[]) => {
      calls.push(args);
      return response;
    },
  } as unknown as Response;

  setAuthCookie(response, 'token');

  expect(calls[0]?.[2]).toMatchObject({ httpOnly: true, sameSite: 'lax' });
});

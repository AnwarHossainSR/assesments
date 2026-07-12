import type { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

export class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ApiError) return res.status(err.status).json({ error: err.message });
  if (err instanceof ZodError) return res.status(400).json({ error: 'Validation failed', issues: err.issues });
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
};

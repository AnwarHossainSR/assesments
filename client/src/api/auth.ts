import { apiFetch, type PublicUser } from '../lib/api';

export type RegisterInput = { firstName: string; lastName: string; email: string; password: string };

export const authApi = {
  me: () => apiFetch<{ user: PublicUser }>('/auth/me'),
  login: (email: string, password: string) => apiFetch<{ user: PublicUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (input: RegisterInput) => apiFetch<{ user: PublicUser }>('/auth/register', { method: 'POST', body: JSON.stringify(input) }),
  logout: () => apiFetch<{ ok: true }>('/auth/logout', { method: 'POST' }),
};

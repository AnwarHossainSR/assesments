import { apiFetch, type SelfUser } from '../lib/api';

export type RegisterInput = { firstName: string; lastName: string; email: string; password: string };

export const authApi = {
  me: () => apiFetch<{ user: SelfUser }>('/auth/me'),
  login: (email: string, password: string) => apiFetch<{ user: SelfUser }>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (input: RegisterInput) => apiFetch<{ user: SelfUser }>('/auth/register', { method: 'POST', body: JSON.stringify(input) }),
  logout: () => apiFetch<{ ok: true }>('/auth/logout', { method: 'POST' }),
};

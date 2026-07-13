import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { authApi, type RegisterInput } from '../api/auth';
import { type SelfUser } from '../lib/api';

type AuthValue = {
  user: SelfUser | null; loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SelfUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => { authApi.me().then((r) => setUser(r.user)).catch(() => setUser(null)).finally(() => setLoading(false)); }, []);
  const login = async (email: string, password: string) => { setUser((await authApi.login(email, password)).user); };
  const register = async (input: RegisterInput) => { setUser((await authApi.register(input)).user); };
  const logout = async () => { await authApi.logout(); setUser(null); };
  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

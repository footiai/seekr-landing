'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as apiLogin } from '@/lib/api';
import { AxiosError } from 'axios';

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  loginError: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setLoginError(null);
    try {
      await apiLogin(email, password);
      setIsLoggedIn(true);
    } catch (err) {
      if (err instanceof AxiosError) {
        const message = err.response?.data?.detail || 'Email ou senha inválidos.';
        setLoginError(message);
      } else {
        setLoginError('Ocorreu um erro inesperado.');
      }
      // Ensure isLoggedIn is false on error
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsLoggedIn(false);
  };

  const value = {
    isLoggedIn,
    isLoading,
    loginError,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

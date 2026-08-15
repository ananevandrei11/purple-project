'use client';
import { IProfile } from '@/interfaces';
import { createContext, useContext, ReactNode } from 'react';

interface IAuthContext {
  user: IProfile | null;
  isAuth: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface IAuthProviderProps {
  user: IProfile | null;
  children: ReactNode;
}

export const AuthProvider = ({ user, children }: IAuthProviderProps) => {
  return <AuthContext.Provider value={{ user, isAuth: !!user }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

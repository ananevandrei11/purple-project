'use server';
import { Client } from './client';
import { getAccessToken } from '@/state/auth/session';

export default async function Cart(): Promise<JSX.Element> {
  const isAuth = getAccessToken();

  return <Client isAuth={!!isAuth} />;
}

import { Client } from './client';
import { getAccessToken } from '@/state/auth/session';

export default async function Login(): Promise<JSX.Element> {
  const isAuth = getAccessToken();
  return <Client isAuth={!!isAuth} />;
}

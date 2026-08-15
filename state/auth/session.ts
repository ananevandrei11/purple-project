'use server';
import { cookies } from 'next/headers';

export const setSession = ({
  accessToken,
  refreshToken
}: {
  accessToken: string;
  refreshToken: string;
}) => {
  const store = cookies();

  store.set('accessToken', accessToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 15, // 15 min
    path: '/'
  });

  store.set('refreshToken', refreshToken, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/'
  });
};

export const clearSession = () => {
  cookies().delete('accessToken');
  cookies().delete('refreshToken');
};

export const getAccessToken = () => {
  return cookies().get('accessToken')?.value;
};

export const getRefreshToken = () => {
  return cookies().get('refreshToken')?.value;
};

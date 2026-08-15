import { cache } from 'react';
import { getProfile } from '@/actions/getProfile';
import { IProfile } from '@/interfaces';
import { getAccessToken, getRefreshToken } from './session';

export const getCurrentUser = cache(async (): Promise<IProfile | null> => {
  if (!getAccessToken() && !getRefreshToken()) {
    return null;
  }

  try {
    return await getProfile();
  } catch {
    return null;
  }
});

'use server';
import { API } from '@/helpers/api';
import { IProfile } from '@/interfaces';
import { handlerError } from '@/helpers/handlerError';
import { authFetch } from '@/state/auth/authFetch';

export async function getProfile() {
  try {
    const { data, status, statusText } = await authFetch<IProfile>({
      method: 'GET',
      url: API.user.profile
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error get profile'));
  }
}

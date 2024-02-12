'use server';
import { API } from '@/helpers/api';
import { IProfile } from '@/interfaces';
import { apiStore } from '@/config/apiStore';
import { handlerError } from '@/helpers/handlerError';

export async function getProfile({ token }: { token: string }) {
  try {
    const { data, status, statusText } = await apiStore.get<IProfile>(API.user.profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error get profile'));
  }
}

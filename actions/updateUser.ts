'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IProfile, IProfileUpdate } from '@/interfaces';

export async function updateUser({ body, token }: { body: IProfileUpdate; token: string }) {
  try {
    console.log(API.user.update);
    const { data, status, statusText } = await apiStore.patch<IProfile>(API.user.update, body, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error update profile'));
  }
}

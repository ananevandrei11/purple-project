'use server';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IProfile, IProfileUpdate } from '@/interfaces';
import { authFetch } from '@/state/auth/authFetch';

export async function updateUser({ body }: { body: IProfileUpdate }) {
  try {
    const { data, status, statusText } = await authFetch<IProfile>({
      method: 'PATCH',
      url: API.user.update,
      data: {
        body
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

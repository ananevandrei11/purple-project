'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IAuthToken, ILogin, IProfileUpdate } from '@/interfaces';
import { setSession } from '@/state/auth/session';

interface IAuthenticate extends ILogin, IProfileUpdate {}

export async function authenticate(body: IAuthenticate) {
  try {
    const { data, status, statusText } = await apiStore.post<IAuthToken>(API.auth.register, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    return { success: true };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error authenticate'));
  }
}

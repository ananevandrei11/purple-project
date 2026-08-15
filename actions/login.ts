'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { ILogin, IAuthToken } from '@/interfaces';
import { setSession } from '@/state/auth/session';

export async function login(body: ILogin) {
  try {
    const { data, status, statusText } = await apiStore.post<IAuthToken>(API.auth.login, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken });
    return { success: true };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error login'));
  }
}

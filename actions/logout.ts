'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { clearSession, getRefreshToken } from '@/state/auth/session';
import { revalidatePath } from 'next/cache';

export async function logout() {
  try {
    const refreshToken = getRefreshToken();
    const { data, status, statusText } = await apiStore.post<{ success: boolean }>(
      API.auth.logout,
      {
        refreshToken
      }
    );

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    clearSession();
    revalidatePath('/');
    return { success: data.success };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error login'));
  }
}

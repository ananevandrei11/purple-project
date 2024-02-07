'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';

export async function restore({ email }: { email: string }) {
  try {
    const {
      data: response,
      status,
      statusText
    } = await apiStore.post<{ message: string }>(API.auth.restore, { email });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return response;
  } catch (error) {
    throw new Error(handlerError(error, 'Error restore password'));
  }
}

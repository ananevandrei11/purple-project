'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { ILogin } from '@/interfaces';

interface IToken {
  access_token: string;
}

export async function login(body: ILogin) {
  try {
    const { data, status, statusText } = await apiStore.post<IToken>(API.auth.login, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return { token: data.access_token };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error login'));
  }
}

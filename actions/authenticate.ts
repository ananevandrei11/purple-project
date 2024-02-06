'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { ILogin, IProfileUpdate } from '@/interfaces';

interface IToken {
  access_token: string;
}

interface IAuthenticate extends ILogin, IProfileUpdate {}

export async function authenticate(body: IAuthenticate) {
  try {
    const { data, status, statusText } = await apiStore.post<IToken>(API.auth.register, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return { token: data.access_token };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error authenticate'));
  }
}

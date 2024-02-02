'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IProfileRegister } from '@/interfaces';

interface IToken {
  access_token: string;
}

export async function authenticate(body: IProfileRegister) {
  try {
    const { data, status, statusText } = await apiStore.post<IToken>(API.auth.register, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return { token: data.access_token };
  } catch (error: unknown) {
    return { token: null, message: handlerError(error, 'Error authenticate') };
  }
}

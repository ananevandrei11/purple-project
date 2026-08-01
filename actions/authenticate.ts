'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { ILogin, IProfileUpdate } from '@/interfaces';

interface IToken {
  accessToken: string;
}

interface IAuthenticate extends ILogin, IProfileUpdate {}

export async function authenticate(body: IAuthenticate) {
  try {
    const { data, status, statusText, headers } = await apiStore.post<IToken>(API.auth.register, {
      ...body
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }
    console.log(JSON.stringify(headers, null, 2));
    console.log(data);
    // return { token: data.accessToken };
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error authenticate'));
  }
}

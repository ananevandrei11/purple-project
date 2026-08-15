'use server';
import { apiStore } from '@/config/apiStore';
import { clearSession, getAccessToken, getRefreshToken, setSession } from './session';
import { API } from '@/helpers/api';
import { AxiosRequestConfig, AxiosResponse, isAxiosError } from 'axios';

interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

interface IApiError {
  code: string;
}

const doRefreshToken = async (): Promise<string> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    throw new Error('NO_REFRESH_TOKEN');
  }

  const { data } = await apiStore.post<IAuthTokens>(API.auth.refresh, { refreshToken });
  setSession({ accessToken: data.accessToken, refreshToken: data.refreshToken });

  return data.accessToken;
};

const request = <T>(config: AxiosRequestConfig, accessToken: string) =>
  apiStore<T>({
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${accessToken}` }
  });

export const authFetch = async <T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
  let accessToken = getAccessToken();

  if (!accessToken) {
    try {
      accessToken = await doRefreshToken();
    } catch {
      clearSession();
      throw new Error('SESSION_EXPIRED');
    }
  }

  try {
    const response = await request<T>(config, accessToken);
    return response;
  } catch (error) {
    if (!isAxiosError<IApiError>(error)) {
      throw error;
    }

    if (error.response?.status !== 401) {
      throw error;
    }

    if (error.response.data?.code !== 'TOKEN_EXPIRED') {
      clearSession();
      throw new Error('SESSION_EXPIRED');
    }

    try {
      const newAccessToken = await doRefreshToken();
      const newResponse = await request<T>(config, newAccessToken);
      return newResponse;
    } catch {
      clearSession();
      throw new Error('SESSION_EXPIRED');
    }
  }
};

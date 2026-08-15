'use server';
import { API } from '@/helpers/api';
import { IFilter } from '@/interfaces';
import { apiStore } from '@/config/apiStore';

export async function getFilter(): Promise<IFilter | null> {
  try {
    const { data, status, statusText } = await apiStore.get<IFilter>(API.productsFilter);

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error?.message);
    }

    return null;
  }
}

import { API } from '@/helpers/api';
import { IProduct } from '@/interfaces';
import { apiStore } from '@/config/apiStore';

export async function getProductBySku({ sku }: { sku: number | string }): Promise<IProduct | null> {
  try {
    const { data, status, statusText } = await apiStore.get<IProduct>(API.productSku + `/${sku}`);

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

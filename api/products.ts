'use server';
import { API } from '@/helpers/api';
import { IParamsProducts, IProductList } from '@/interfaces';
import { apiStore } from '@/config/apiStore';

interface Params extends IParamsProducts {}

export async function getProducts(params?: Params): Promise<IProductList | null> {
  try {
    const { data, status, statusText } = await apiStore.get<IProductList>(API.products, {
      params: {
        ...params,
        ...(!params && {
          limit: 1000,
          offset: 0
        })
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return {
      limit: data?.limit,
      offset: data?.offset,
      totalProducts: data?.totalProducts,
      products: data?.products
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error?.message);
    }

    return null;
  }
}

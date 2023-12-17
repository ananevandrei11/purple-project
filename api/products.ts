import { API } from '@/helpers/api';
import { IParamsProducts, IProduct, IProductList } from '@/interfaces';
import { apiStore } from '@/config/apiStore';

interface Params extends IParamsProducts {}

export function getProductsByUniqueSku(list: IProduct[]): IProduct[] {
  const resultProducts = [] as IProduct[];

  list.reduce((acc, product) => {
    const uniqueSku = acc.find((sku) => product.sku === sku);

    if (!uniqueSku) {
      acc.push(product.sku);
      resultProducts.push(product);
    }
    return acc;
  }, [] as number[]);

  return resultProducts;
}

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

    // const resultProducts = getProductsByUniqueSku(data?.products);

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

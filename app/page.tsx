import { getProducts } from '@/api';
import { EmptyState } from '@/page-components';
import Client from './client';

export default async function Home(): Promise<JSX.Element> {
  const productData = await getProducts();

  if (!productData || productData?.products?.length === 0) {
    return <EmptyState title="Товары не найдены" />;
  }

  const productsShow = productData.products.slice(0, 6);

  return <Client products={productsShow} />;
}

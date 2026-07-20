import { notFound } from 'next/navigation';
import { getFilter, getProducts } from '@/api';
import { ClientProvider } from './client';

export default async function Shop(): Promise<JSX.Element> {
  const productData = await getProducts({ limit: 6, offset: 0 });

  if (!productData) {
    return notFound();
  }

  const filterData = await getFilter();

  if (!filterData) {
    return notFound();
  }

  return <ClientProvider filter={filterData} productsData={productData} />;
}

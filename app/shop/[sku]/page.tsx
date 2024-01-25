import { notFound } from 'next/navigation';
import { getFilter, getProductBySku, getProducts } from '@/api';
import { Client } from './client';

export async function generateStaticParams() {
  const productData = await getProducts({ limit: 1000, offset: 1000 });

  return productData?.products?.map((p) => ({
    sku: p.sku
  }));
}

interface Props {
  params: { sku: string };
}

export default async function Page({ params }: Props) {
  const { sku } = params;
  const productData = await getProductBySku({ sku });

  if (!productData) {
    return notFound();
  }

  const filterData = await getFilter();

  if (!filterData) {
    return notFound();
  }

  return <Client product={productData} categories={filterData?.categories || []} />;
}

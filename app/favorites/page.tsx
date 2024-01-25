'use client';
import { useEffect, useState } from 'react';
import { getProductBySku } from '@/api';
import { IProduct } from '@/interfaces';
import { useFavorites } from '@/state/localStorage';
import { Client } from './client';

export default function Favorites(): JSX.Element {
  const { favorites } = useFavorites();
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (favorites.length > 0) {
      const requests = [];
      for (const item of favorites) {
        requests.push(getProductBySku({ sku: item }));
      }
      Promise.all(requests).then((data) => {
        const filteredData = data.filter(Boolean) as IProduct[];
        setProducts(filteredData);
      });
    }
  }, [favorites]);

  return <Client products={products} />;
}

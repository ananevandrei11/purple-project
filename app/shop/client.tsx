'use client';
import type { IFilter, IProductList } from '@/interfaces';
import { EmptyState, Filter, ProductsListPaginator } from '@/page-components';
import styles from './client.module.css';
import { TextElement } from '@/components';
import { ShopPageContextProvider, useShopPageContext } from '@/context/shopPageContext';
import { LoadingContextProvider } from '@/context/loadingContext';

interface Props {
  productsData: IProductList;
  filter: IFilter;
}

function Client({ filter }: Omit<Props, 'productsData'>) {
  const { productsList } = useShopPageContext();

  return (
    <div className={styles.root}>
      <TextElement variant="heading1" className={styles.head}>
        Каталог товаров
      </TextElement>
      <Filter filter={filter} className={styles.filter} />
      {productsList.products.length === 0 ? (
        <EmptyState title={'Товары не найдены'} className={styles.products} />
      ) : (
        <ProductsListPaginator className={styles.products} />
      )}
    </div>
  );
}

export function ClientProvider({ filter, productsData }: Props) {
  return (
    <LoadingContextProvider>
      <ShopPageContextProvider productsList={productsData}>
        <Client filter={filter} />
      </ShopPageContextProvider>
    </LoadingContextProvider>
  );
}

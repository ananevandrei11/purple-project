'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import { IOrderResult } from '@/interfaces';
import { useCartContext } from '@/context/cartContext';
import { CartForm, CartList, CartResult, EmptyState } from '@/page-components';
import { TextElement } from '@/components';
import styles from './client.module.css';

export function Client() {
  const { state } = useCartContext();
  const [cartResult, setCartResult] = useState<IOrderResult | null>(null);

  if (cartResult) {
    return <CartResult order={cartResult} />;
  }

  if (!state.items.length) {
    return (
      <section className={styles.empty}>
        <EmptyState title="Товары не добавлены в корзину" />
        <Link href={ROUTES.shop}>Перейти в каталог</Link>
      </section>
    );
  }

  return (
    <>
      <TextElement variant="heading1" tag="h1" className={styles.head}>
        Корзина
      </TextElement>
      <div className={styles.root}>
        <CartList />
        <CartForm setCartResult={setCartResult} />
      </div>
    </>
  );
}

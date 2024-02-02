'use client';
import { useCartContext } from '@/context/cartContext';
import { CartForm, CartList, EmptyState } from '@/page-components';
import styles from './client.module.css';
import Link from 'next/link';
import { TextElement } from '@/components';

export function Client() {
  const { state } = useCartContext();

  if (!state.items.length) {
    return (
      <section className={styles.empty}>
        <EmptyState title="Товары не добавлены в корзину" />
        <Link href="/shop">Перейти в каталог</Link>
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
        <CartForm />
      </div>
    </>
  );
}

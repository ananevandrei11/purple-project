'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { useCartContext } from '@/context/cartContext';
import { CartItem } from './components/CartItem';

import styles from './CartList.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function CartList({ className, ...props }: Props) {
  const { state, changeCountItem, removeItemFromCart } = useCartContext();

  return (
    <section className={clsx(styles.list, className)} {...props}>
      {state.items.map((item) => (
        <CartItem
          key={item.sku}
          className={styles.item}
          product={item}
          onChangeCount={(value) => changeCountItem({ ...item, count: value })}
          onRemove={() => {
            removeItemFromCart(item.sku);
          }}
        />
      ))}
    </section>
  );
}

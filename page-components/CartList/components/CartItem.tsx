'use client';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MAX_COUNT_IN_CART, MIN_COUNT_IN_CART } from '@/constants';
import { getPriceWithCurrency, getPriceWithDiscount } from '@/utils';
import { ICartItem } from '@/interfaces';
import { Counter, TextElement } from '@/components';
import { Close } from '@/Icon';

import styles from './CartItem.module.css';
import { useDebounce } from '@/hooks';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ICartItem;
  onChangeCount: (value: number) => void;
  onRemove: () => void;
}

export function CartItem({ product, onRemove, onChangeCount, className }: Props) {
  const { price, images = [], name, discount = 0, count } = product;
  const totalPrice = getPriceWithDiscount({ price, discount });
  const [countView, setCountView] = useState(count || 1);
  const debounceCount = useDebounce(countView, 500);

  useEffect(() => {
    onChangeCount(debounceCount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceCount]);

  return (
    <div className={clsx(styles.root, className)}>
      <figure className={styles.figure}>
        <Image
          src={images?.[0] || ''}
          alt={name}
          fill
          quality={75}
          sizes="(max-width: 1024px) 100vw, 33vw"
          placeholder="blur"
          blurDataURL={images[0]}
          className={styles.image}
        />
      </figure>
      <div className={styles.content}>
        <div className={styles.info}>
          <TextElement variant="heading3" tag="h3">
            {product.name}
          </TextElement>
          <TextElement variant="heading4" tag="p" className={styles.price}>
            {getPriceWithCurrency({ price: totalPrice })}
          </TextElement>
        </div>
        <Counter
          className={styles.counter}
          value={countView}
          max={MAX_COUNT_IN_CART}
          min={MIN_COUNT_IN_CART}
          onDecrease={() => {
            setCountView((prev) => (prev <= MIN_COUNT_IN_CART ? MIN_COUNT_IN_CART : prev - 1));
          }}
          onIncrease={() => {
            setCountView((prev) => (prev >= MAX_COUNT_IN_CART ? MAX_COUNT_IN_CART : prev + 1));
          }}
        />
        <button className={styles.remove} type="button" onClick={onRemove}>
          <Close />
        </button>
      </div>
    </div>
  );
}

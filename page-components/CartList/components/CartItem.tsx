'use client';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { MAX_COUNT_IN_CART, MIN_COUNT_IN_CART } from '@/constants';
import { debounce, getPriceWithCurrency } from '@/utils';
import { ICartItem } from '@/interfaces';
import { Counter, TextElement } from '@/components';
import { Close } from '@/Icon';

import styles from './CartItem.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ICartItem;
  onChangeCount: (value: number) => void;
  onRemove: () => void;
}

export function CartItem({ product, onRemove, onChangeCount, className }: Props) {
  const { price, images = [], name, discount = 0, count } = product;
  const totalPrice = !discount ? price : price * (1 - discount * 0.01);
  const debounceOnChangeCount = debounce(onChangeCount, 500);
  const [countView, setCountView] = useState<number>(count || 1);

  return (
    <div className={clsx(styles.root, className)}>
      <figure className={styles.figure}>
        <Image src={images?.[0] || ''} alt={name} fill className={styles.image} />
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
            debounceOnChangeCount(
              countView <= MIN_COUNT_IN_CART ? MIN_COUNT_IN_CART : countView - 1
            );
            setCountView(countView <= MIN_COUNT_IN_CART ? MIN_COUNT_IN_CART : countView - 1);
          }}
          onIncrease={() => {
            debounceOnChangeCount(
              countView >= MAX_COUNT_IN_CART ? MAX_COUNT_IN_CART : countView + 1
            );
            setCountView(countView >= MAX_COUNT_IN_CART ? MAX_COUNT_IN_CART : countView + 1);
          }}
        />
        <button className={styles.remove} type="button" onClick={onRemove}>
          <Close />
        </button>
      </div>
    </div>
  );
}

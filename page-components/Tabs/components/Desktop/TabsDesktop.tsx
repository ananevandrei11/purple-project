'use client';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { IProduct } from '@/interfaces';
import { TextElement } from '@/components';

import styles from './TabsDesktop.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}

export function TabsDesktop({ product, className }: Props) {
  const { reviews, description } = product;
  const [currentItem, setCurrentItem] = useState<string>('description');
  const isDescription = currentItem === 'description';
  const isReviews = currentItem === 'reviews';

  return (
    <section className={className}>
      <nav className={styles.nav}>
        <button
          type="button"
          aria-expanded={currentItem === 'description'}
          aria-controls="description"
          className={clsx(styles.btn, { [styles.active]: isDescription })}
          onClick={() => setCurrentItem('description')}>
          <TextElement variant="heading3" tag="span">
            Описание
          </TextElement>
        </button>
        <button
          type="button"
          aria-expanded={currentItem === 'reviews'}
          aria-controls="reviews"
          className={clsx(styles.btn, { [styles.active]: isReviews })}
          onClick={() => setCurrentItem('reviews')}>
          <TextElement variant="heading3" tag="span">
            Отзывы ({reviews.length})
          </TextElement>
        </button>
      </nav>
      <div className={styles.body}>
        <div id="description" className={clsx(styles.item, { [styles.open]: isDescription })}>
          <TextElement variant="heading3">{description}</TextElement>
        </div>
        <div id="reviews" className={clsx(styles.item, { [styles.open]: isReviews })}>
          Item 2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut sapiente expedita,
          repellat suscipit, quibusdam magnam, nesciunt a reiciendis perferendis soluta nisi error
          possimus? Rerum error nihil unde itaque optio omnis?
        </div>
      </div>
    </section>
  );
}

'use client';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import { IProduct } from '@/interfaces';
import { TextElement } from '@/components';
import { ArrowDown } from '@/Icon';
import { ReviewForm, ReviewOutput } from '@/page-components';

import styles from './TabsMobile.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}

export function TabsMobile({ product, className }: Props) {
  const { reviews, description, sku } = product;
  const [isOpen, setOpen] = useState<{ reviews: boolean; description: boolean }>({
    reviews: false,
    description: false
  });

  return (
    <section className={clsx(styles.root, className)}>
      <div className={clsx(styles.item, { [styles.open]: isOpen.description })}>
        <button
          type="button"
          aria-expanded={isOpen.description}
          aria-controls="description"
          className={styles.btn}
          onClick={() => setOpen((prev) => ({ ...prev, description: !prev.description }))}>
          <TextElement variant="bodySmall" tag="span">
            Описание
          </TextElement>
          <span className={styles.arrow}>
            <ArrowDown />
          </span>
        </button>
        <div id="description" className={styles.content}>
          <TextElement variant="heading5">{description}</TextElement>
        </div>
      </div>
      <div className={clsx(styles.item, { [styles.open]: isOpen.reviews })}>
        <button
          type="button"
          aria-expanded={isOpen.reviews}
          aria-controls="reviews"
          className={styles.btn}
          onClick={() => setOpen((prev) => ({ ...prev, reviews: !prev.reviews }))}>
          <TextElement variant="bodySmall" tag="span">
            Отзывы ({reviews.length})
          </TextElement>
          <span className={styles.arrow}>
            <ArrowDown />
          </span>
        </button>
        <div id="reviews" className={clsx(styles.content, styles.reviews)}>
          <ReviewOutput reviews={reviews} />
          <ReviewForm sku={sku} />
        </div>
      </div>
    </section>
  );
}

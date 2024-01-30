'use client';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { IFilter, IProduct } from '@/interfaces';
import { Button, Counter, IconBadge, ItemInfo, TextElement } from '@/components';
import { ArrowRight, Facebook, Instagram, LinkedIn, Share, Twitter } from '@/Icon';
import { getPriceWithCurrency, pluralize } from '@/utils';

import { RatingStars } from '..';
import styles from './ProductDescription.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  categories: IFilter['categories'];
}

const MAX_COUNT = 6;
const SOCIAL_LINK = [
  { id: 1, href: '', icon: <LinkedIn /> },
  { id: 2, href: '/', icon: <Facebook /> },
  { id: 3, href: '/', icon: <Instagram /> },
  { id: 4, href: '/', icon: <Twitter /> }
];

export function ProductDescription({ product, categories, className }: Props) {
  const { name, description, price, reviews, sku, categoryId } = product;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const [count, setCount] = useState(1);
  const [isShowShare, setShowShare] = useState(true);
  const [isShowMore, setShowMore] = useState(true);

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.main}>
        <TextElement variant="heading2" tag="h2" className={styles.name}>
          {name}
        </TextElement>
        <TextElement variant="heading4" tag="p" className={styles.price}>
          {getPriceWithCurrency({ price })}
        </TextElement>
        <button
          type="button"
          className={clsx(styles.btn, styles.shareBtn)}
          onClick={() => setShowShare((prev) => !prev)}>
          <Share />
        </button>
      </div>

      <div
        className={clsx(styles.rating, {
          [styles.collapsed]: isShowMore
        })}>
        <RatingStars rating={averageRating} className={styles.star} />
        <TextElement variant="heading5" tag="p" className={styles.reviews}>
          {pluralize(reviews.length, ['отзыв', 'отзыва', 'отзывов'])}
        </TextElement>
      </div>

      <TextElement
        variant="heading5"
        tag="p"
        className={clsx(styles.description, { [styles.descriptionCollapse]: isShowMore })}>
        {description}
      </TextElement>

      <Counter
        value={count}
        onDecrease={() => setCount((prev) => prev - 1)}
        onIncrease={() => setCount((prev) => prev + 1)}
        max={MAX_COUNT}
        className={clsx(styles.counter, {
          [styles.collapsed]: isShowMore
        })}
      />
      <Button variant="white" type="button" className={styles.cart}>
        Добавить в корзину
      </Button>

      <div className={clsx(styles.share, { [styles.collapsed]: isShowShare })}>
        <button type="button" aria-label="favorites" className={styles.btn}>
          <IconBadge icon="favorites" />
        </button>
        <span className={styles.divider} />
        {SOCIAL_LINK.map((link) => (
          <Link
            key={link.id}
            href={link.href}
            target="blank"
            rel="noopener noreferrer"
            className={styles.btn}>
            {link.icon}
          </Link>
        ))}
      </div>

      <div
        className={clsx(styles.info, {
          [styles.collapsed]: isShowMore
        })}>
        <ItemInfo label="SKU" info={sku} />
        <ItemInfo label="Категория" info={categories[categoryId]?.name} />
      </div>

      <button
        type="button"
        aria-label="show more"
        className={clsx(styles.btn, styles.showBtn)}
        onClick={() => setShowMore((prev) => !prev)}>
        <TextElement variant="bodySmall" tag="span" className={styles.showText}>
          Больше
        </TextElement>
        <span className={styles.showArrow}>
          <ArrowRight />
        </span>
      </button>
    </section>
  );
}

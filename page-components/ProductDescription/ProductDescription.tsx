'use client';
import { DetailedHTMLProps, HTMLAttributes, useCallback, useState } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { IFilter, IProduct } from '@/interfaces';
import { Button, Counter, IconBadge, ItemInfo, TextElement } from '@/components';
import { ArrowRight, Facebook, Instagram, LinkedIn, ShareIcon, Twitter } from '@/Icon';
import { getPriceWithCurrency, pluralize } from '@/utils';

import styles from './ProductDescription.module.css';
import { Rating } from '..';
import { useCartContext } from '@/context/cartContext';
import { MAX_COUNT_IN_SHOP, MIN_COUNT_IN_SHOP } from '@/constants';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  categories: IFilter['categories'];
}

const SOCIAL_LINK = [
  { id: 1, href: '', icon: <LinkedIn /> },
  { id: 2, href: '/', icon: <Facebook /> },
  { id: 3, href: '/', icon: <Instagram /> },
  { id: 4, href: '/', icon: <Twitter /> }
];

export function ProductDescription({ product, categories, className }: Props) {
  const { name, description, price, reviews, sku, categoryId } = product;
  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const [isShowShare, setShowShare] = useState<boolean>(true);
  const [isShowMore, setShowMore] = useState<boolean>(true);

  const { state, addCountItem } = useCartContext();
  const itemSku = state.items.find((item) => item.sku === sku);
  const [count, setCount] = useState<number>(() => {
    return itemSku ? itemSku.count : 0;
  });

  const handleCart = useCallback(() => {
    addCountItem({
      ...product,
      count
    });
  }, [count, addCountItem, product]);

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
          <ShareIcon />
        </button>
      </div>

      <div
        className={clsx(styles.rating, {
          [styles.collapsed]: isShowMore
        })}>
        <Rating rating={averageRating} className={styles.star} />
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
        onDecrease={() => setCount(count <= MIN_COUNT_IN_SHOP ? MIN_COUNT_IN_SHOP : count - 1)}
        onIncrease={() => setCount(count >= MAX_COUNT_IN_SHOP ? MAX_COUNT_IN_SHOP : count + 1)}
        max={MAX_COUNT_IN_SHOP}
        min={MIN_COUNT_IN_SHOP}
        className={clsx(styles.counter, {
          [styles.collapsed]: isShowMore
        })}
      />
      <Button variant="white" type="button" onClick={handleCart} className={styles.cart}>
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

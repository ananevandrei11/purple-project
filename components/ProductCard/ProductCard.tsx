'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { IProduct } from '@/interfaces';
import { getPriceWithCurrency } from '@/utils';
import { TextElement } from '..';
import styles from './ProductCard.module.css';
import { Cart, Eye, Favorites, FavoritesFull } from '@/Icon';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  isFavorites?: boolean;
}

export function ProductCard({ product, isFavorites, className, ...props }: Props) {
  const { name, price, images, discount, sku } = product;

  return (
    <div className={clsx(styles.card, className)} {...props}>
      <figure className={styles.figure}>
        {discount && (
          <TextElement variant="bodySmall" tag="p" className={styles.label}>
            -{discount}%
          </TextElement>
        )}
        {isFavorites && (
          <span className={styles.favorites}>
            <FavoritesFull />
          </span>
        )}
        <div className={styles.hover}>
          <button type="button" className={styles.hoverBtn}>
            <Cart />
          </button>
          <Link href={`/shop/${sku}`}>
            <Eye />
          </Link>
          <button type="button" className={styles.hoverBtn}>
            <Favorites />
          </button>
        </div>
        <div className={styles.imageWrapper}>
          <Image
            src={images[0]}
            alt={name}
            fill
            quality={75}
            sizes="(max-width: 1024px) 100vw, 33vw"
            className={styles.image}
            placeholder="blur"
            blurDataURL={images[0]}
          />
        </div>
      </figure>

      <TextElement variant="heading3" tag="p" className={styles.name}>
        {name}
      </TextElement>
      <div className={styles.priceWrapper}>
        <TextElement
          variant="heading4"
          tag="p"
          className={clsx(styles.price, {
            [styles.discount]: discount
          })}>
          {getPriceWithCurrency({ price })}
        </TextElement>
        {discount && (
          <TextElement variant="heading4" tag="p" className={styles.price}>
            {getPriceWithCurrency({ price: price * (1 - discount * 0.01) })}
          </TextElement>
        )}
      </div>
    </div>
  );
}

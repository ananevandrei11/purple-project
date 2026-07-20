'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/routes';
import { IProduct } from '@/interfaces';
import { getPriceWithCurrency } from '@/utils';
import { Eye, Favorites, FavoritesFull } from '@/Icon';
import { useCartContext } from '@/context/cartContext';
import { useFavorites } from '@/state/localStorage';
import { IconBadge, TextElement } from '..';
import styles from './ProductCard.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
  isFavorites?: boolean;
}

export function ProductCard({ product, isFavorites, className, ...props }: Props) {
  const { name, price, images, discount, sku } = product;
  const { addItemToCart, state } = useCartContext();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleToFavorites = () => {
    const isNewSku = favorites.some((item) => item === sku);
    if (isNewSku) {
      removeFavorite(sku);
    } else {
      addFavorite(sku);
    }
  };

  return (
    <div className={clsx(styles.card, className)} {...props}>
      <figure className={styles.figure}>
        {discount && (
          <TextElement variant="bodySmall" tag="p" className={styles.label}>
            -{discount}%
          </TextElement>
        )}
        {(isFavorites || favorites.includes(sku)) && (
          <span className={styles.favorites}>
            <FavoritesFull />
          </span>
        )}
        <div className={styles.hover}>
          <button
            type="button"
            className={styles.hoverBtn}
            onClick={() =>
              addItemToCart({
                ...product,
                count: 1
              })
            }>
            <IconBadge
              icon="cart"
              badge={state.items.find((item) => item.sku === sku)?.count ? 1 : undefined}
            />
          </button>
          <Link href={ROUTES.shopSku(sku)}>
            <Eye />
          </Link>
          <button type="button" className={styles.hoverBtn} onClick={handleToFavorites}>
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

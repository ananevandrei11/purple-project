'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/routes';
import { IProduct } from '@/interfaces';
import { TextElement } from '@/components';
import { getPriceWithCurrency } from '@/utils';
import { useMediaQuery } from '@/hooks';
import styles from './HeroSlider.module.css';
import Face_x2 from '@/public/faxe_2x.jpg';
import Face_x1 from '@/public/faxe_1x.jpg';
import Face_vertical from '@/public/face_vertical.jpg';
import Hands_x2 from '@/public/hands_2x.jpg';
import Hands_x1 from '@/public/hands_1x.jpg';
import Hands from '@/public/hands.jpg';

const faceImg = {
  l: Face_x2,
  m: Face_x1,
  s: Face_vertical
};

const handsImg = {
  l: Hands_x2,
  m: Hands_x1,
  s: Hands
};

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: IProduct[];
}
export function HeroSlider({ products, className }: Props) {
  const mobile = useMediaQuery('(max-width: 1024px)');

  return (
    <section className={clsx(styles.slider, className)}>
      <div className={styles.slides}>
        {products.map((product, index) => {
          const sourceImg = index === 0 || index % 2 === 0 ? faceImg : handsImg;
          return (
            <div key={product.sku} id={`sku-${product.sku}`} className={styles.slide}>
              <picture className={styles.picture}>
                <source srcSet={sourceImg.l.src} media="(min-width: 1920px)" />
                <source srcSet={sourceImg.m.src} media="(min-width: 768px)" />
                <source srcSet={sourceImg.s.src} media="(min-width: 0px)" />
                <img src={sourceImg.s.src} alt={product.name} className={styles.img} />
              </picture>
              <div className={styles.content}>
                <TextElement variant={mobile ? 'heading4' : 'heading1'} className={styles.head}>
                  {product.name}
                </TextElement>
                <TextElement variant={mobile ? 'bodyMedium' : 'heading4'}>
                  {getPriceWithCurrency({ price: product.price })}
                </TextElement>
                <Link className={styles.link} href={ROUTES.shopSku(product.sku)}>
                  Смотреть {product.sku}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.controls}>
        {products.map((product) => (
          <a key={product.sku} href={`#sku-${product.sku}`} className={styles.control} />
        ))}
      </div>
    </section>
  );
}

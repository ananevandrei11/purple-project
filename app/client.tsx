'use client';
import Link from 'next/link';
import { ROUTES } from '@/routes';
import type { IProduct } from '@/interfaces';
import { ProductList, HeroSlider } from '@/page-components';
import { TextElement } from '@/components';
import { useMediaQuery } from '@/hooks';
import styles from './client.module.css';

interface Props {
  products: IProduct[];
}

export default function Client({ products }: Props) {
  const mobile = useMediaQuery('(max-width: 1024px)');

  return (
    <>
      <HeroSlider products={products} className={styles.hero} />
      <section className={styles.content}>
        <TextElement variant={mobile ? 'heading5' : 'heading1'} className={styles.head}>
          Новые поступления
        </TextElement>
        <Link href={ROUTES.shop} className={styles.link}>
          <TextElement variant={mobile ? 'bodyMedium' : 'heading4'}>Все</TextElement>
        </Link>
        <ProductList products={products} className={styles.products} />
      </section>
    </>
  );
}

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { v4 as uuidv4 } from 'uuid';
import { ProductCard } from '@/components';
import { IProduct } from '@/interfaces';
import styles from './ProductList.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  products: IProduct[];
}

export function ProductList({ products, className }: Props) {
  return (
    <section className={clsx(styles.root, className)}>
      {products.map((product) => {
        return <ProductCard key={`${product.sku}-${uuidv4()}`} product={product} />;
      })}
    </section>
  );
}

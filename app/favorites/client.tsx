import { ProductCard } from '@/components';
import { IProduct } from '@/interfaces';
import styles from './client.module.css';

interface Props {
  products: IProduct[];
}

export function Client({ products }: Props) {
  return (
    <section className={styles.root}>
      {products.map((p) => (
        <ProductCard key={p.sku} product={p} isFavorites />
      ))}
    </section>
  );
}

import type { IFilter, IProduct } from '@/interfaces';
import styles from './client.module.css';
import { ProductDescription } from '@/page-components';

interface Props {
  product: IProduct;
  categories: IFilter['categories'];
}

export function Client({ product, categories }: Props) {
  return (
    <div className={styles.root}>
      <section>Gallery</section>
      <ProductDescription product={product} categories={categories} />
    </div>
  );
}

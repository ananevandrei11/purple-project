import type { IFilter, IProduct } from '@/interfaces';
import styles from './client.module.css';
import { ProductDescription, ProductGallery, Tabs } from '@/page-components';

interface Props {
  product: IProduct;
  categories: IFilter['categories'];
}

export function Client({ product, categories }: Props) {
  const { images } = product;
  return (
    <div className={styles.root}>
      <ProductGallery slides={images} className={styles.gallery} />
      <ProductDescription
        product={product}
        categories={categories}
        className={styles.description}
      />
      <Tabs product={product} className={styles.tabs} />
    </div>
  );
}

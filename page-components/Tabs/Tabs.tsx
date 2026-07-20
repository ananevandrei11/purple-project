'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { IProduct } from '@/interfaces';
import styles from './Tabs.module.css';
import { TabsDesktop } from './components/Desktop/TabsDesktop';
import { TabsMobile } from './components/Mobile/TabsMobile';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct;
}

export function TabsWrapper({ product, className }: Props) {
  return (
    <>
      <TabsMobile product={product} className={clsx(className, styles.mobile)} />
      <TabsDesktop product={product} className={clsx(className, styles.desktop)} />
    </>
  );
}

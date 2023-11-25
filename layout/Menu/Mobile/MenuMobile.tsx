'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { Burger } from '@/Icon';
import { IconBadge } from '@/components';
import styles from './MenuMobile.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function MenuMobile({ className, ...props }: Props) {
  const currentPath = usePathname();

  return (
    <nav className={clsx(styles.nav, className)} {...props}>
      <Link aria-current={'/cart' === currentPath} className={styles.link} href="/cart">
        <IconBadge icon="cart" className={styles.cart} />
      </Link>
      <button className={styles.burger}>
        <Burger />
      </button>
    </nav>
  );
}

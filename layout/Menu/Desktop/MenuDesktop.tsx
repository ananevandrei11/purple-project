'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { Person } from '@/Icon';
import { SearchHeader, IconBadge } from '@/components';
import styles from './MenuDesktop.module.css';

const MAIN_LINK = [
  { href: '/shop', text: 'Магазин' },
  { href: '/about', text: 'О нас' }
];

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function MenuDesktop({ className, ...props }: Props) {
  const currentPath = usePathname();

  return (
    <nav className={clsx(styles.nav, className)} {...props}>
      <div className={styles.main}>
        {MAIN_LINK.map((link) => (
          <Link
            key={link.href}
            aria-current={link.href === currentPath}
            className={clsx(styles.link, {
              [styles.active]: link.href === currentPath
            })}
            href={link.href}>
            {link.text}
          </Link>
        ))}
        <div className={clsx(styles.divider)} />
      </div>

      <SearchHeader />

      <div className={styles.shop}>
        <Link
          aria-current={'/cart' === currentPath}
          className={clsx(styles.linkIcon, {
            [styles.active]: '/cart' === currentPath
          })}
          href="/cart">
          <IconBadge icon="cart" />
        </Link>
        <Link
          aria-current={'/favorites' === currentPath}
          className={clsx(styles.linkIcon, {
            [styles.active]: '/favorites' === currentPath
          })}
          href="/favorites">
          <IconBadge icon="favorites" />
        </Link>
        <Link
          aria-current={'/login' === currentPath}
          className={clsx(styles.linkIcon, {
            [styles.active]: '/login' === currentPath
          })}
          href="/login">
          <Person />
        </Link>
      </div>
    </nav>
  );
}

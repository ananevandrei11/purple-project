'use client';

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/routes';
import { useCartContext } from '@/context/cartContext';
import { useFavorites } from '@/state/localStorage';
import { Person } from '@/Icon';
import { allertaStencil } from '@/fonts';
import { SearchHeader, IconBadge } from '@/components';
import styles from './MenuDesktop.module.css';

const MAIN_LINK = [
  { href: ROUTES.shop, text: 'Магазин' },
  { href: ROUTES.about, text: 'О нас' }
];

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export default function MenuDesktop({ className, ...props }: Props) {
  const currentPath = usePathname();
  const { favorites } = useFavorites();
  const { state } = useCartContext();

  return (
    <div className={clsx(styles.root, className)} {...props}>
      <div className={styles.wrapper}>
        <Link href={ROUTES.home} className={clsx(styles.logo, allertaStencil.className)}>
          SHOPPE
        </Link>
        <nav className={styles.nav}>
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
            <span className={clsx(styles.divider)} />
          </div>

          <SearchHeader />

          <div className={styles.shop}>
            <Link
              aria-current={currentPath.includes(ROUTES.cart)}
              className={clsx(styles.linkIcon, {
                [styles.active]: currentPath.includes(ROUTES.cart)
              })}
              href={ROUTES.cart}>
              <IconBadge icon="cart" badge={state.items.length ? state.items.length : undefined} />
            </Link>
            <Link
              aria-current={ROUTES.favorites === currentPath}
              className={clsx(styles.linkIcon, {
                [styles.active]: ROUTES.favorites === currentPath
              })}
              href={ROUTES.favorites}>
              <IconBadge icon="favorites" badge={favorites.length ? favorites.length : undefined} />
            </Link>
            <Link
              aria-current={ROUTES.login === currentPath}
              className={clsx(styles.linkIcon, {
                [styles.active]: ROUTES.login === currentPath
              })}
              href={ROUTES.login}>
              <Person />
            </Link>
          </div>
        </nav>
      </div>
    </div>
  );
}

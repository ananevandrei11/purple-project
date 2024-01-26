'use client';

import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { useCartContext } from '@/context/cartContext';
import { useFavorites } from '@/state/localStorage';
import { allertaStencil } from '@/fonts';
import { Burger, Close, Login, Person } from '@/Icon';
import { IconBadge, SearchHeader } from '@/components';
import styles from './MenuMobile.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const MAIN_LINK = [
  { href: '/', text: 'Главная' },
  { href: '/shop', text: 'Магазин' },
  { href: '/about', text: 'О нас' }
];

export default function MenuMobile({ className, ...props }: Props) {
  const currentPath = usePathname();
  const { state } = useCartContext();
  const { favorites } = useFavorites();
  const [isShowMenu, setShowMenu] = useState<boolean>(false);

  return (
    <div
      className={clsx(styles.root, className, {
        [styles.rootMenu]: isShowMenu
      })}
      {...props}>
      <div className={styles.header}>
        <Link href="/" className={clsx(styles.logo, allertaStencil.className)}>
          SHOPPE
        </Link>
        <div className={styles.controls}>
          <Link aria-current={'/cart' === currentPath} className={styles.link} href="/cart">
            <IconBadge
              icon="cart"
              className={styles.icon}
              badge={state.items.length ? state.items.length : undefined}
            />
          </Link>
          <button className={styles.burger} onClick={() => setShowMenu((prev) => !prev)}>
            {isShowMenu ? <Close /> : <Burger />}
          </button>
        </div>

        <SearchHeader isShowForm={true} className={styles.search} />
      </div>

      <nav
        className={clsx(styles.nav, {
          [styles.navMenu]: isShowMenu
        })}>
        {MAIN_LINK.map((link) => (
          <Link
            key={link.href}
            aria-current={link.href === currentPath}
            className={styles.link}
            href={link.href}>
            {link.text}
          </Link>
        ))}

        <span className={styles.divider} />

        <Link
          aria-current={'/login' === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href="/login">
          <Person className={styles.icon} /> Мой аккаунт
        </Link>
        <Link
          aria-current={'/favorites' === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href="/favorites">
          <IconBadge
            icon="favorites"
            className={styles.icon}
            badge={favorites.length ? favorites.length : undefined}
          />{' '}
          Избранное
        </Link>
        <Link
          aria-current={'/login' === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href="/login">
          <Login className={styles.icon} /> Выход
        </Link>
      </nav>
    </div>
  );
}

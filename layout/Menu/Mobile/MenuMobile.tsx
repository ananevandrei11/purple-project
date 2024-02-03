'use client';

import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';
import { ROUTES } from '@/routes';
import { useCartContext } from '@/context/cartContext';
import { useFavorites } from '@/state/localStorage';
import { allertaStencil } from '@/fonts';
import { Burger, Close, Login, Person } from '@/Icon';
import { IconBadge, SearchHeader } from '@/components';
import styles from './MenuMobile.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

const MAIN_LINK = [
  { href: ROUTES.home, text: 'Главная' },
  { href: ROUTES.shop, text: 'Магазин' },
  { href: ROUTES.about, text: 'О нас' }
];

export default function MenuMobile({ className, ...props }: Props) {
  const currentPath = usePathname();
  const { state } = useCartContext();
  const { favorites } = useFavorites();
  const [isShowMenu, setShowMenu] = useState<boolean>(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <div
      className={clsx(styles.root, className, {
        [styles.rootMenu]: isShowMenu
      })}
      {...props}>
      <div className={styles.header}>
        <Link href={ROUTES.home} className={clsx(styles.logo, allertaStencil.className)}>
          SHOPPE
        </Link>
        <div className={styles.controls}>
          <Link
            aria-current={currentPath.includes(ROUTES.cart)}
            className={styles.link}
            href={ROUTES.cart}>
            <IconBadge
              icon="cart"
              className={styles.icon}
              badge={state.items.length ? state.items.length : undefined}
            />
          </Link>
          <button className={styles.burger} onClick={handleShowMenu}>
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
          aria-current={ROUTES.login === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href={ROUTES.login}>
          <Person className={styles.icon} /> Мой аккаунт
        </Link>
        <Link
          aria-current={ROUTES.favorites === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href={ROUTES.favorites}>
          <IconBadge
            icon="favorites"
            className={styles.icon}
            badge={favorites.length ? favorites.length : undefined}
          />{' '}
          Избранное
        </Link>
        <Link
          aria-current={ROUTES.login === currentPath}
          className={clsx(styles.link, styles.linkMenu)}
          href={ROUTES.login}>
          <Login className={styles.icon} /> Выход
        </Link>
      </nav>
    </div>
  );
}

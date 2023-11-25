'use client';

import Link from 'next/link';
import styles from './Header.module.css';
import MenuDesktop from '../Menu/Desktop/MenuDesktop';
import { SearchHeader } from '@/components';
import MenuMobile from '../Menu/Mobile/MenuMobile';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        SHOPPE
      </Link>
      <MenuDesktop className={styles.menuDesktop} />
      <MenuMobile className={styles.menuMobile} />
      <SearchHeader isShowForm={true} className={styles.search} />
    </header>
  );
}

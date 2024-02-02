import styles from './Header.module.css';
import MenuDesktop from '../Menu/Desktop/MenuDesktop';
import MenuMobile from '../Menu/Mobile/MenuMobile';

export function Header() {
  return (
    <header className={styles.header}>
      <MenuDesktop className={styles.menuDesktop} />
      <MenuMobile className={styles.menuMobile} />
    </header>
  );
}

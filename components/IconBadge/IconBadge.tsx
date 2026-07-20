import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Cart, Favorites } from '@/Icon';
import styles from './IconBadge.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon: 'cart' | 'favorites';
  badge?: string | number;
}

const ICON: Record<string, JSX.Element> = {
  cart: <Cart />,
  favorites: <Favorites />
};

export default function IconBadge({ icon, badge, className, ...props }: Props) {
  return (
    <span className={clsx(styles.root, className)} {...props}>
      {ICON[icon]}
      {badge && <span className={styles.badge}>{badge}</span>}
    </span>
  );
}

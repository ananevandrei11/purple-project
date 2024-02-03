import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { TextElement } from '@/components';

import styles from './CartResultInfoItem.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  value: string;
}

export function CartResultInfoItem({ label, value, className, ...props }: Props) {
  return (
    <TextElement variant="heading5" className={clsx(styles.item, className)} tag="li" {...props}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </TextElement>
  );
}

import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { TextElement } from '..';
import styles from './ItemInfo.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  info: string | number;
}

export function ItemInfo({ info, label, className, ...props }: Props) {
  return (
    <div className={clsx(styles.root, className)} {...props}>
      <TextElement variant="heading5" tag="span" className={styles.label}>
        {label}:
      </TextElement>
      <TextElement variant="heading5" tag="span" className={styles.info}>
        {info}
      </TextElement>
    </div>
  );
}

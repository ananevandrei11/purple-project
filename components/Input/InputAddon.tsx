'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import clsx from 'clsx';
import styles from './InputAddon.module.css';
import { Search } from '@/Icon';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'arrow' | 'search';
  side: 'left' | 'right';
}

export function InputAddon({ side, variant, className, ...props }: Props) {
  return (
    <button className={clsx(styles.addon, styles[side], className)} {...props}>
      {variant === 'arrow' && side === 'right' && <>&rarr;</>}
      {variant === 'arrow' && side === 'left' && <>&larr;</>}
      {variant === 'search' && <Search className={styles.icon} />}
    </button>
  );
}

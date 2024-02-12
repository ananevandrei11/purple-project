'use client';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import clsx from 'clsx';
import styles from './InputAddon.module.css';
import { Eye, EyeClose, Search } from '@/Icon';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'arrow' | 'search' | 'eyeOpen' | 'eyeClose';
  side: 'left' | 'right';
}

export function InputAddon({ side, variant, className, ...props }: Props) {
  return (
    <button className={clsx(styles.addon, styles[side], className)} {...props}>
      {variant === 'arrow' && side === 'right' && <>&rarr;</>}
      {variant === 'arrow' && side === 'left' && <>&larr;</>}
      {variant === 'search' && <Search className={styles.icon} />}
      {variant === 'eyeOpen' && <Eye className={styles.icon} />}
      {variant === 'eyeClose' && <EyeClose className={styles.icon} />}
    </button>
  );
}

import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import clsx from 'clsx';
import styles from './InputAddon.module.css';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'arrow';
  side: 'left' | 'right';
}

export function InputAddon({ side, variant, className, ...props }: Props) {
  return (
    <button className={clsx(styles.addon, styles[side], className)} {...props}>
      {variant === 'arrow' && side === 'right' && <>&rarr;</>}
      {variant === 'arrow' && side === 'left' && <>&larr;</>}
    </button>
  );
}

import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import styles from './Button.module.css';

interface Props
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  variant: 'black' | 'white' | 'link';
  fluid?: boolean;
}

export function Button({ variant, fluid, className, children, ...props }: Props) {
  return (
    <button
      className={clsx(styles.button, styles[variant], className, fluid && styles.fluid)}
      {...props}>
      {children}
    </button>
  );
}

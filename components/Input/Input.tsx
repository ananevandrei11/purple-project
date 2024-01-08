'use client';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isAddonLeft?: boolean;
  isAddonRight?: boolean;
}

export function Input({ className, isAddonLeft, isAddonRight, ...props }: Props) {
  return (
    <input
      className={clsx(styles.input, className, {
        [styles.addonLeft]: isAddonLeft,
        [styles.addonRight]: isAddonRight
      })}
      {...props}
    />
  );
}

'use client';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  isAddonLeft?: boolean;
  isAddonRight?: boolean;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, isAddonLeft, isAddonRight, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(styles.input, className, {
          [styles.addonLeft]: isAddonLeft,
          [styles.addonRight]: isAddonRight
        })}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

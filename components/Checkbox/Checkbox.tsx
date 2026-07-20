'use client';
import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';
import TextElement from '../TextElement/TextElement';
import styles from './Checkbox.module.css';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label: string;
  isChecked: boolean;
}

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ className, label, isChecked, ...props }, ref) => {
    return (
      <div className={className}>
        <input
          ref={ref}
          {...props}
          id={props.id}
          type="checkbox"
          checked={isChecked}
          className={styles.input}
        />
        <label className={styles.label} htmlFor={props.id}>
          <span className={clsx(styles.check, { [styles.checked]: isChecked })} />
          <TextElement className={styles.text} variant="bodyMedium" tag="span">
            {label}
          </TextElement>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

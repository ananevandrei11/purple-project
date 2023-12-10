'use client';
import { DetailedHTMLProps, SelectHTMLAttributes, useState } from 'react';
import clsx from 'clsx';
import styles from './Select.module.css';

interface Props
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export function Select({ options, className, onClick, onBlur, onKeyDown, ...props }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLSelectElement>) => {
    setIsOpen((prev) => !prev);
    onClick?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLSelectElement>) => {
    setIsOpen(false);
    onBlur?.(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLSelectElement>) => {
    if (e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter') {
      setIsOpen((prev) => !prev);
      onKeyDown?.(e);
    }
  };

  return (
    <div className={clsx(className, styles.root, { [styles.isOpen]: isOpen })}>
      <select
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        className={styles.select}
        {...props}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className={styles.option}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

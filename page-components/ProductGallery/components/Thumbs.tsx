'use client';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import styles from './Thumbs.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  slides: string[];
  activeItem: number;
  onThumbsClick: (index: number) => void;
}

export const Thumbs = ({ slides, activeItem, onThumbsClick, className, ...props }: Props) => {
  return (
    <div className={clsx(styles.thumbs, className)} {...props}>
      {slides.map((item, index) => (
        <button
          type="button"
          aria-labelledby={`slide-${index}`}
          className={clsx(styles.item, { [styles.active]: index === activeItem })}
          key={uuidv4()}
          onClick={() => onThumbsClick(index)}>
          <Image fill src={item} alt=" " objectFit="cover" className={styles.img} />
        </button>
      ))}
    </div>
  );
};

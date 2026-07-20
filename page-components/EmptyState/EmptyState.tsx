import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './EmptyState.module.css';
import clsx from 'clsx';
import { TextElement } from '@/components';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title?: string;
}

export function EmptyState({ title, className, ...props }: Props) {
  return (
    <TextElement variant="heading1" className={clsx(styles.root, className)} tag="div" {...props}>
      {title}
    </TextElement>
  );
}

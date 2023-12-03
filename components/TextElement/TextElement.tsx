import { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './TextElement.module.css';

interface Props {
  tag?: keyof HTMLElementTagNameMap;
  children: ReactNode;
  className?: string;
  variant:
    | 'heading1'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'heading5'
    | 'bodyLarge'
    | 'bodyMedium'
    | 'bodySmall';
}

export default function TextElement({ tag = 'div', variant, children, className }: Props) {
  const Component = tag;
  return (
    <Component className={clsx(className, styles.heading, styles[variant])}>{children}</Component>
  );
}

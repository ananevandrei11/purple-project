import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './InputError.module.css';
import { TextElement } from '..';
interface Props
  extends DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement> {}

export function InputError({ className, ...props }: Props) {
  return (
    <TextElement variant="heading5" tag="p" className={clsx(styles.error, className)} {...props}>
      {props.children}
    </TextElement>
  );
}

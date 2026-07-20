import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { Input } from './Input';
import { InputAddon } from './InputAddon';
import styles from './InputGroup.module.css';
import { InputError } from './InputError';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function InputGroup({ children, className, ...props }: Props) {
  return (
    <div className={clsx(styles.root, className)} {...props}>
      {children}
    </div>
  );
}

InputGroup.Input = Input;
InputGroup.Addon = InputAddon;
InputGroup.Error = InputError;

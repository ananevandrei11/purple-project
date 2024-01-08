import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './SwitchCheckbox.module.css';
import { TextElement } from '..';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  label?: string | JSX.Element;
}

export function SwitchCheckbox({ id, label, className, ...props }: Omit<Props, 'variant'>) {
  return (
    <div className={clsx(className, styles.root)}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          <TextElement variant="heading5" tag="span">
            {label}
          </TextElement>
        </label>
      )}
      <input id={id} type="checkbox" className={styles.input} {...props} />
    </div>
  );
}

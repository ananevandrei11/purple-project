'use client';
import { Toaster, resolveValue } from 'react-hot-toast';
import styles from './Toasts.module.css';
import { Check } from '@/Icon';
import { TextElement } from '..';
import clsx from 'clsx';

const Icons: Record<string, JSX.Element> = {
  success: <Check />
};

export default function Toasts() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        ariaProps: {
          role: 'status',
          'aria-live': 'polite'
        }
      }}
      containerStyle={{
        top: 0,
        left: 0,
        bottom: 0,
        right: 0
      }}>
      {(t) => (
        <div role={t.ariaProps.role} className={clsx(styles.toast, styles[`${t.type}`])}>
          <span className={styles.icon}>{Icons[t.type]}</span>
          <TextElement variant="heading5">{resolveValue(t.message, t)}</TextElement>
        </div>
      )}
    </Toaster>
  );
}

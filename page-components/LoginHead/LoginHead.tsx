import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { TextElement } from '@/components';

import styles from './LoginHead.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setMode: (mode: 'login' | 'register') => void;
  mode: 'login' | 'register';
}

export function LoginHead({ setMode, mode, className, ...props }: Props) {
  return (
    <section className={clsx(styles.root, className)} {...props}>
      <TextElement variant="heading1" tag="h1">
        Мой аккаунт
      </TextElement>

      <form className={styles.form}>
        <input
          className={styles.input}
          type="radio"
          id="login"
          checked={mode === 'login'}
          onChange={() => setMode('login')}
        />
        <label htmlFor="login" className={styles.label}>
          Войти
        </label>
        <input
          className={styles.input}
          type="radio"
          id="register"
          checked={mode === 'register'}
          onChange={() => setMode('register')}
        />
        <label htmlFor="register" className={styles.label}>
          Зарегистрироваться
        </label>
      </form>
    </section>
  );
}

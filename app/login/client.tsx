'use client';
import { useState } from 'react';
import { useSession } from '@/state/localStorage';
import { LoginEntry, LoginHead, LoginRegister, LoginRestore } from '@/page-components';

import styles from './client.module.css';
import { Button, TextElement } from '@/components';
import { ILoginMode } from '@/interfaces';

export function Client() {
  const { session, clearSession } = useSession();
  const [mode, setMode] = useState<ILoginMode>('login');

  if (session?.token) {
    return (
      <section>
        <TextElement variant="heading1" tag="h1">
          Вы уже авторизованы
        </TextElement>
        <Button variant="white" type="button" onClick={clearSession}>
          Log out
        </Button>
      </section>
    );
  }

  return (
    <div className={styles.root}>
      {mode !== 'restore' && <LoginHead setMode={setMode} mode={mode} />}
      {mode === 'login' && <LoginEntry />}
      {mode === 'register' && <LoginRegister />}
      {mode !== 'restore' && (
        <Button
          variant="link"
          type="button"
          onClick={() => setMode('restore')}
          className={styles.restore}>
          Забыли пароль?
        </Button>
      )}
      {mode === 'restore' && <LoginRestore />}
    </div>
  );
}

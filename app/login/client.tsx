'use client';
import { useState } from 'react';
import { useSession } from '@/state/localStorage';
import { LoginEntry, LoginHead, LoginRegister } from '@/page-components';

import styles from './client.module.css';
import { Button, TextElement } from '@/components';

export function Client() {
  const { session, clearSession } = useSession();
  const [mode, setMode] = useState<'login' | 'register'>('login');

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
      <LoginHead setMode={setMode} mode={mode} />
      {mode === 'login' && <LoginEntry />}
      {mode === 'register' && <LoginRegister />}
    </div>
  );
}

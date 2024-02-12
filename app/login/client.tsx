'use client';
import { useState } from 'react';
import { useSession } from '@/state/localStorage';
import { LoginEntry, LoginHead, LoginRegister, LoginRestore, Profile } from '@/page-components';

import styles from './client.module.css';
import { Button } from '@/components';
import { ILoginMode } from '@/interfaces';

export function Client() {
  const { session } = useSession();
  const [mode, setMode] = useState<ILoginMode>('login');

  if (session?.token) {
    return <Profile />;
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

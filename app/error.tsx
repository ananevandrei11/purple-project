'use client';
import { Button, TextElement } from '@/components';
import { useEffect } from 'react';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <TextElement variant="heading1" tag="h1">
        {error?.message || 'Произошла ошибка'}
      </TextElement>
      <Button variant="white" type="button" onClick={reset}>
        Перезагрузить
      </Button>
    </div>
  );
}

'use client';

import { Button, TextElement } from '@/components';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <TextElement variant="heading1" tag="h1">
        {error?.message || 'Произошла ошибка'}
      </TextElement>
      <Button variant="white" type="button" onClick={() => reset()}>
        Перезагрузить
      </Button>
    </div>
  );
}

import { TextElement } from '@/components';
import Link from 'next/link';
import styles from './Error.module.css';

interface Props {
  code: number;
  description: string;
}
export function Error({ code, description }: Props) {
  return (
    <div className={styles.root}>
      <TextElement variant="heading1" tag="h1">
        {code} ошибка
      </TextElement>
      <TextElement variant="heading3" tag="p" className={styles.text}>
        {description}
      </TextElement>
      <Link href="/" className={styles.link}>
        Вернуться на главную
      </Link>
    </div>
  );
}

import clsx from 'clsx';
import styles from './ContentPage.module.css';

interface Props {
  className?: string;
  html: string;
}

export function ContentPage({ html, className }: Props) {
  return (
    <section className={clsx(className, styles.root)} dangerouslySetInnerHTML={{ __html: html }} />
  );
}

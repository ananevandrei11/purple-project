import clsx from 'clsx';
import styles from './Paginator.module.css';
import { ArrowRight } from '@/Icon';
import { TextElement } from '..';

interface Props {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav: {
    current: number;
    next: number;
  };
}
export function Paginator({ nav, disable, onNextPageClick, onPrevPageClick }: Props) {
  return (
    <div className={styles.root}>
      <button
        className={clsx(styles.btn, styles.arrow, {
          [styles.arrowHidden]: disable.left
        })}
        type="button"
        onClick={onPrevPageClick}
        disabled={disable.left}>
        <ArrowRight className={styles.arrowLeft} />
      </button>
      <button type="button" onClick={onPrevPageClick} className={clsx(styles.btn, styles.current)}>
        <TextElement variant="bodyMedium" tag="span">
          {nav.current}
        </TextElement>
      </button>
      <button type="button" onClick={onNextPageClick} className={styles.btn}>
        <TextElement variant="bodyMedium" tag="span">
          {nav.next}
        </TextElement>
      </button>
      <button
        className={clsx(styles.btn, styles.arrow, {
          [styles.arrowHidden]: disable.right
        })}
        type="button"
        onClick={onNextPageClick}
        disabled={disable.left}>
        <ArrowRight />
      </button>
    </div>
  );
}

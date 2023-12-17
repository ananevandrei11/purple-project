import clsx from 'clsx';
import styles from './Paginator.module.css';
import { ArrowRight } from '@/Icon';
import { TextElement } from '..';

interface Props {
  onNextPageClick: () => void;
  onPrevPageClick: () => void;
  onPageClick: (page: number) => void;
  currentPage: number;
  disable: {
    left: boolean;
    right: boolean;
  };
  nav: {
    first: number;
    second: number;
  };
}
export function Paginator({
  nav,
  currentPage,
  disable,
  onPageClick,
  onNextPageClick,
  onPrevPageClick
}: Props) {
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
      <button
        type="button"
        onClick={() => onPageClick(nav.first)}
        className={clsx(styles.btn, currentPage === nav.first && styles.current)}>
        <TextElement variant="bodyMedium" tag="span">
          {nav.first}
        </TextElement>
      </button>
      <button
        type="button"
        onClick={() => onPageClick(nav.second)}
        className={clsx(styles.btn, currentPage === nav.second && styles.current)}>
        <TextElement variant="bodyMedium" tag="span">
          {nav.second}
        </TextElement>
      </button>
      <button
        className={clsx(styles.btn, styles.arrow, {
          [styles.arrowHidden]: disable.right
        })}
        type="button"
        onClick={onNextPageClick}
        disabled={disable.right}>
        <ArrowRight />
      </button>
    </div>
  );
}

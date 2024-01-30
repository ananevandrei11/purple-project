import clsx from 'clsx';
import styles from './Counter.module.css';

interface Props {
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  className?: string;
  fluid?: boolean;
}
export function Counter({ value, max, min = 1, onDecrease, onIncrease, className, fluid }: Props) {
  return (
    <div
      className={clsx(styles.root, className, {
        [styles.fluid]: fluid
      })}>
      <button
        type="button"
        aria-label="counter decrease"
        onClick={onDecrease}
        disabled={min ? value <= min : false}
        className={styles.btn}>
        -
      </button>
      <output>{value}</output>
      <button
        type="button"
        aria-label="counter increase"
        onClick={onIncrease}
        disabled={max ? value >= max : false}
        className={styles.btn}>
        +
      </button>
    </div>
  );
}

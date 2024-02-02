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
export function Counter({
  value,
  max = 6,
  min = 0,
  onDecrease,
  onIncrease,
  className,
  fluid
}: Props) {
  return (
    <div
      className={clsx(styles.root, className, {
        [styles.fluid]: fluid
      })}>
      <button
        type="button"
        aria-label="counter decrease"
        onClick={onDecrease}
        disabled={value <= min}
        className={styles.btn}>
        -
      </button>
      <output>{value}</output>
      <button
        type="button"
        aria-label="counter increase"
        onClick={onIncrease}
        disabled={value >= max}
        className={styles.btn}>
        +
      </button>
    </div>
  );
}

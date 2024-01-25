'use client';
import {
  useEffect,
  useState,
  KeyboardEvent,
  forwardRef,
  ForwardedRef,
  DetailedHTMLProps,
  HTMLAttributes,
  Fragment
} from 'react';
import clsx from 'clsx';
import { Rating } from '@/Icon';
import styles from './RatingStars.module.css';

export interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}

export const RatingStars = forwardRef(
  (
    { isEditable = false, rating, setRating, className, ...props }: Props,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<> </>));

    const changeDisplay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const onChangeRating = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const onKeyChangeRating = (e: KeyboardEvent<HTMLElement>, i: number) => {
      if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
        e.preventDefault();
        if (!rating) {
          setRating?.(1);
          return;
        } else if (rating < 5) {
          setRating?.(rating + 1);
          return;
        }
      }
      if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
        e.preventDefault();
        if (!rating) {
          setRating?.(0);
          return;
        } else if (rating >= 0) {
          setRating?.(rating - 1);
          return;
        }
      }
      if (e.code !== 'Space' && e.code !== 'Enter') {
        return;
      }
      onChangeRating(i);
    };

    const constructRating = (currentRating: number) => {
      const updatedRatingArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          <span
            key={i}
            className={styles.star}
            onMouseEnter={() => changeDisplay(i + 1)}
            onMouseLeave={() => changeDisplay(rating)}
            onClick={() => onChangeRating(i + 1)}
            tabIndex={isEditable ? 0 : -1}
            role={isEditable ? 'slider' : undefined}
            aria-label={isEditable ? 'rating can be changed' : 'not editable'}
            aria-valuenow={rating}
            aria-valuemax={5}
            aria-valuemin={1}
            onKeyDown={(e: KeyboardEvent<HTMLElement>) => onKeyChangeRating(e, i + 1)}>
            <Rating
              className={clsx({
                [styles.fill]: i < currentRating,
                [styles.pure]: i >= currentRating,
                [styles.editable]: isEditable
              })}
            />
          </span>
        );
      });
      setRatingArray(updatedRatingArray);
    };

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    return (
      <div ref={ref} className={clsx(styles.rating, className)} {...props}>
        {ratingArray.map((r: JSX.Element, i: number) => (
          <Fragment key={i}>{r}</Fragment>
        ))}
        {/* {error && <span>{error.message}</span>} */}
      </div>
    );
  }
);

RatingStars.displayName = 'RatingStars';

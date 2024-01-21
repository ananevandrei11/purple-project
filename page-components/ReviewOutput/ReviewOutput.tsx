import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';
import { IProduct } from '@/interfaces';
import styles from './ReviewOutput.module.css';
import { TextElement } from '@/components';
import { Rating } from '..';
import { getDateIntl } from '@/utils';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  reviews: IProduct['reviews'];
}

export function ReviewOutput({ reviews, className }: Props) {
  if (reviews.length === 0) {
    return <div className={className}>Отзывы отсутствуют</div>;
  }
  return (
    <ul className={clsx(className, styles.list)}>
      {reviews.map((review) => (
        <li key={uuidv4()} className={styles.review}>
          <TextElement variant="heading3" className={styles.name}>
            {review?.name}
          </TextElement>
          <TextElement variant="bodyMedium" className={styles.date}>
            {getDateIntl({ date: new Date(review?.date) })}
          </TextElement>
          <Rating rating={review.rating} className={styles.rating} />
          <TextElement variant="heading5" className={styles.description}>
            {review?.description}
          </TextElement>
        </li>
      ))}
    </ul>
  );
}

'use client';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import clsx from 'clsx';
import { z } from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, InputGroup, TextElement } from '@/components';
import { sendReview } from '@/actions/review';

import styles from './ReviewForm.module.css';
import { RatingStars } from '..';
import toast from 'react-hot-toast';
import { emailSchema, stringRequiredSchema } from '@/schemas';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  sku: number;
}

export const reviewSchema = z.object({
  name: stringRequiredSchema,
  email: emailSchema,
  rating: z.number().positive({ message: 'Обязательное поле' }),
  review: z
    .string({ required_error: 'Обязательное поле', invalid_type_error: 'Должен быть строкой' })
    .min(20, 'Не менее 20 символов')
    .trim()
});

export type ReviewSchema = z.infer<typeof reviewSchema>;

export function ReviewForm({ sku, className, ...props }: Props) {
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting, errors }
  } = useForm<ReviewSchema>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      email: '',
      name: '',
      rating: 0,
      review: ''
    }
  });
  const onSubmit = async (data: ReviewSchema) => {
    if (!isValid) {
      return null;
    }
    const response = await sendReview({ data, sku });
    if (response.success) {
      toast.success(response?.message);
    } else if (!response.success) {
      toast.error(response?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
      <fieldset
        disabled={isSubmitting}
        className={clsx(styles.fieldset, isSubmitting && styles.disabled)}>
        <div className={styles.header}>
          <TextElement variant="heading3" tag="h4">
            Добавить отзыв
          </TextElement>
          <TextElement variant="bodySmall" tag="p">
            Ваш email не будет опубликован. Обязательные поля помечены *
          </TextElement>
        </div>

        <InputGroup>
          <Controller
            name="review"
            control={control}
            render={({ field }) => <InputGroup.Input {...field} placeholder="Отзыв*" />}
          />
          {errors.review && <InputGroup.Error>{errors.review?.message}</InputGroup.Error>}
        </InputGroup>

        <InputGroup>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <InputGroup.Input {...field} placeholder="Ваше имя*" />}
          />
          {errors.name && <InputGroup.Error>{errors.name?.message}</InputGroup.Error>}
        </InputGroup>

        <InputGroup>
          <Controller
            name="email"
            control={control}
            render={({ field }) => <InputGroup.Input {...field} placeholder="Ваше email*" />}
          />
          {errors.email && <InputGroup.Error>{errors.email?.message}</InputGroup.Error>}
        </InputGroup>

        <InputGroup>
          <TextElement variant="bodyMedium" tag="p">
            Рейтинг *
          </TextElement>
          <Controller
            name="rating"
            control={control}
            render={({ field: { value, onChange } }) => (
              <RatingStars rating={value} setRating={onChange} isEditable />
            )}
          />
          {errors.rating && <InputGroup.Error>{errors.rating?.message}</InputGroup.Error>}
        </InputGroup>

        <Button variant="black" type="submit" className={styles.btn}>
          Отправить
        </Button>
      </fieldset>
    </form>
  );
}

'use client';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { getPriceWithCurrency } from '@/utils';
import { emailSchema, phoneSchema, stringDefaultSchema, stringRequiredSchema } from '@/schemas';
import { useCartContext } from '@/context/cartContext';
import { Button, InputGroup, TextElement } from '@/components';

import styles from './CartForm.module.css';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

function getCartSchema(isAuth: boolean = false) {
  return z.object({
    address: stringRequiredSchema,
    name: stringDefaultSchema,
    phone: phoneSchema,
    email: isAuth ? stringDefaultSchema : emailSchema,
    password: isAuth ? stringDefaultSchema : stringRequiredSchema
  });
}
export type FieldValues = z.infer<ReturnType<typeof getCartSchema>>;

export function CartForm({ className, ...props }: Props) {
  const { state } = useCartContext();
  const {
    handleSubmit,
    control,
    formState: { isValid, errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(getCartSchema()),
    defaultValues: {
      address: '',
      name: '',
      phone: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: FieldValues) => {
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля');
    }
    console.log(data);
  };

  const price = state.items.reduce((acc, item) => {
    const costDiscount = !item.discount ? item.price : item.price * (1 - item.discount * 0.01);
    return acc + costDiscount * item.count;
  }, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.form, className)} {...props}>
      <InputGroup>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputGroup.Input
              {...field}
              placeholder="Email*"
              required
              autoComplete="shipping email"
            />
          )}
        />
        {errors.email && <InputGroup.Error>{errors.email?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <InputGroup.Input
              {...field}
              placeholder="Пароль*"
              required
              autoComplete="current-password"
            />
          )}
        />
        {errors.password && <InputGroup.Error>{errors.password?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <InputGroup.Input
              {...field}
              placeholder="Адрес доставки*"
              required
              autoComplete="shipping street-address"
            />
          )}
        />
        {errors.address && <InputGroup.Error>{errors.address?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <InputGroup.Input {...field} placeholder="Имя" autoComplete="name" />
          )}
        />
        {errors.name && <InputGroup.Error>{errors.name?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="phone"
          control={control}
          render={({ field }) => (
            <InputGroup.Input {...field} placeholder="Телефон" autoComplete="tel" />
          )}
        />
        {errors.phone && <InputGroup.Error>{errors.phone?.message}</InputGroup.Error>}
      </InputGroup>
      <div className={styles.total}>
        <TextElement variant="heading4" tag="p">
          Итог
        </TextElement>
        <div className={styles.divider} />
        <TextElement variant="bodyLarge" tag="p" className={styles.price}>
          <span>Стоимость:</span>
          <span>{getPriceWithCurrency({ price })}</span>
        </TextElement>
      </div>
      <Button variant="black" fluid type="submit">
        Оплатить
      </Button>
    </form>
  );
}

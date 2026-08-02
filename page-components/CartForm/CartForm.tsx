'use client';
import { DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { Controller, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { getPriceWithCurrency, getPriceWithDiscount } from '@/utils';
import { useCartContext } from '@/context/cartContext';
import { useSession } from '@/state/localStorage';
import { IOrderResult } from '@/interfaces';
import { Button, InputGroup, TextElement } from '@/components';

import styles from './CartForm.module.css';
import { FieldValues, getCartSchema } from './schema';
import { useCreateOrder } from './useCreateOrder';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {
  setCartResult: (result: IOrderResult) => void;
}

export function CartForm({ setCartResult, className, ...props }: Props) {
  const { state } = useCartContext();
  const { session } = useSession();
  const { handleCreateOrder } = useCreateOrder();
  const isAuth = !!session?.token;

  const {
    handleSubmit,
    control,
    formState: { isValid, errors }
  } = useForm<FieldValues>({
    resolver: zodResolver(getCartSchema(isAuth)),
    defaultValues: {
      address: session?.address || '',
      name: session?.name || '',
      phone: session?.phone || '',
      email: session?.email || '',
      password: ''
    }
  });

  const onSubmit = async (data: FieldValues) => {
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }
    const response = await handleCreateOrder(data);
    if (response) {
      setCartResult({
        ...response,
        address: data.address,
        email: session?.email || data.email,
        name: data.name,
        phone: data.phone
      });
    }
  };

  const price = state.items.reduce((acc, item) => {
    const costDiscount = getPriceWithDiscount({ price: item.price, discount: item.discount });
    return acc + costDiscount * item.count;
  }, 0);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={clsx(styles.form, className)} {...props}>
      {!isAuth && (
        <>
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
        </>
      )}
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

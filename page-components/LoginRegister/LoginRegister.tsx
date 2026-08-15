'use client';
import clsx from 'clsx';
import { DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { emailSchema, stringRequiredSchema } from '@/schemas';
import { Button, Checkbox, InputGroup } from '@/components';
import styles from './LoginRegister.module.css';
import { authenticate } from '@/actions/authenticate';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

const schema = z
  .object({
    email: emailSchema,
    password: stringRequiredSchema,
    confirmPassword: stringRequiredSchema,
    isAgree: z.boolean()
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword']
  });

type FieldValues = z.infer<typeof schema>;

export function LoginRegister({ className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<FieldValues>({
    mode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      isAgree: false
    }
  });

  const isAgreeValue = watch('isAgree', false);

  const onSubmit = async (data: FieldValues) => {
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const { email, password } = data;

    try {
      await authenticate({ email, password });
      toast.success('Вы успешно cоздали профиль');
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось cоздать профиль');
    }
    return;
  };

  return (
    <form className={clsx(styles.form, className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <InputGroup>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <InputGroup.Input {...field} placeholder="Email*" required autoComplete="email" />
          )}
        />
        {errors.email && <InputGroup.Error>{errors.email?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <>
              <InputGroup.Input
                {...field}
                type={showPassword.password ? 'text' : 'password'}
                placeholder="Пароль*"
                required
                autoComplete="off"
              />
              <InputGroup.Addon
                variant={showPassword.password ? 'eyeClose' : 'eyeOpen'}
                side="right"
                type="button"
                onClick={() => setShowPassword((prev) => ({ ...prev, password: !prev.password }))}
              />
            </>
          )}
        />
        {errors.password && <InputGroup.Error>{errors.password?.message}</InputGroup.Error>}
      </InputGroup>
      <InputGroup>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <>
              <InputGroup.Input
                {...field}
                type={showPassword.confirmPassword ? 'text' : 'password'}
                placeholder="Повторите пароль*"
                required
                autoComplete="off"
              />
              <InputGroup.Addon
                variant={showPassword.confirmPassword ? 'eyeClose' : 'eyeOpen'}
                side="right"
                type="button"
                onClick={() =>
                  setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))
                }
              />
            </>
          )}
        />
        {errors.confirmPassword && (
          <InputGroup.Error>{errors.confirmPassword?.message}</InputGroup.Error>
        )}
      </InputGroup>
      <Controller
        name="isAgree"
        control={control}
        render={({ field: { value, ...field } }) => (
          <Checkbox
            id="isAgree"
            label="Согласен на обработку персональных данных"
            isChecked={value}
            {...field}
          />
        )}
      />
      <Button variant="black" type="submit" disabled={!isAgreeValue || !isValid} fluid>
        Войти
      </Button>
    </form>
  );
}

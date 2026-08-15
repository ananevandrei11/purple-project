'use client';
import clsx from 'clsx';
import { DetailedHTMLProps, FormHTMLAttributes, useState } from 'react';
import toast from 'react-hot-toast';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { login } from '@/actions/login';
import { emailSchema, stringRequiredSchema } from '@/schemas';
import { Button, Checkbox, InputGroup } from '@/components';
import styles from './LoginEntry.module.css';

interface Props extends DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement> {}

const schema = z.object({
  email: emailSchema,
  password: stringRequiredSchema,
  isSave: z.boolean()
});

type FieldValues = z.infer<typeof schema>;

export function LoginEntry({ className, ...props }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FieldValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      isSave: false
    }
  });

  const onSubmit = async (data: FieldValues) => {
    if (!isValid) {
      toast.error('Пожалуйста, заполните все обязательные поля');
      return;
    }

    const { email, password } = data;
    try {
      await login({ email, password });
      toast.success('Вы успешно авторизовались');
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось авторизоваться');
      return;
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
                type={showPassword ? 'text' : 'password'}
                placeholder="Пароль*"
                required
                autoComplete="current-password"
              />
              <InputGroup.Addon
                variant={showPassword ? 'eyeClose' : 'eyeOpen'}
                side="right"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              />
            </>
          )}
        />
        {errors.password && <InputGroup.Error>{errors.password?.message}</InputGroup.Error>}
      </InputGroup>
      <Controller
        name="isSave"
        control={control}
        render={({ field: { value, ...field } }) => (
          <Checkbox id="isSave" label="Запомнить меня" isChecked={value} {...field} />
        )}
      />
      <Button variant="black" type="submit" disabled={!isValid} fluid>
        Войти
      </Button>
    </form>
  );
}

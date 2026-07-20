'use client';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { emailSchema } from '@/schemas';
import { debounce } from '@/utils';
import { restore } from '@/actions/restore';
import { Button, InputGroup, TextElement } from '@/components';

import styles from './LoginRestore.module.css';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export function LoginRestore({ className, ...props }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valid = emailSchema.safeParse(e.target.value);
    if (!valid.success) {
      setError(
        valid?.error?.issues?.reduce((acc, issue) => acc + issue?.message, '') ||
          'Некорректный email'
      );
    } else {
      setError('');
    }
  };
  const validationDebounce = debounce(handleValidation, 500);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email || error) {
      toast.error('Поле обязательно для заполнения');
      return;
    }

    try {
      const response = await restore({ email });
      toast.success(
        response.message || `На Email ${email} отправлена ссылка для восстановления пароля.`
      );
      setEmail('');
    } catch (error) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось восстановить пароль');
    }
    return;
  };

  return (
    <section className={clsx(styles.root, className)} {...props}>
      <TextElement variant="heading1" tag="h1">
        Забыли пароль?
      </TextElement>
      <TextElement variant="heading5" tag="p">
        Если вы забыли пароль, то введите свой email и мы отправим вам ссылку на восстановление
      </TextElement>
      <form onSubmit={handleSubmit} name="subscribe" className={styles.form}>
        <InputGroup>
          <InputGroup.Input
            isAddonRight
            type="email"
            id="restore-email"
            name="restore-email"
            autoComplete="email"
            value={email}
            required
            onChange={(e) => {
              handleChange(e);
              validationDebounce(e);
            }}
            placeholder="Email"
          />
          {error && <InputGroup.Error>{error}</InputGroup.Error>}
        </InputGroup>
        <Button variant="black" type="submit" fluid disabled={!email}>
          Сбросить пароль
        </Button>
      </form>
    </section>
  );
}

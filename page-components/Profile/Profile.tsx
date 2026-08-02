'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { getOrders } from '@/api/getOrders';
import { IOrder } from '@/interfaces';
import { useSession } from '@/state/localStorage';
import { getDateIntl, getPriceWithCurrency } from '@/utils';
import { Button, TextElement } from '@/components';

import styles from './Profile.module.css';

export function Profile() {
  const { session, clearSession } = useSession();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    async function fetchData(token: string) {
      try {
        const response = await getOrders({ token });
        setOrders(response);
      } catch (error) {
        toast.error(error instanceof Error ? error?.message : 'Не удалось получить заказы');
      }
    }
    if (session?.token) {
      fetchData(session.token);
    }
  }, [session]);

  return (
    <div className={styles.root}>
      <section className={styles.header}>
        <TextElement variant="heading1" tag="h1">
          Мой аккаунт
        </TextElement>

        <Button onClick={clearSession} variant="white" type="button">
          Выход
        </Button>
      </section>

      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            <th className={clsx(styles.td, styles.th)}>Номер заказа</th>
            <th className={clsx(styles.td, styles.th)}>Дата</th>
            <th className={clsx(styles.td, styles.th)}>Статус</th>
            <th className={clsx(styles.td, styles.th)}>Итог</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr key={item.id} className={styles.tr}>
              <td className={styles.td}>{item.id}</td>
              <td className={styles.td}>{getDateIntl({ date: new Date(item.createdAt) })}</td>
              <td className={styles.td}>{item.status}</td>
              <td className={styles.td}>
                {getPriceWithCurrency({
                  price: item.data.reduce((acc, item) => acc + item.price * item.count, 0)
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

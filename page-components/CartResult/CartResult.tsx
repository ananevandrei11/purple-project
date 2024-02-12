import { DetailedHTMLProps, HTMLAttributes } from 'react';
import clsx from 'clsx';
import { IOrderResult } from '@/interfaces';
import { getDateIntl, getPriceWithCurrency } from '@/utils';
import { TextElement } from '@/components';
import { Check } from '@/Icon';

import styles from './CartResult.module.css';
import { CartResultInfoItem } from './components/CartResultInfoItem';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  order: IOrderResult;
}

export function CartResult({ order, className, ...props }: Props) {
  const { id, createdAt, address, email, name, phone, data } = order;
  const totalPrice = data.reduce((acc, item) => acc + item.price * item.count, 0);

  return (
    <div className={clsx(styles.root, className)} {...props}>
      <section className={styles.toast}>
        <span className={styles.icon}>
          <Check />
        </span>
        <TextElement variant="heading5">Мы получили ваш заказ</TextElement>
      </section>

      <ul className={styles.info}>
        <CartResultInfoItem label="Номер" value={String(id)} />
        <CartResultInfoItem
          label="Дата заказа"
          value={getDateIntl({ date: new Date(createdAt) })}
        />
        <CartResultInfoItem label="Имя" value={name} />
        <CartResultInfoItem label="Email" value={email} />
        <CartResultInfoItem label="Адрес доставки" value={address} />
        <CartResultInfoItem label="Телефон" value={phone} />
      </ul>

      <section className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={styles.td}>Продукты</th>
              <th className={styles.td}>Количество</th>
              <th className={styles.td}>Цена</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.name} className={styles.tr}>
                <td className={styles.td}>{item.name}</td>
                <td className={styles.td}>{item.count}</td>
                <td className={styles.td}>{getPriceWithCurrency({ price: item.price })}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr>
              <td className={styles.td} colSpan={2}>
                Итого
              </td>
              <td className={styles.td}>{getPriceWithCurrency({ price: totalPrice })}</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </div>
  );
}

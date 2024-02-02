'use client';
import toast from 'react-hot-toast';
import { authenticate } from '@/actions/authenticate';
import { createOrder } from '@/actions/createOrder';
import { login } from '@/actions/login';
import { useCartContext } from '@/context/cartContext';
import { useSession } from '@/state/localStorage';
import { getPriceWithDiscount } from '@/utils';
import { FieldValues } from './schema';

export function useCreateOrder() {
  const { state } = useCartContext();
  const { addSession, session } = useSession();

  const handleSendOrder = async (token: string) => {
    const payload = {
      items: state.items.map((item) => ({
        name: item.name,
        count: item.count,
        price: getPriceWithDiscount({ price: item.price, discount: item.discount })
      }))
    };
    const orderRes = await createOrder({ items: payload, token });

    if ('data' in orderRes) {
      toast.success('Заказ успешно оформлен');
    } else {
      toast.error(orderRes?.message || 'Не удалось создать заказ');
    }
  };

  const handleCreateOrder = async (data: FieldValues) => {
    const token = session?.token;

    if (token) {
      handleSendOrder(token);
    }

    const loginRes = await login({ email: data.email, password: data.password });
    if (loginRes?.token) {
      addSession({ token: loginRes.token, name: data.name, email: data.email });
      handleSendOrder(loginRes.token);
      return;
    }

    const authRes = await authenticate(data);
    if (authRes?.token) {
      addSession({ token: authRes.token, name: data.name, email: data.email });
      handleSendOrder(authRes.token);
      return;
    } else {
      toast.error(authRes?.message || 'Не удалось авторизоваться');
      return;
    }
  };

  return {
    handleCreateOrder
  };
}

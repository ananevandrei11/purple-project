'use client';
import toast from 'react-hot-toast';
import { authenticate } from '@/actions/authenticate';
import { createOrder } from '@/actions/createOrder';
import { login } from '@/actions/login';
import { updateUser } from '@/actions/updateUser';
import { useCartContext } from '@/context/cartContext';
import { getPriceWithDiscount } from '@/utils';
import { FieldValues } from './schema';

export function useCreateOrder(isAuth: boolean) {
  const { state } = useCartContext();
  const { clearCart } = useCartContext();

  const handleSendOrder = async () => {
    try {
      const payload = {
        items: state.items.map((item) => ({
          name: item.name,
          count: item.count,
          price: getPriceWithDiscount({ price: item.price, discount: item.discount })
        }))
      };
      const orderRes = await createOrder({ items: payload });
      toast.success('Заказ успешно оформлен');
      clearCart();
      return orderRes;
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось создать заказ');
      return null;
    }
  };

  const handleUpdateUser = async ({ data }: { data: FieldValues }) => {
    try {
      await updateUser({
        body: {
          address: data.address,
          name: data.name,
          phone: data.phone
        }
      });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось обновить профиль');
    }
    return;
  };

  const handleCreateOrder = async (data: FieldValues) => {
    let order = null;

    if (isAuth) {
      await handleUpdateUser({ data });
      order = await handleSendOrder();
      return order;
    }

    try {
      await login({ email: data.email, password: data.password });
      await handleUpdateUser({ data });
      order = await handleSendOrder();
      return order;
    } catch {
      //
    }

    try {
      await authenticate(data);
      order = await handleSendOrder();
      return order;
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось авторизоваться');
      return;
    }
  };

  return {
    handleCreateOrder
  };
}

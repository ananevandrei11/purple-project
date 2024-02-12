'use client';
import toast from 'react-hot-toast';
import { authenticate } from '@/actions/authenticate';
import { createOrder } from '@/actions/createOrder';
import { login } from '@/actions/login';
import { updateUser } from '@/actions/updateUser';
import { useCartContext } from '@/context/cartContext';
import { useSession } from '@/state/localStorage';
import { getPriceWithDiscount } from '@/utils';
import { FieldValues } from './schema';

export function useCreateOrder() {
  const { state } = useCartContext();
  const { addSession, session } = useSession();
  const { clearCart } = useCartContext();

  const handleSendOrder = async (token: string) => {
    try {
      const payload = {
        items: state.items.map((item) => ({
          name: item.name,
          count: item.count,
          price: getPriceWithDiscount({ price: item.price, discount: item.discount })
        }))
      };
      const orderRes = await createOrder({ items: payload, token });
      toast.success('Заказ успешно оформлен');
      clearCart();
      return orderRes;
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось создать заказ');
      return null;
    }
  };

  const handleUpdateUser = async ({ data, token }: { data: FieldValues; token: string }) => {
    try {
      await updateUser({
        body: {
          address: data.address,
          name: data.name,
          phone: data.phone
        },
        token
      });
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error?.message : 'Не удалось обновить профиль');
    }
    return;
  };

  const handleCreateOrder = async (data: FieldValues) => {
    const token = session?.token;
    let order = null;

    if (token) {
      await handleUpdateUser({ data, token });
      order = await handleSendOrder(token);
      return order;
    }

    try {
      const loginRes = await login({ email: data.email, password: data.password });
      addSession({ token: loginRes.token, name: data.name, email: data.email });
      await handleUpdateUser({ data, token: loginRes.token });
      order = await handleSendOrder(loginRes.token);
      return order;
    } catch {
      //
    }

    try {
      const authRes = await authenticate(data);
      addSession({ token: authRes.token, name: data.name, email: data.email });
      order = await handleSendOrder(authRes.token);
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

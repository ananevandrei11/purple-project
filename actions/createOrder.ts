'use server';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IOrder, IOrderItemList } from '@/interfaces';
import { authFetch } from '@/state/auth/authFetch';

export async function createOrder({ items }: { items: IOrderItemList }) {
  try {
    const { data, status, statusText } = await authFetch<IOrder>({
      method: 'POST',
      url: API.order.create,
      data: {
        items
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error create order'));
  }
}

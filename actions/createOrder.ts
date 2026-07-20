'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IOrder, IOrderItemList } from '@/interfaces';

export async function createOrder({ items, token }: { items: IOrderItemList; token: string }) {
  try {
    const { data, status, statusText } = await apiStore.post<IOrder>(API.order.create, items, {
      headers: {
        Authorization: `Bearer ${token}`
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

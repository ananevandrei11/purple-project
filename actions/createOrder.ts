'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { IOrder, IOrderItemList } from '@/interfaces';

export async function createOrder({ items, token }: { items: IOrderItemList; token: string }) {
  try {
    const { data, status, statusText } = await apiStore.post<
      IOrder | { status: 'error'; message: string }
    >(API.order.create, items, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return { ...data };
  } catch (error: unknown) {
    return {
      status: 'error',
      message: error instanceof Error ? error?.message : 'Error create order'
    };
  }
}

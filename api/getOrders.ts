import { API } from '@/helpers/api';
import { IOrder } from '@/interfaces';
import { apiStore } from '@/config/apiStore';
import { handlerError } from '@/helpers/handlerError';

export async function getOrders({ token }: { token: string }) {
  try {
    const { data, status, statusText } = await apiStore.get<IOrder[]>(API.order.my, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error get orders'));
  }
}

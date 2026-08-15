import { API } from '@/helpers/api';
import { IOrder } from '@/interfaces';
import { handlerError } from '@/helpers/handlerError';
import { authFetch } from '@/state/auth/authFetch';

export async function getOrders() {
  try {
    const { data, status, statusText } = await authFetch<IOrder>({
      method: 'GET',
      url: API.order.my
    });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return data;
  } catch (error: unknown) {
    throw new Error(handlerError(error, 'Error get orders'));
  }
}

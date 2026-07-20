'use server';
import { apiStore } from '@/config/apiStore';
import { API } from '@/helpers/api';
import { handlerError } from '@/helpers/handlerError';
import { IReviewBody, IReviewResponse } from '@/interfaces';

export async function sendReview({ data, sku }: { sku: number; data: Required<IReviewBody> }) {
  try {
    if (!sku) {
      throw new Error('Missing sku');
    }
    const {
      data: response,
      status,
      statusText
    } = await apiStore.post<IReviewResponse>(API.productReview(sku), { ...data });

    if (status >= 400) {
      throw new Error(`${status}: ${statusText}`);
    }

    return response;
  } catch (error) {
    throw new Error(handlerError(error, 'Error adding review'));
  }
}

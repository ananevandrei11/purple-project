import { IProduct } from '.';

export interface ICartItem extends IProduct {
  count: number;
}

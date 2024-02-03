export interface IOrderItem {
  name: string;
  count: number;
  price: number;
}

export interface IOrderItemList {
  items: IOrderItem[];
}

export interface IOrder {
  id: number;
  userId: number;
  status: string;
  createdAt: Date;
  data: IOrderItem[];
}

export interface IOrderResult extends IOrder {
  address: string;
  email: string;
  name: string;
  phone: string;
}

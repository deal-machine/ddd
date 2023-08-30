import { OrderItemAttributes } from "./order-item.protocol";

export type OrderAttributes = {
  id: string;
  customerId: string;
  items: OrderItemAttributes[];
};

export type OrderConstructor = {
  id: string;
  customerId: string;
  items: OrderItemAttributes[];
};

export interface IOrder {
  total: () => number;
}

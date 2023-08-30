import { OrderItem } from "../entities";
import { OrderItemAttributes } from "./order-item.protocol";

export type OrderAttributes = {
  id: string;
  customerId: string;
  items: OrderItemAttributes[];
  total: number;
};

export type OrderConstructor = {
  id: string;
  customerId: string;
  items: OrderItem[];
};

export interface IOrder {
  getTotal: () => number;
  getId(): string;
  getCustomerId(): string;
  getOrderItems(): OrderItem[];
}

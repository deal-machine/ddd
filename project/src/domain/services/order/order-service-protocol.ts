import { Customer, Order, OrderItem } from "../../entities";

export type PlaceOrderParams = {
  customer: Customer;
  orderItems: OrderItem[];
};

export type TotalParams = {
  orders: Order[];
};

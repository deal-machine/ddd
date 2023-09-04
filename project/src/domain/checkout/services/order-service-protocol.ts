import { Customer } from "../../customer/entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";

export type PlaceOrderParams = {
  customer: Customer;
  orderItems: OrderItem[];
};

export type TotalParams = {
  orders: Order[];
};

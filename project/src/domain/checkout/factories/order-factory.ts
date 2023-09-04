import { v4 } from "uuid";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order-item";

interface ICreateFactory {
  customerId: string;
  items: {
    name: string;
    price: number;
    productId: string;
    quantity: number;
  }[];
}

export class OrderFactory {
  public static create(props: ICreateFactory): Order {
    const items = props.items.map((item) => {
      return new OrderItem({
        id: v4(),
        name: item.name,
        price: item.price,
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    return new Order({
      id: v4(),
      customerId: props.customerId,
      items,
    });
  }
}

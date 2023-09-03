import { OrderRepository } from "../../../../domain/repositories/order/order-repository-protocol";
import { Order, OrderItem } from "../../../../domain/entities";
import { OrderModel, OrderItemModel } from "../models";

export class SequelizeOrderRepository implements OrderRepository {
  private order;
  private orderItem;
  constructor() {
    this.order = OrderModel;
    this.orderItem = OrderItemModel;
  }

  async findOne(id: string): Promise<Order | null> {
    const orderModel = await this.order.findByPk(id, {
      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],
    });

    if (!orderModel) return null;

    const orderItems = orderModel.items.map((item) => {
      return new OrderItem({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        productId: item.productId,
        quantity: item.quantity,
      });
    });

    return new Order({
      id: orderModel.id,
      customerId: orderModel.customerId,
      items: orderItems,
    });
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await this.order.findAll({
      include: [
        {
          model: OrderItemModel,
          as: "items",
        },
      ],
    });

    if (orderModels.length < 1) return [];

    return orderModels.map((om) => {
      const orderItems = om.items.map((item) => {
        return new OrderItem({
          id: item.id,
          name: item.name,
          price: Number(item.price),
          productId: item.productId,
          quantity: item.quantity,
        });
      });
      return new Order({
        id: om.id,
        customerId: om.customerId,
        items: orderItems,
      });
    });
  }

  async create(entity: Order): Promise<void> {
    const orderModel = await this.order.create({
      id: entity.id,
      customerId: entity.customerId,
      total: entity.total,
    });

    await Promise.all(
      entity.items.map(async (item) => {
        return this.orderItem.create({
          id: item.id,
          name: item.name,
          productId: item.productId,
          orderId: orderModel.id,
          price: Number(item.price),
          quantity: item.quantity,
        });
      })
    );
  }

  async delete(id: string): Promise<void> {
    await this.order.destroy({ where: { id } });
  }

  async update(id: string, { customerId }: Partial<Order>): Promise<void> {
    await this.order.update({ customerId }, { where: { id } });
  }
}

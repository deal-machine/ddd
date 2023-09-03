import { CustomerModel } from "./customer-model";
import { ProductModel } from "./product-model";
import { OrderModel } from "./order-model";
import { OrderItemModel } from "./order-item-model";

const sequelizeModels = [
  CustomerModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
];

export {
  sequelizeModels,
  ProductModel,
  CustomerModel,
  OrderModel,
  OrderItemModel,
};

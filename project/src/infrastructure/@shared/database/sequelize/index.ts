import { connection } from "../connections";
import { SequelizeOptions } from "sequelize-typescript";
import {
  initSequelize,
  closeDatabase,
  getInstance,
} from "./sequelize-instance";

import { CustomerModel } from "../../../customer/sequelize/customer-model";
import { ProductModel } from "../../../product/sequelize/product-model";
import { OrderModel } from "../../../checkout/sequelize/order-model";
import { OrderItemModel } from "../../../checkout/sequelize/order-item-model";

const initDatabase = () => initSequelize(connection as SequelizeOptions);

const sequelizeModels = [
  CustomerModel,
  ProductModel,
  OrderModel,
  OrderItemModel,
];

export { initDatabase, closeDatabase, getInstance, sequelizeModels };

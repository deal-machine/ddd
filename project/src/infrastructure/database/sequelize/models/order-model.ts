import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import { CustomerModel, OrderItemModel } from "./";

interface IOrderModel {
  id: string;
  total: number;
  customerId: string;
  items: OrderItemModel[];
}

@Table({
  tableName: "orders",
  timestamps: false,
})
class OrderModel extends Model implements IOrderModel {
  @Column({
    field: "id",
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @ForeignKey(() => CustomerModel)
  @Column({
    field: "customer_id",
    allowNull: false,
    type: DataType.STRING,
  })
  declare customerId: string;

  @BelongsTo(() => CustomerModel)
  declare customer: CustomerModel;

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[];

  @Column({
    field: "total",
    allowNull: false,
    type: DataType.DECIMAL(10, 2),
  })
  declare total: number;
}

export { OrderModel };

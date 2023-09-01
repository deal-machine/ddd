import { Column, DataType, Model, Table } from "sequelize-typescript";
import { Product } from "../../../../domain/entities";

@Table({
  tableName: "products",
  timestamps: false,
})
export default class ProductModel extends Model<Product> {
  @Column({
    field: "id",
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  })
  declare id: string;

  @Column({
    field: "name",
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    field: "description",
    type: DataType.STRING,
    allowNull: false,
  })
  declare description: string;

  @Column({
    field: "category",
    type: DataType.STRING,
    allowNull: false,
  })
  declare category: string;

  @Column({
    field: "price",
    type: DataType.DECIMAL,
    allowNull: false,
  })
  declare price: number;
}

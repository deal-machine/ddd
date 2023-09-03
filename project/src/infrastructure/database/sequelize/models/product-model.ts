import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IProductModel {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
}

@Table({
  tableName: "products",
  timestamps: false,
})
class ProductModel extends Model implements IProductModel {
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
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  declare price: number;
}

export { ProductModel };

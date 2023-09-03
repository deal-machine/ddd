import { Column, DataType, Model, Table } from "sequelize-typescript";

interface ICustomerModel {
  id: string;
  name: string;
  status: boolean;
  rewardPoints: number;
  zipcode: string;
  number: string;
  street: string;
  city: string;
  country: string;
}
@Table({
  tableName: "customers",
  timestamps: false,
})
class CustomerModel extends Model implements ICustomerModel {
  @Column({
    field: "id",
    primaryKey: true,
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare id: string;

  @Column({
    field: "name",
    unique: true,
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    field: "status",
    defaultValue: false,
    type: DataType.BOOLEAN,
  })
  declare status: boolean;

  @Column({
    field: "reward_points",
    defaultValue: 0,
    type: DataType.DECIMAL(10, 2),
  })
  declare rewardPoints: number;

  @Column({
    field: "zipcode",
    type: DataType.STRING,
    allowNull: false,
  })
  declare zipcode: string;

  @Column({
    field: "number",
    type: DataType.STRING,
    allowNull: false,
  })
  declare number: string;

  @Column({
    field: "street",
    type: DataType.STRING,
    allowNull: false,
  })
  declare street: string;

  @Column({
    field: "country",
    type: DataType.STRING,
    allowNull: false,
  })
  declare country: string;

  @Column({
    field: "city",
    type: DataType.STRING,
    allowNull: false,
  })
  declare city: string;
}

export { CustomerModel };

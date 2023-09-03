import { Customer } from "../../../../domain/entities";
import { CustomerRepository } from "../../../../domain/repositories/customer/customer-repository-protocol";
import { Address } from "../../../../domain/value-objects";
import { CustomerModel } from "../models";

export class SequelizeCustomerRepository implements CustomerRepository {
  private model;
  constructor() {
    this.model = CustomerModel;
  }

  async findOne(id: string): Promise<Customer | null> {
    const customerModel = await this.model.findByPk(id);

    if (!customerModel) return null;

    const customer = new Customer({
      id: customerModel.id,
      name: customerModel.name,
    });
    const address = new Address({
      city: customerModel.city,
      country: customerModel.country,
      number: customerModel.number,
      street: customerModel.street,
      zipcode: customerModel.zipcode,
    });
    customer.changeAddress(address);

    if (customerModel.rewardPoints > 1) {
      customer.increaseRewardPoints(Number(customerModel.rewardPoints));
    }
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await this.model.findAll();

    if (customerModels.length < 1) return [];

    return customerModels.map((cm) => {
      const customer = new Customer({
        id: cm.id,
        name: cm.name,
      });
      const address = new Address({
        city: cm.city,
        country: cm.country,
        number: cm.number,
        street: cm.street,
        zipcode: cm.zipcode,
      });
      customer.changeAddress(address);

      if (cm.rewardPoints > 1) {
        customer.increaseRewardPoints(Number(cm.rewardPoints));
      }

      return customer;
    });
  }

  async create(entity: Customer): Promise<void> {
    await this.model.create({
      id: entity.id,
      name: entity.name,
      rewardPoints: entity.rewardPoints,
      status: true,
      city: entity.address.city,
      country: entity.address.country,
      number: entity.address.number,
      street: entity.address.street,
      zipcode: entity.address.zipcode,
    });
  }

  async delete(id: string): Promise<void> {
    await this.model.destroy({ where: { id } });
  }

  async update(id: string, entity: Partial<Customer>): Promise<void> {
    await this.model.update(entity, { where: { id } });
  }
}

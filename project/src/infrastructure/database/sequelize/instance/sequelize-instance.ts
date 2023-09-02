import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { DatabaseException } from "../../../errors/database.error";
import { sequelizeModels } from "../models";

let sequelize: Sequelize | null;

export const initSequelize = async (
  connection: SequelizeOptions
): Promise<Sequelize> => {
  sequelize = new Sequelize(connection);

  await sequelize.authenticate({ logging: false });

  sequelize.addModels(sequelizeModels);
  await sequelize.sync({ force: true });

  return sequelize;
};

export const closeDatabase = async (): Promise<void> => {
  if (!sequelize)
    throw new DatabaseException("Sequelize connection not exists.");

  await sequelize.close();
  sequelize = null;
};

export const getInstance = () => {
  if (!sequelize)
    throw new DatabaseException("Sequelize connection not exists.");

  return sequelize;
};

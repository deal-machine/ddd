import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { DatabaseException } from "../../../errors/database.error";

let sequelize: Sequelize | null;

export const initSequelize = async (
  connection: SequelizeOptions
): Promise<Sequelize> => {
  sequelize = new Sequelize(connection);

  await sequelize.authenticate({ logging: false });

  sequelize.addModels([`${getPreviousFolder()}/models`]);
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

const getPreviousFolder = () => {
  const folder = __dirname.split("/");
  folder.pop();
  return folder.join("/");
};

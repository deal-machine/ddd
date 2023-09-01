import { Dialect } from "sequelize";
import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { env } from "../../../main/configs/env";
import { DatabaseException } from "../../errors/database.error";

const connTest: SequelizeOptions = {
  dialect: env.dbTestDialect as Dialect,
  host: env.dbTestHost,
  database: env.dbTestName,
  username: env.dbTestUser,
  password: env.dbTestPassword,
  port: env.dbTestPort,
  sync: { force: true },
  logging: false,
  models: [`${__dirname}/models`],
};

const conn: SequelizeOptions = {
  dialect: env.dbDialect as Dialect,
  host: env.dbHost,
  database: env.dbName,
  username: env.dbUser,
  password: env.dbPassword,
  port: env.dbPort,
  sync: { force: true },
  logging: false,
  models: [`${__dirname}/models`],
};

let sequelize: Sequelize | null;

export const initSequelize = async (): Promise<Sequelize> => {
  const connection = env.isTest ? connTest : conn;

  sequelize = new Sequelize(connection);

  await sequelize.authenticate({ logging: false });
  sequelize.addModels([`${__dirname}/models`]);
  await sequelize.sync();

  return sequelize;
};

export const closeDatabase = async (): Promise<void> => {
  if (!sequelize)
    throw new DatabaseException("Sequelize connection not exists.");

  await sequelize.close();
  sequelize = null;
};

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
  models: [`${__dirname}/models/*.ts`],
};

const conn: SequelizeOptions = {
  dialect: env.dbDialect as Dialect,
  host: env.dbHost,
  database: env.dbName,
  username: env.dbUser,
  password: env.dbPassword,
  port: env.dbPort,
  models: [`${__dirname}/models`],
};

let sequelize: Sequelize;

export const initSequelize = async (): Promise<Sequelize> => {
  const connection = env.isTest ? connTest : conn;

  sequelize = new Sequelize(connection);
  try {
    await sequelize.authenticate();
    console.log(
      `\n Connection has been established successfully with database: ${sequelize.config.database}. \n`
    );
  } catch (error: any) {
    console.error(`\n Unable to connect to the database: ${error.message} \n`);
  }

  return sequelize;
};

export const closeDatabase = async (): Promise<void> => {
  if (!sequelize)
    throw new DatabaseException("Sequelize connection not exists.");
  await sequelize.close();
};

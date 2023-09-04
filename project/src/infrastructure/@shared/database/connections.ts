import { env } from "../../../@shared/configs/env";

const connTest = {
  dialect: "sqlite",
  storage: ":memory:",
  logging: false,
  sync: { force: true },
};

/*
// const connTest = {
//   dialect: env.dbTestDialect,
//   host: env.dbTestHost,
//   database: env.dbTestName,
//   username: env.dbTestUser,
//   password: env.dbTestPassword,
//   port: env.dbTestPort,
//   logging: false,
//   models: [`${__dirname}/models`],
// };
*/

const conn = {
  dialect: env.dbDialect,
  host: env.dbHost,
  database: env.dbName,
  username: env.dbUser,
  password: env.dbPassword,
  port: env.dbPort,
  logging: false,
  models: [`${__dirname}/models`],
};

export const connection = env.isTest ? connTest : conn;

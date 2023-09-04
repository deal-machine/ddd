import "dotenv/config";

export const env = {
  isTest: process.env.NODE_ENV == "test",

  dbHost: String(process.env.POSTGRES_HOST),
  dbPort: Number(process.env.POSTGRES_PORT),
  dbName: String(process.env.POSTGRES_DATABASE),
  dbUser: String(process.env.POSTGRES_USERNAME),
  dbPassword: String(process.env.POSTGRES_PASSWORD),
  dbDialect: String(process.env.POSTGRES_DIALECT),

  // dbTestHost: String(process.env.POSTGRES_HOST_TEST),
  // dbTestPort: Number(process.env.POSTGRES_PORT_TEST),
  // dbTestName: String(process.env.POSTGRES_DATABASE_TEST),
  // dbTestUser: String(process.env.POSTGRES_USERNAME_TEST),
  // dbTestPassword: String(process.env.POSTGRES_PASSWORD_TEST),
  // dbTestDialect: String(process.env.POSTGRES_DIALECT_TEST),
};

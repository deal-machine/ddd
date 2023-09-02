import {
  initSequelize,
  closeDatabase,
  getInstance,
} from "./instance/sequelize-instance";
import { connection } from "../connections";
import { SequelizeOptions } from "sequelize-typescript";

const initDatabase = () => initSequelize(connection as SequelizeOptions);

export { initDatabase, closeDatabase, getInstance };

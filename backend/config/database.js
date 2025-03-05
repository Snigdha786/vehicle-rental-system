import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const {DB_HOST:host, DB_NAME:database, DB_USER:username, DB_PASSWORD:password}=process.env;

const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
  logging: false,
});

export default sequelize;

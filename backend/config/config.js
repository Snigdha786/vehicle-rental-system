import dotenv from "dotenv";

dotenv.config(); 
const {DB_HOST:host, DB_NAME:database, DB_USER:username, DB_PASSWORD:password}=process.env;

export default {
  development: {
    username,
    password,
    database,
    host,
    dialect: "mysql",
    logging: false
  }
};

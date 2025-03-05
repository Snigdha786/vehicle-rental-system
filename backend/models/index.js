"use strict";

import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";
import process from "process";
import { dirname } from "path";
import { fileURLToPath } from "url";
import configData from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);

const env = process.env.NODE_ENV || "development";
const config = configData[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load models dynamically (ESM compatible)
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => file !== basename && file.endsWith(".js") && !file.endsWith(".test.js"));

for (const file of modelFiles) {
  const { default: model } = await import(path.join(__dirname, file));
  db[model.name] = model(sequelize, Sequelize.DataTypes);
}

// Associate models if needed
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

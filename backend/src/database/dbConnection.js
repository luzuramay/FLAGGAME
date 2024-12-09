"use strict";

const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME || "dbflaggame",   
  process.env.DB_USER || "root",    
  process.env.DB_PASS || "",    
  {
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false, // Desabilita logs de queries
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };

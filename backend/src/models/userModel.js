"use strict";

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/dbConnection");

const Users = sequelize.define("Users", {
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true, // Cria automaticamente createdAt e updatedAt
});

module.exports = Users;

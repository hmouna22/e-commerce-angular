const { DataTypes } = require("sequelize");
const sequelize = require("./index.js");

const Promotion = sequelize.define(
  "Promotion",
  {
    promotion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    promotion_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    tableName: "promotions",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Promotion;

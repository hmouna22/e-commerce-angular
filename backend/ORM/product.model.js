const { DataTypes } = require("sequelize");
const sequelize = require("../ORM/index.js");
const Category = require("./category.model.js");
const Promotion = require("./promotion.model.js");

const Product = sequelize.define(
  "product",
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

//Associations
Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsToMany(Promotion, {
  through: "product_promotions",
  foreignKey: "product_id",
  otherKey: "promotion_id",
});
Promotion.belongsToMany(Product, {
  through: "product_promotions",
  foreignKey: "promotion_id",
  otherKey: "product_id",
});

module.exports = Product;

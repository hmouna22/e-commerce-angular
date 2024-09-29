const { DataTypes } = require('sequelize');
const sequelize = require('../ORM/index.js');
const Product = require('./product.model.js');

const Category = sequelize.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    category_name: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Associations
//Category.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = Category;

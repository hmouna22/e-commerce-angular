const { DataTypes } = require("sequelize");
const sequelize = require("../ORM/index.js");

const User = sequelize.define(
  "user",
  { user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
    
  user_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone:{
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ""
  },
  role: {
    type: DataTypes.ENUM,
    values: ["customer", "admin"],
    allowNull: false,
    defaultValue: "customer",
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  address:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  zip_code:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  },
  state:{
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ""
  }
},


  {
    timestamps: true, // Enable timestamps
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = User;

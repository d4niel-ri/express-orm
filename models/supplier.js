'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Supplier.belongsToMany(models.Category, { through: models.Supplier_Category, foreignKey: "supplierId" });
    }
  }
  Supplier.init({
    supplier_name: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING, 
    },
    contact_phone: {
      allowNull: false,
      type: DataTypes.STRING, 
    },
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};
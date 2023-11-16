'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Category.belongsToMany(models.Supplier, { through: models.Supplier_Category, foreignKey: "categoryId" });
      Category.hasMany(models.Product, {
        // as: 'products',
        foreignKey: {
          name: 'categoryId'
        }
      })
    }
  }
  Category.init({
    category_name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};
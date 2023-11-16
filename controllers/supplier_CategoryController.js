const Joi = require("joi");
const { Op } = require("sequelize");

const { Supplier, Category, Supplier_Category } = require("../models");
const { handleServerError, handleClientError } = require("../utils/handleError");

exports.createSupplier_Category = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      supplierId: Joi.number().required(),
      categoryId: Joi.number().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const supplierFound = await Supplier.findByPk(newData.supplierId, { include: Category });
    if (!supplierFound) return handleClientError(res, 404, "Supplier Not Found");

    const categoryFound = await Category.findByPk(newData.categoryId);
    if (!categoryFound) return handleClientError(res, 404, "Category Not Found");

    const existSupplier_Category = await Supplier_Category.findOne({ where: 
      {supplierId: newData.supplierId, categoryId: newData.categoryId} 
    });
    if (existSupplier_Category) 
      return handleClientError(res, 400, "This supplier_category already exist");

    await Supplier_Category.create(newData);
    await supplierFound.reload();
    return res.status(201).json({ data: supplierFound, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.deleteSupplier_Category = async (req, res) => {
  try {
    const newData = req.body;

    const scheme = Joi.object({
      supplierId: Joi.number().required(),
      categoryId: Joi.number().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }
    
    const supplier_categoryFound = await Supplier_Category.findOne({ where: 
      {supplierId: newData.supplierId, categoryId: newData.categoryId} 
    });
    if (!supplier_categoryFound) return handleClientError(res, 404, "Supplier_category Not Found");

    await Supplier_Category.destroy({ where: 
      {supplierId: newData.supplierId, categoryId: newData.categoryId} 
    });

    const supplier = await Supplier.findByPk(newData.supplierId, { include: Category });
    return res.status(200).json({ data: supplier, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}
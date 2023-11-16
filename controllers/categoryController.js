const Joi = require("joi");
const { Op } = require("sequelize");

const { Supplier, Category, Product, Supplier_Category } = require("../models");
const { handleServerError, handleClientError } = require("../utils/handleError");

exports.getCategory = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const parsedId = parseInt(id, 10);
      const categoryFound = await Category.findOne({ where: {id: parsedId}, include: [ Supplier, 'Products' ] });
      if (!categoryFound) {
        return handleClientError(res, 404, "Category Not Found");
      }
      return res.status(200).json({ data: categoryFound, status: 'Success' });
    
    } else {
      const response = await Category.findAll();
      return res.status(200).json({ data: response, status: 'Success' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.createCategory = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      category_name: Joi.string().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const existCategory = await Category.findOne({ where: { category_name: newData.category_name } });
    if (existCategory) {
      return handleClientError(res, 400, "Category with this name already existed");
    }

    const categoryCreated = await Category.create(newData);
    res.status(201).json({ data: categoryCreated.toJSON(), status: 'Success' })

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const dataReq = req.body;
    const scheme = Joi.object({
      category_name: Joi.string().required(),
    });

    const { error } = scheme.validate(dataReq);
    if (error) return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    const categoryFound = await Category.findByPk(id, {include: Supplier});
    if (!categoryFound) {
      return handleClientError(res, 404, "Category Not Found");
    }

    const existCategory = await Category.findOne({ where: {
      category_name: dataReq.category_name,
      id: { [Op.ne]: id }
    }});
    if (existCategory) return handleClientError(res, 400, "Category with this name already existed");
  
    categoryFound.category_name = dataReq.category_name;
    await categoryFound.save();

    res.status(200).json({ data: categoryFound.toJSON(), status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    const categoryFound = await Category.findByPk(parsedId);
    if (!categoryFound) {
      return handleClientError(res, 404, "Category Not Found");
    }

    const existProduct = await Product.findOne({ where: { categoryId: parsedId } });
    if (existProduct) {
      return handleClientError(res, 400, "Some products with this category exist");
    }

    const existSupplierCategory = await Supplier_Category.findOne({ where: {categoryId: parsedId} });
    if (existSupplierCategory) {
      return handleClientError(res, 400, "Some suppliers with this category exist");
    }

    await Category.destroy({ where: {id: parsedId} });

    const response = await Category.findAll();
    return res.status(200).json({ data: response, status: 'Success' });
  
  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}
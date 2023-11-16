const Joi = require("joi");
const { Op } = require("sequelize");

const { Supplier, Category, Product } = require("../models");
const { handleServerError, handleClientError } = require("../utils/handleError");

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const parsedId = parseInt(id, 10);
      const productFound = await Product.findByPk(parsedId, {include: "productCategory"});
      if (!productFound) {
        return handleClientError(res, 404, "Product Not Found");
      }
      return res.status(200).json({ data: productFound, status: 'Success' });
    
    } else {
      const response = await Product.findAll({ include: "productCategory" });
      return res.status(200).json({ data: response, status: 'Success' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.createProduct = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      name: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      quantity_in_stock: Joi.number(),
      categoryId: Joi.number().required()
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const existProduct = await Product.findOne({ where: { name: newData.name } });
    if (existProduct) {
      return handleClientError(res, 400, "Product with this name already existed");
    }

    const category = await Category.findByPk(newData.categoryId);
    if (!category) {
      return handleClientError(res, 404, "Category not found");
    }

    // Create the product with the provided data
    const createdProduct = await Product.create(newData);
    await createdProduct.setProductCategory(category);

    const reloadedProduct = await Product.findByPk(createdProduct.id, {include: "productCategory"});
    return res.status(201).json({ data: reloadedProduct, status: 'Success' });

  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const dataReq = req.body;
    const scheme = Joi.object({
      name: Joi.string(),
      description: Joi.string(),
      price: Joi.number(),
      categoryId: Joi.number()
    });
    
    const { error } = scheme.validate(dataReq);
    if (error) 
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    
    const parsedId = parseInt(id, 10);
    const productFound = await Product.findByPk(parsedId, {include: "productCategory"});
    if (!productFound) return handleClientError(res, 404, "Product Not Found");

    if (dataReq.name) {
      const existProduct = await Product.findOne({ where: { 
        name: dataReq.name, 
        id: { [Op.ne]: parsedId } 
      }});
      if (existProduct) return handleClientError(res, 400, "Product with this name already existed");
      
      productFound.name = dataReq.name;
    }

    if (dataReq.description) productFound.description = dataReq.description;
    if (dataReq.price) productFound.price = dataReq.price; 

    if (dataReq.categoryId) {
      const category = await Category.findByPk(dataReq.categoryId);
      if (!category) return handleClientError(res, 404, "Category not found");
      
      await productFound.setProductCategory(category);
    }

    await productFound.save();
    await productFound.reload();

    res.status(200).json({ data: productFound.toJSON(), status: 'Success' });

  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    const productFound = await Product.findByPk(parsedId);
    if (!productFound) return handleClientError(res, 404, "Product Not Found");

    await Product.destroy({ where: {id: parsedId} });
    const response = await Product.findAll();
    return res.status(200).json({ data: response, status: 'Success' });

  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}
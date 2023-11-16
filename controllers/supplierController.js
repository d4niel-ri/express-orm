const Joi = require("joi");
const { Op } = require("sequelize");

const { Supplier, Category, Supplier_Category, sequelize } = require("../models");
const { handleServerError, handleClientError } = require("../utils/handleError");

exports.getSupplier = async (req, res) => {
  try {
    const { id } = req.query;
    if (id) {
      const parsedId = parseInt(id, 10);
      const supplierFound = await Supplier.findOne({ where: {id: parsedId}, include: Category });
      if (!supplierFound) {
        return handleClientError(res, 404, "Supplier Not Found");
      }
      return res.status(200).json({ data: supplierFound, status: 'Success' });

    } else {
      const response = await Supplier.findAll();
      return res.status(200).json({ data: response, status: 'Success' });
    }
  } catch (error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.createSupplier = async (req, res) => {
  try {
    const newData = req.body;
    const scheme = Joi.object({
      supplier_name: Joi.string().required(),
      contact_phone: Joi.string().pattern(/^[0-9]+$/).required(),
      category_ids: Joi.array().items(Joi.number().integer()).min(1).unique().required(),
    });

    const { error } = scheme.validate(newData);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const supplier = await Supplier.findOne({ where: { supplier_name: newData.supplier_name } });
    if (supplier) {
      return handleClientError(res, 400, "Supplier with this name already existed");
    }

    let existingCategories;
    if (newData.category_ids.length > 0) {
      // Convert the string (number) into number
      newData.category_ids.forEach((el, idx) => newData.category_ids[idx] = parseInt(el, 10));

      existingCategories = await Category.findAll({ where: { id: newData.category_ids } });
      if (existingCategories.length !== newData.category_ids.length) {
        return handleClientError(res, 400, "Some category ids not exist");
      }
    }

    await sequelize.transaction(async(t) => {
      const supplierCreated = await Supplier.create(newData, {transaction: t});

      // Associate the supplier with categories
      if (existingCategories && existingCategories.length > 0) {
        await supplierCreated.addCategories(existingCategories, {transaction: t});
      }

      // Reload the supplier to get the associated categories in the response
      const reloadedSupplier = await Supplier.findOne({
        where: { id: supplierCreated.id },
        include: Category,
        transaction: t
      });

      res.status(201).json({ data: reloadedSupplier.toJSON(), status: 'Success' });
    })

  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const dataReq = req.body;
    const scheme = Joi.object({
      supplier_name: Joi.string(),
      contact_phone: Joi.string().pattern(/^[0-9]+$/),
      category_ids: Joi.array().items(Joi.number().integer()).min(1).unique(),
    });
    const { error } = scheme.validate(dataReq);
    if (error) {
      return res.status(400).json({ status: 'Validation Failed', message: error.details[0].message })
    }

    const parsedId = parseInt(id, 10);
    const supplierFound = await Supplier.findByPk(parsedId, {include: Category});
    if (!supplierFound) {
      return handleClientError(res, 404, "Supplier Not Found");
    }

    let existingCategories;
    if (dataReq.category_ids) {
      // Convert the string (number) into number
      dataReq.category_ids.forEach((el, idx) => dataReq.category_ids[idx] = parseInt(el, 10));

      existingCategories = await Category.findAll({ where: { id: dataReq.category_ids } });
      if (existingCategories.length !== dataReq.category_ids.length) {
        return handleClientError(res, 400, "Some category ids not exist");
      }
    }

    if (dataReq.supplier_name) {
      const existingSupplier = await Supplier.findOne({ where: { 
        supplier_name: dataReq.supplier_name,
        id: { [Op.ne]: parsedId }
      }});
      if (existingSupplier) {
        return handleClientError(res, 400, "Supplier with this name already existed");
      }

      supplierFound.supplier_name = dataReq.supplier_name;
    }

    if (dataReq.contact_phone) {
      supplierFound.contact_phone = dataReq.contact_phone;
    }

    await sequelize.transaction(async(t) => {
      // Use Sequelize association methods to manage relationships
      if (dataReq.category_ids) {
        const newCategoryIds = dataReq.category_ids.map(id => parseInt(id, 10));
        await supplierFound.setCategories(newCategoryIds, {transaction: t});
      }

      await supplierFound.save({ transaction: t });
      await supplierFound.reload({ transaction: t });

      res.status(200).json({ data: supplierFound.toJSON(), status: 'Success' });
    })
  
  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}

exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;

    const parsedId = parseInt(id, 10);
    const supplierFound = await Supplier.findByPk(parsedId);
    if (!supplierFound) {
      return handleClientError(res, 404, "Supplier Not Found");
    }

    await sequelize.transaction(async(t) => {
      await Supplier_Category.destroy({ where: {supplierId: parsedId}, transaction: t });
      await Supplier.destroy({ where: {id: parsedId}, transaction: t });

      const response = await Supplier.findAll({ transaction: t });
      return res.status(200).json({ data: response, status: 'Success' });
    })

  } catch(error) {
    console.error(error);
    handleServerError(res);
  }
}
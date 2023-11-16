const express = require('express');
const { createSupplier_Category, deleteSupplier_Category } = require('../controllers/supplier_CategoryController');

const router = express.Router();

router.post("/", createSupplier_Category);
router.delete("/", deleteSupplier_Category);

module.exports = router;
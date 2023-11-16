const express = require('express');

const supplierRoute = require('./supplierRoute');
const categoryRoute = require('./categoryRoute');
const productRoute = require('./productRoute');
const supplier_CategoryRoute = require('./supplier_CategoryRoute');

const router = express.Router();

router.use('/supplier', supplierRoute);
router.use('/category', categoryRoute);
router.use('/product', productRoute);
router.use('/supplier-category', supplier_CategoryRoute);

module.exports = router;
const express = require('express');
const { getSupplier, createSupplier, updateSupplier, deleteSupplier } = require('../controllers/supplierController');

const router = express.Router();

router.get("/", getSupplier);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);

module.exports = router;
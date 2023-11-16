const express = require('express');
const { getCategory, createCategory, deleteCategory, updateCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get("/", getCategory);
router.post("/", createCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;
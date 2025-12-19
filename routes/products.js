const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const auth = require('../middleware/auth');

// GET /api/products (public)
router.get('/', getAllProducts);

// GET /api/products/:id (public)
router.get('/:id', getProductById);

// POST /api/products
router.post('/', createProduct);

// PUT /api/products/:id (protected)
router.put('/:id', auth, updateProduct);

// DELETE /api/products/:id (protected)
router.delete('/:id', auth, deleteProduct);

module.exports = router;
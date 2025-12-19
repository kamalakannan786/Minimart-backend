const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category && category !== 'All') {
      query.category = category;
    }
    
    const products = await Product.find(query).sort({ createdAt: -1 });
    res.json({ products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category, emoji, description, stock } = req.body;

    const categoryEmojis = {
      'Dairy': '🥛',
      'Bakery': '🍞',
      'Fruits': '🍎',
      'Grains': '🍚',
      'Vegetables': '🥬'
    };

    const newProduct = new Product({
      name,
      price: parseInt(price),
      category,
      emoji: emoji || categoryEmojis[category] || '📦',
      description: description || `Fresh ${name.toLowerCase()} from our store`,
      stock: parseInt(stock)
    });
    
    await newProduct.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const product = await Product.findByIdAndUpdate(id, updateData, { 
      new: true, 
      runValidators: true 
    });
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
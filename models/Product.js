const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Dairy', 'Bakery', 'Fruits', 'Grains', 'Vegetables']
  },
  emoji: {
    type: String,
    default: '📦'
  },
  description: {
    type: String,
    trim: true
  },
  stock: {
    type: Number,
    required: [true, 'Stock is required'],
    min: [0, 'Stock cannot be negative']
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);
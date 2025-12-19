require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const Product = require('./models/Product');
const app = express();

// Connect to MongoDB and seed data
connectDB().then(async () => {
  // Check if products exist, if not seed them
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const products = [
      { name: 'Fresh Milk', price: 65, category: 'Dairy', emoji: '🥛', description: 'Pure and fresh milk from local farms', stock: 50 },
      { name: 'Whole Wheat Bread', price: 35, category: 'Bakery', emoji: '🍞', description: 'Freshly baked whole wheat bread', stock: 30 },
      { name: 'Farm Fresh Eggs', price: 120, category: 'Dairy', emoji: '🥚', description: 'Free-range eggs from happy hens', stock: 100 },
      { name: 'Red Apples', price: 80, category: 'Fruits', emoji: '🍎', description: 'Crisp and sweet red apples', stock: 40 },
      { name: 'Bananas', price: 40, category: 'Fruits', emoji: '🍌', description: 'Ripe yellow bananas', stock: 60 },
      { name: 'Basmati Rice', price: 150, category: 'Grains', emoji: '🍚', description: 'Premium quality basmati rice', stock: 25 },
      { name: 'Fresh Tomatoes', price: 60, category: 'Vegetables', emoji: '🍅', description: 'Juicy red tomatoes', stock: 45 },
      { name: 'Green Spinach', price: 25, category: 'Vegetables', emoji: '🥬', description: 'Fresh leafy green spinach', stock: 35 }
    ];
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  }
});

// Middleware
app.use(cors({
  origin: '*',
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MiniMart API is running' });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!', timestamp: new Date() });
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
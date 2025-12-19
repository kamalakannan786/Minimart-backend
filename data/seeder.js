require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    
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
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

const runSeeder = async () => {
  await connectDB();
  await seedProducts();
};

runSeeder();
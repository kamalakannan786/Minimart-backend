const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById } = require('../controllers/userController');
const auth = require('../middleware/auth');

// GET /api/users
router.get('/', auth, getAllUsers);

// GET /api/users/:id
router.get('/:id', auth, getUserById);

module.exports = router;
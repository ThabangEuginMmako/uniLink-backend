const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships, getInternshipById } = require('../controllers/internshipController');
const verifyBusinessToken = require('../middleware/businessAuth');

// 🔒 Authenticated businesses can post internships
router.post('/', verifyBusinessToken, createInternship);

// 🟢 Public access to view all internships
router.get('/', getAllInternships);

// 🌐 Public access to a single internship by ID
router.get('/:id', getInternshipById);

module.exports = router;


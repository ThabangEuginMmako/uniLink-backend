const express = require('express');
const router = express.Router();
const { createInternship, getAllInternships } = require('../controllers/internshipController');
const businessAuth = require('../middleware/businessAuth');

// 🟢 Authenticated businesses can post internships
router.post('/', businessAuth, createInternship);

// 🟢 Public access to view all internships
router.get('/', getAllInternships);

module.exports = router;


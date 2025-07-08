const express = require('express');
const router = express.Router();
const { createInternship } = require('../controllers/internshipController');
const businessAuth = require('../middleware/businessAuth');


router.post('/', businessAuth, createInternship);


module.exports = router;

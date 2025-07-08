const express = require('express');
const router = express.Router();
const { registerBusiness, loginBusiness } = require('../controllers/businessAuthController');

router.post('/register', registerBusiness);
router.post('/login', loginBusiness);

module.exports = router;

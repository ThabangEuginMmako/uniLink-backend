const express = require('express');
const router = express.Router();
const { registerStudent, loginStudent } = require('../controllers/authController');

router.post('/register', registerStudent);
router.post('/login', loginStudent);

module.exports = router;


// const express = require('express');
// const router = express.Router();

// router.post('/register', (req, res) => {
//   console.log('🔥 /api/auth/register route is alive!');
//   res.send('✅ Route is responding');
// });

// module.exports = router;

const express = require('express');
const { registerAdmin, loginAdmin, getUserDetails } = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/users', protect, getUserDetails);

module.exports = router;

const express = require('express');
const { protect } = require('../middlewares/authMiddleware');
const { createService, getUserServices } = require('../controllers/serviceController');
const router = express.Router();

router.post('/postDetails', protect, createService);
router.get('/getDetails', protect, getUserServices);

module.exports = router;
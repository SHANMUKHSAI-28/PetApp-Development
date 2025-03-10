const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/create', auth, orderController.createOrder);
router.post('/verify', auth, orderController.verifyPayment);
router.get('/my-orders', auth, orderController.getOrders);

module.exports = router; 
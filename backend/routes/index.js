const express = require('express');
const router = express.Router();

const authRoutes = require('./auth');
const petRoutes = require('./pets');
const orderRoutes = require('./orders');
const serviceRoutes = require('./services');
const reviewRoutes = require('./reviews');
const userRoutes = require('./users');

router.use('/auth', authRoutes);
router.use('/pets', petRoutes);
router.use('/orders', orderRoutes);
router.use('/services', serviceRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

module.exports = router; 
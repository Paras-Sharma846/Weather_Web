const express = require('express');
const router = express.Router();
const citiesRoutes = require('./cities');
const userRoutes = require('./users');

router.use('/cities', citiesRoutes);
router.use('/users', userRoutes);

module.exports = router;

const express = require('express');
const router = express.Router();
const citiesRoutes = require('./cities');

// Mount cities routes at `/api/cities`
router.use('/cities', citiesRoutes);

module.exports = router;

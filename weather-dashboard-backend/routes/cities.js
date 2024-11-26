const express = require('express');
const router = express.Router();
const  { getCities, addCities, deleteCities } = require('../controllers/cities');

// Get all cities
router.get('/',getCities );
// Add a new city
router.post('/',addCities)
// Delete a city
router.delete('/:id', deleteCities)


module.exports = router;

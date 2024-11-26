const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  currentTemperature: Number,
  weatherCondition: String,
  highTemperature: Number,
  lowTemperature: Number,
  forecast: [
    { day: String, high: Number, low: Number }
  ]
});

module.exports = mongoose.model('City', CitySchema);

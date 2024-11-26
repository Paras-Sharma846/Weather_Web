const City = require("../models/city");
const mockData = require("../config/mock");

const getCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add a new city
const addCities = async (req, res) => {
    const {
      name,
      currentTemperature,
      weatherCondition,
      highTemperature,
      lowTemperature,
      forecast,
    } = req.body;
  
    if (
      !name ||
      !currentTemperature ||
      !weatherCondition ||
      !highTemperature ||
      !lowTemperature ||
      !forecast
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Check if the city already exists in the database
    try {
      const existingCity = await City.findOne({ name: name });
  
      if (existingCity) {
        // If city already exists, send a response with an error message
        return res.status(400).json({ message: "This city is already added" });
      }
  
      // If city does not exist, create a new city
      const city = new City(req.body);
      const newCity = await city.save();
      console.log(newCity, "new city added");
  
      res.status(201).json(newCity);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };
  

// Delete a city
const deleteCities = async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.json({ message: "City deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const seedDatabase = async () => {
  try {
    const cityCount = await City.find();

    if (cityCount === 0) {
      console.log("Seeding the database...");
      await City.insertMany(mockData);
      console.log("Database seeded with mock data.");
    } else {
      console.log("Database already has sufficient data.");
    }
  } catch (error) {
    console.error("Error seeding the database:", error.message);
  }
};

module.exports = {
  getCities,
  addCities,
  deleteCities,
  seedDatabase,
  mockData,
};

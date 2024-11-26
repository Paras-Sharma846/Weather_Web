import React, { useState, useEffect } from 'react';
import '../App.css';
import CityCard from '../components/CityCard';
import SearchBar from '../components/SearchBar';
import { fetchCities, addCity, deleteCity } from '../api';

const App = () => {
  const [cities, setCities] = useState([]);

  // Fetch cities from backend
  useEffect(() => {
    fetchCities()
    .then((res) => setCities(res.data)) 
    .catch((err) => console.error('Error fetching cities:', err));
}, []);

  // Add a new city
  const handleAddCity = (cityName) => {
    const cityExists = cities.some((city) => city.name.toLowerCase() === cityName.toLowerCase());

    if (cityExists) {
      alert("This city is already added!");
      return
    }

    const weatherConditions = ['Sunny', 'Cloudy', 'Rainy', 'Snowy'];
    const randomCondition = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
  
    const newCity = {
      name: cityName,
      currentTemperature: Math.floor(Math.random() * 30) + 10,
      weatherCondition: randomCondition,
      highTemperature: Math.floor(Math.random() * 30) + 15,
      lowTemperature: Math.floor(Math.random() * 15) + 5,
      forecast: [
        { day: 'Day 1', high: Math.floor(Math.random() * 30) + 20, low: Math.floor(Math.random() * 15) + 10 },
        { day: 'Day 2', high: Math.floor(Math.random() * 30) + 20, low: Math.floor(Math.random() * 15) + 10 },
        { day: 'Day 3', high: Math.floor(Math.random() * 30) + 20, low: Math.floor(Math.random() * 15) + 10 }
      ]
    };

    addCity(newCity)
      .then((res) => setCities([...cities, res.data])) 
      .catch((err) => console.error('Error adding city:', err));
  };

  // Remove a city
  const handleDeleteCity = (id) => {
    deleteCity(id)
      .then(() => setCities(cities.filter((city) => city._id !== id))) 
      .catch((err) => console.error('Error deleting city:', err));
  };
  return (
    <div>
    <h1 className='weather-head'>Weather Dashboard</h1>
    <SearchBar  onSearch={handleAddCity} />
    <div className="city-list">
      {cities.map((city) => (
        <CityCard key={city._id} city={city} onDelete={handleDeleteCity} />
      ))}
    </div>
  </div>
);
};

export default App;

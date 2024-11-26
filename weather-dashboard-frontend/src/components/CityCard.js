import React from 'react';
import Graph from './Graph';
import WeatherIcon from './WeatherIcon';

const CityCard = ({ city, onDelete }) => (
  <div className="city-card">
    <h2>{city.name}</h2>

    {/* Weather Icon based on condition */}
    <WeatherIcon condition={city.weatherCondition} />

    <p>Current Temperature: {city.currentTemperature}°C</p>
    <p>Condition: {city.weatherCondition}</p>
    <p>
      High: {city.highTemperature}°C, Low: {city.lowTemperature}°C
    </p>

    {/* Bar Graph of the 3-day forecast */}
    <Graph forecast={city.forecast} />

    <button onClick={() => onDelete(city._id)}>Remove</button>
  </div>
);

export default CityCard;

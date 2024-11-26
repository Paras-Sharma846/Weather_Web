// WeatherIcon.js
import React from 'react';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake } from 'react-icons/fa';

const WeatherIcon = ({ condition }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <FaSun size={40} color="#FF9900" />;
    case 'cloudy':
      return <FaCloud size={40} color="#B0C4DE" />;
    case 'rainy':
      return <FaCloudRain size={40} color="#4682B4" />;
    case 'snowy':
      return <FaSnowflake size={40} color="#00BFFF" />;
    default:
      return <FaCloud size={40} color="#B0C4DE" />;
  }
};

export default WeatherIcon;

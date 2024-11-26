import React, { useState } from 'react';

const SearchBar = ({ onSearch, cities = [] }) => {
    const [cityName, setCityName] = useState('');
  
    const handleSearch = () => {
      if (cityName.trim()) {
        const cityExists = cities.some((city) => city.name.toLowerCase() === cityName.toLowerCase()); // to check if city allready exists
  
        if (cityExists) {
          alert("This city is already added!");
        } else {
          onSearch(cityName);
        }
      }
      setCityName('');
    };
  
    return (
      <div className='add-button'>
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Add a city"
        />
        <button onClick={handleSearch}>Add</button>
      </div>
    );
  };
  
  

export default SearchBar;

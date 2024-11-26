import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/cities';

export const fetchCities = async () => await axios.get(API_BASE_URL); // fetch data
export const addCity = async (city) => await axios.post(API_BASE_URL, city); // post data
export const deleteCity = async (id) => await axios.delete(`${API_BASE_URL}/${id}`); // delete data

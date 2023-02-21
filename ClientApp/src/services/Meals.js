import axios from 'axios';

export const getMeals = () => axios.get(`https://localhost:7239/api/meals`);
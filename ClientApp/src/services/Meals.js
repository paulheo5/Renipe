import axios from 'axios';

const baseurl = `https://localhost:7239/api/meals`

export const getMeals = () => axios.get(baseurl);
export const getMealById = (id) => axios.get(baseurl + `${id}`)
export const trackMeal = (meal) => axios.post(baseurl, meal)
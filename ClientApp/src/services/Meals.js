import axios from 'axios';

const baseurl = `https://localhost:7239/api/meals`

export const getMeals = () => axios.get(baseurl);
export const getMealById = (id) => axios.get(baseurl + `${id}`)
export const trackMeal = (meal) => axios.post(baseurl, meal)
export const updateMeal = (id, meal, token) => axios.put(baseurl+`/${id}`, meal, {
    headers: {
        Authorization: token
    }
})
export const deleteMeal = (id) => axios.delete(baseurl + `/${id}`)
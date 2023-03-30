import axios from 'axios';

const baseurl = `https://localhost:7239/api/meals`

export const getMeals = (token) => axios.get(baseurl, {
    headers: {
        Authorization: token
    }
});
export const getMealById = (id, token) => axios.get(baseurl + `${id}`, {
    headers: {
        Authorization: token
    }
});
export const trackMeal = (meal, token) => axios.post(baseurl, meal, {
    headers: {
        Authorization: token
    }
});
export const updateMeal = (id, meal, token) => axios.put(baseurl+`/${id}`, meal, {
    headers: {
        Authorization: token
    }
});
export const deleteMeal = (id, token) => axios.delete(baseurl + `/${id}`, {
    headers: {
        Authorization: token
    }
});
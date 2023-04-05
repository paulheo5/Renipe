import axios from 'axios';

const baseurl = `https://localhost:7239/api/SavedRecipes`

export const getRecipe = (token) => axios.get(baseurl, {
    headers: {
        Authorization: token
    }
});
export const getRecipeById = (id, token) => axios.get(baseurl + `${id}`, {
    headers: {
        Authorization: token
    }
});
export const trackRecipe = (recipe, token) => axios.post(baseurl, recipe, {
    headers: {
        Authorization: token
    }
});
export const updateRecipe = (id, recipe, token) => axios.put(baseurl + `/${id}`, recipe, {
    headers: {
        Authorization: token
    }
});
export const deleteRecipe = (id, token) => axios.delete(baseurl + `/${id}`, {
    headers: {
        Authorization: token
    }
});
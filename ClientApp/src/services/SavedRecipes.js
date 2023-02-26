import axios from 'axios';

const baseurl = `https://localhost:7239/api/SavedRecipes`

export const getRecipe = () => axios.get(baseurl);
export const getRecipeById = (id) => axios.get(baseurl + `${id}`)
export const trackRecipe = (recipe) => axios.post(baseurl, recipe)
export const updateRecipe = (id, recipe) => axios.put(baseurl + `/${id}`, recipe)
export const deleteRecipe = (id) => axios.delete(baseurl + `/${id}`)
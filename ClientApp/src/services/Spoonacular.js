import axios from "axios";

//  const apiKey = '5828cde1106e400b9469ae1a2f9732ee'
const apiKey = '36d0332aea3241798e916aa4cbd2a928'
//const apiKey = '5eb6d8fc58b34054a0122c0d074744fe'

export const searchSpoon = (searchTerm) => {
    return axios.get(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchTerm}&number=10&limitLicense=true&ranking=1&ignorePantry=false&apiKey=${apiKey}`)
}

export const recipeInfo = (recipeDetail) => {
    return axios.get(`https://api.spoonacular.com/recipes/${recipeDetail}/information?&apiKey=${apiKey}&includeNutrition=true`)
}


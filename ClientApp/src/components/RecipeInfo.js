import React from 'react'
import { useState } from 'react'
import { recipeInfo } from '../services/Spoonacular'
import SearchRecipe from '../components/SearchRecipe'

const RecipeInfo = () => {
    const [info, setInfo] = useState([]);
    const recipe = SearchRecipe();
    var id = recipe.state.id;

    const retrieveMeals = () => {
        recipeInfo()
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err.response))
    }
}


export default RecipeInfo;
import React, { useEffect } from 'react'
import { useState } from 'react'
import { recipeInfo } from '../services/Spoonacular'
import SearchRecipe from '../components/SearchRecipe'

const RecipeInfo = () => {
    const [info, setInfo] = useState([]);
    //const recipe = SearchRecipe();
    //var id = recipe.state.id;
    const recipeid = window.localStorage.getItem("id");

    const retrieveMeals = (id) => {
        recipeInfo(id).then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err.response))
    }


    useEffect(() => {
        retrieveMeals(recipeid)
    }, [])
    return (
        <div>
            {recipeid}
        </div>

        )
}


export default RecipeInfo;
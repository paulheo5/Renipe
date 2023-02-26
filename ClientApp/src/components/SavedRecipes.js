import React, { useEffect, useState } from 'react';
import { getRecipe } from '../services/SavedRecipes';
import { useNavigate } from 'react-router-dom'

const Saved = () => {
    const [recipe, setRecipe] = useState([]);



    const savedRecipe = () => {
        getRecipe().then(res => {
            setRecipe(res.data.sort)
        })
            .catch(err => console.log(err.response))
    }

    useEffect(() => {
        savedRecipe()
        console.log()
    }, [])


    return (
    <>
          {recipe.map(recipes => {
                    return (
                        <div>
                            {recipes.title }
                        </div>
                    )
          })}
        </>
        )
}
export default Saved;
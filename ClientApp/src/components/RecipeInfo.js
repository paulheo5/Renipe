import React, { useEffect } from 'react'
import { useState } from 'react'
import { recipeInfo } from '../services/Spoonacular'


const RecipeInfo = () => {
    const [info, setInfo] = useState({});
    //const recipe = SearchRecipe();
    //var id = recipe.state.id;
    const recipeid = window.localStorage.getItem("id");

    const retrieveMeals = (id) => {
        recipeInfo(id).then(res => {
            setInfo(res.data);
            console.log(res.data);
            
            })
            .catch(err => console.log(err.response))
    }


    useEffect(() => {
        retrieveMeals(recipeid)
    }, [])
    return (
        <>
            <img src={info.image }/>
        <div>
            {/*{JSON.stringify(info)}*/}
            {info.title}
            {/*{info.map(infos => {*/}
            {/*    <div>{infos.title}</div>*/}

            {/*    })}*/}
         


            </div>
        </>

        )
}


export default RecipeInfo;
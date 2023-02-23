import React from 'react'
import { useState } from 'react'
import { searchFdc } from '../services/Fdc'
import NutritionFacts from './NutritionFacts'

const AddMeal = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [results, setResults] = useState([])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }

    const search = (e) => {
        e.preventDefault()
        searchFdc(searchTerm)
        .then(res => {
            setResults(res.data.foods.map(food =>{
                return foodToNutrition(food)
            }))
        })
        .catch(err => console.log(err.response))
    }

    const foodToNutrition = (food) =>{
        const calories = 1008
        const protein = 1003
        const fat = 1004
        const carbs = 1005
        const phosphorus = 1091
        const potassium = 1092
        const sodium = 1093

        const id = food.fdcId;
        const foodName = food.description;
        let caloriesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === calories)[0]?.value) ?? -1
        const carbohydratesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === carbs)[0]?.value) ?? 0
        const proteinPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === protein)[0]?.value) ?? 0
        const fatPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === fat)[0]?.value) ?? 0
        const phosphorusPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === phosphorus)[0]?.value) ?? 0
        const potassiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === potassium)[0]?.value) ?? 0
        const sodiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === sodium)[0]?.value) ?? 0

        if(caloriesPerServing === -1){
            caloriesPerServing = Math.round((4 * carbohydratesPerServing + proteinPerServing) + (9 * fatPerServing))
        }

        return({
            "id" : id,
            "foodName" : foodName,
            "caloriesPerServing" : caloriesPerServing,
            "carbohydratesPerServing": carbohydratesPerServing,
            "proteinPerServing" : proteinPerServing,
            "fatPerServing" : fatPerServing,
            "phosphorusPerServing" : phosphorusPerServing,
            "potassiumPerServing" : potassiumPerServing,
            "sodiumPerServing" : sodiumPerServing
        })
    }

  return (
    <div>
        <form onSubmit={search}>
            <input id='search' type='search' placeholder='Meal Search' onChange={handleSearch}></input>
            <button type='submit'>Search</button>
        </form>
        <br />
        <br />
        {results.length > 0 ?
        <>
        <table className='table'>
            <thead>
            <tr style={style} className='bg-dark'>
                <th style={style} className='text-light'>Name</th>
                <th style={style} className='text-light'>Calories</th>
                <th style={style} className='text-light'>Carbohydrates</th>
                <th style={style} className='text-light'>Protein</th>
                <th style={style} className='text-light'>Fat</th>
                <th style={style} className='text-light'>Phosphorus</th>
                <th style={style} className='text-light'>Potassium</th>
                <th style={style} className='text-light'>Sodium</th>
                <th></th>
            </tr>
            </thead>
        {results.map(food =>{
            return(
                <React.Fragment key={food.id}>
                    <NutritionFacts food={food} />
                </React.Fragment>
            )
        })}
        </table>
        </>
        :<></>}
    </div>
  )

}

export default AddMeal
import React from 'react'
import { useState } from 'react'
import { searchFdc } from '../services/Fdc'
import NutritionFacts from './NutritionFacts'

const AddMeal = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [results, setResults] = useState([])

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }
    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

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

        const Id = food.fdcId;
        const FoodName = food.description;
        let CaloriesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === calories)[0]?.value) ?? -1
        const CarbohydratesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === carbs)[0]?.value) ?? 0
        const ProteinPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === protein)[0]?.value) ?? 0
        const FatPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === fat)[0]?.value) ?? 0
        const PhosphorusPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === phosphorus)[0]?.value) ?? 0
        const PotassiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === potassium)[0]?.value) ?? 0
        const SodiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === sodium)[0]?.value) ?? 0

        if(CaloriesPerServing === -1){
            CaloriesPerServing = Math.round((4 * CarbohydratesPerServing + ProteinPerServing) + (9 * FatPerServing))
        }


        return({
            "Id" : Id,
            "FoodName" : FoodName,
            "CaloriesPerServing" : CaloriesPerServing,
            "CarbohydratesPerServing": CarbohydratesPerServing,
            "ProteinPerServing" : ProteinPerServing,
            "FatPerServing" : FatPerServing,
            "PhosphorusPerServing" : PhosphorusPerServing,
            "PotassiumPerServing" : PotassiumPerServing,
            "SodiumPerServing" : SodiumPerServing
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
                <React.Fragment key={food.Id}>
                    <NutritionFacts food={food} style={style} />
                </React.Fragment>
            )
        })}
        </table>
    </div>
  )

}

export default AddMeal
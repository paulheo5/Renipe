import React from 'react'
import { useState } from 'react'
import { searchFdc } from '../services/Fdc'

const AddMeal = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [results, setResults] = useState([])

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
        {/* {JSON.stringify(results)} */}
        <br />
        <br />
        <table className='table'>
            <tr className='bg-dark'>
            <th className='text-light'>Name</th>
            <th className='text-light'>Calories</th>
            <th className='text-light'>Carbohydrates</th>
            <th className='text-light'>Protein</th>
            <th className='text-light'>Fat</th>
            <th className='text-light'>Phosphorus</th>
            <th className='text-light'>Potassium</th>
            <th className='text-light'>Sodium</th>
            </tr>
        {results.map( food =>{
            return(
                <tr>
                    <td>{food.FoodName}</td>
                    <td>{food.CaloriesPerServing}</td>
                    <td>{food.CarbohydratesPerServing}</td>
                    <td>{food.ProteinPerServing}</td>
                    <td>{food.FatPerServing}</td>
                    <td>{food.PhosphorusPerServing}</td>
                    <td>{food.PotassiumPerServing}</td>
                    <td>{food.SodiumPerServing}</td>
                    </tr>
                
            )
        })}
        </table>

    </div>
  )

}

export default AddMeal
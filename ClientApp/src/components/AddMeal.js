import React from 'react'
import { useState } from 'react'
import { searchFdc } from '../services/Fdc'
import NutritionFacts from './NutritionFacts'
import NutritionFactsTable from './NutritionFactsTable'

const AddMeal = () => {

    const [searchTerm, setSearchTerm] = useState()

    const [pageNumber, setPageNumber] = useState(1)

    const [pageList, setPageList] = useState([])

    const [results, setResults] = useState([])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    const handleSearch = (e) => {
        setSearchTerm(e.target.value)
    }


    const search = (e) => {
        e.preventDefault()
        searchFdc(searchTerm)
        .then(res => {
            setPageList(res.data.pageList)
            setResults(res.data.foods.map(food =>{
                return foodToNutrition(food)
            }))
        })
        .then(setPageNumber(1))
        .catch(err => console.log(err.response))
    }

    const changePage = (n) => {
        searchFdc(`${searchTerm}&pageNumber=${n}`)
        .then(res => {
            setPageList(res.data.pageList)
            setResults(res.data.foods.map(food =>{
                return foodToNutrition(food)
            }))
        })
        .then(setPageNumber(n))
        .catch(err => console.log(err.response))
    }

    const next = () => {
        if(pageNumber < pageList[pageList.length - 1]){
            changePage(pageNumber + 1)
        }
    }

    const prev = () => {
        if(pageNumber > 1){
            changePage(pageNumber - 1)
        }

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
        const brandOwner = `${food.brandOwner !== undefined ? food.brandOwner + ": " : ""}`;
        const foodName = `${brandOwner}${food.description}`;
        let caloriesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === calories)[0]?.value) ?? -1
        const carbohydratesPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === carbs)[0]?.value) ?? 0
        const proteinPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === protein)[0]?.value) ?? 0
        const fatPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === fat)[0]?.value) ?? 0
        const phosphorusPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === phosphorus)[0]?.value) ?? 0
        const potassiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === potassium)[0]?.value) ?? 0
        const sodiumPerServing = (food.foodNutrients.filter(nutrient => nutrient.nutrientId === sodium)[0]?.value) ?? 0
        const servingSize = (food.servingSize !== undefined) ? Math.round(food.servingSize) : ""
        const servingSizeUnit = food.servingSizeUnit ?? ""
        const fullServingSize = servingSize + servingSizeUnit
        const servingSizeHousehold = food.householdServingFullText

        const defaultMonth = `${new Date().getMonth() + 1}`
        const defaultDate = `${new Date().getDate()}`
        const defaultYear = `${new Date().getFullYear()}`

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
            "sodiumPerServing" : sodiumPerServing,
            "servingSize" : fullServingSize,
            "servingSizeUnit" : servingSizeHousehold,
            "date" : new Date(`${defaultMonth}-${defaultDate}-${defaultYear}`)
        })
    }

    const pageListElement = (<span><strong>Page: </strong>
    <button style={{"paddingLeft":"1em", "paddingRight":"1em"}} onClick={prev}>Prev</button>
    {pageList.map(item =>{
        return(<button 
            key={item} 
            style={{"paddingLeft":"1em", "paddingRight":"1em"}} 
            className={item === pageNumber ? "bg-primary text-light" : ""} 
            onClick={() => {
            const pageNumber = item;
            changePage(pageNumber)}}
            >{item}</button>)
    })}
    <button style={{"paddingLeft":"1em", "paddingRight":"1em"}} onClick={next}>Next</button>
</span>)

  return (
      <div>
        <form onSubmit={search}>
            <input id='search' className='form-control' type='search' placeholder='Meal Search' onChange={handleSearch} />
        </form>
        <br />
        <br />
        {results.length > 0 ?
        <>
        {pageListElement}
        <NutritionFactsTable meals={results} style={style} />
        {pageListElement}
        </>
        :<></>}
    </div>
  )

}

export default AddMeal
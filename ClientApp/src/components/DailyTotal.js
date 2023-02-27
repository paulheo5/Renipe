import React, {useState} from 'react'
import Meals from './Meals.js'

const DailyTotal = ({meals, setMeals, style}) => {
    const date = new Date(meals[0].date).toLocaleDateString();
    const totalCalories = meals.map(m => Math.round(m.caloriesPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalCarbohydrates = meals.map(m => Math.round(m.carbohydratesPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalProtein = meals.map(m => Math.round(m.proteinPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalFat = meals.map(m => Math.round(m.fatPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalPhosphorus = meals.map(m => Math.round(m.phosphorusPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalPotassium = meals.map(m => Math.round(m.potassiumPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalSodium = meals.map(m => Math.round(m.sodiumPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const [hide, setHide] = useState(true)

  return (
    <>
      <tr>
        <td style={style} >{date}</td>
        <td style={style} >{totalCalories}</td>
        <td style={style} >{totalCarbohydrates}</td>
        <td style={style} >{totalProtein}</td>
        <td style={style} >{totalFat}</td>
        <td style={style} className={totalPhosphorus > 800 ? "text-danger" : ""}>{totalPhosphorus}</td>
        <td style={style} className={totalPotassium > 3000 ? "text-danger" : ""} >{totalPotassium}</td>
        <td style={style} className={totalSodium > 3000 ? "text-danger" : ""}>{totalSodium}</td>
        <td><button className='btn btn-primary' onClick={() => setHide(!hide)}>Details</button></td>
      </tr>
        {!hide ?
        <tr>
          <td colSpan={9}><Meals mealsList={meals} setMealsList={setMeals} /></td>
        </tr>
        :
        <></>}
    </>
  )
}

export default DailyTotal
import React, {useState} from 'react'
import NutritionFacts from './NutritionFacts.js';
import NutritionFactsTable from './NutritionFactsTable.js';

const DailyTotal = ({meals, mealsList, setMealsList, style}) => {

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
        <td style={{...style, "width":"14em"}} >{date}</td>
        <td style={{...style, "width":"5em"}} >{totalCalories}</td>
        <td style={{...style, "width":"6em"}} >{totalCarbohydrates}</td>
        <td style={{...style, "width":"4em"}} >{totalProtein}</td>
        <td style={{...style, "width":"3em"}} >{totalFat}</td>
        <td style={{...style, "width":"7em"}} className={totalPhosphorus > 800 ? "text-danger" : ""}>{totalPhosphorus}</td>
        <td style={{...style, "width":"5em"}} className={totalPotassium > 3000 ? "text-danger" : ""} >{totalPotassium}</td>
        <td style={style} className={totalSodium > 3000 ? "text-danger" : ""}>{totalSodium}</td>
        <td><button className='btn btn-primary' onClick={() => setHide(!hide)}>Details</button></td>
      </tr>
        {!hide ?
        <tr>
          <td colSpan={9}>
            <NutritionFactsTable mealsLocal={meals} meals={mealsList} setMeals={setMealsList} totalView={true} mealView={true} style={style} />
          </td>
        </tr>
        :
        <></>}
    </>
  )
}

export default DailyTotal
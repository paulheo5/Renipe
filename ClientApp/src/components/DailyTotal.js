import React from 'react'

const DailyTotal = ({meals, style}) => {
    const date = new Date(meals[0].date).toLocaleDateString();
    const totalCalories = meals.map(m => Math.round(m.caloriesPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalCarbohydrates = meals.map(m => Math.round(m.carbohydratesPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalProtein = meals.map(m => Math.round(m.proteinPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalFat = meals.map(m => Math.round(m.fatPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalPhosphorus = meals.map(m => Math.round(m.phosphorusPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalPotassium = meals.map(m => Math.round(m.potassiumPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    const totalSodium = meals.map(m => Math.round(m.sodiumPerServing * m.servings)).reduce(((a, b) => a + b), 0)
    

  return (
    <>
        <th style={style} >{date}</th>
        <th style={style} >{totalCalories}</th>
        <th style={style} >{totalCarbohydrates}</th>
        <th style={style} >{totalProtein}</th>
        <th style={style} >{totalFat}</th>
        <th style={style} className={totalPhosphorus > 800 ? "text-danger" : ""}>{totalPhosphorus}</th>
        <th style={style} className={totalPotassium > 3000 ? "text-danger" : ""} >{totalPotassium}</th>
        <th style={style} className={totalSodium > 3000 ? "text-danger" : ""}>{totalSodium}</th>
    </>
  )
}

export default DailyTotal
import React, { useState } from 'react';
import { getMeals } from '../services/Meals';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    const retrieveMeals = () => {
        getMeals()
            .then(res => {
                setMeals(res.data)
            })
        .catch(err => console.log(err.response))
    }

    retrieveMeals();


    return (
        <>
            <table className="table">
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Serving Size</th>
                    <th>Serving Size Unit</th>
                    <th>Calories</th>
                    <th>Carbohydrates</th>
                    <th>Protein</th>
                    <th>Fat</th>
                    <th>Phosphorus</th>
                    <th>Potassium</th>
                    <th>Sodium</th>
                    <th>Servings</th>
                    <th>Date</th>
                </tr>
                {meals.map(meal => {
                    return (
                        <tr>
                            <td>{meal.mealId}</td>
                            <td>{meal.foodName}</td>
                            <td>{meal.servingSize}</td>
                            <td>{meal.servingSizeUnit}</td>
                            <td>{meal.caloriesPerServing}</td>
                            <td>{meal.carbohydratesPerServing}</td>
                            <td>{meal.proteinPerServing}</td>
                            <td>{meal.fatPerServing}</td>
                            <td>{meal.phosphorusPerServing}</td>
                            <td>{meal.potassiumPerServing}</td>
                            <td>{meal.sodiumPerServing}</td>
                            <td>{meal.servings}</td>
                            <td>{meal.date}</td>
                        </tr>
                    )
                })}
            </table>
        </>
        )

}
export default Meals
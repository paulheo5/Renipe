import React, { useEffect, useState } from 'react';
import { getMeals } from '../services/Meals';
import {Link} from 'react-router-dom';
import NutritionFacts from './NutritionFacts';

const Meals = () => {
    const [meals, setMeals] = useState([]);
    
    const retrieveMeals = () => {
        getMeals()
            .then(res => {
                setMeals(res.data.sort((a, b) => {
                    if(a.date > b.date){
                        return -1
                    }
                }))
            })
        .catch(err => console.log(err.response))
    }

    useEffect(() => {
      retrieveMeals()
    },[])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    return (
        <>
            <table className="table">
                <thead>
                <tr>
                    {/* <th style={style}>Id</th> */}
                    <th style={style}>Name</th>
                    {/* <th style={style}>Serving Size</th>
                    <th style={style}>Serving Size Unit</th> */}
                    <th style={style}>Calories</th>
                    <th style={style}>Carbohydrates</th>
                    <th style={style}>Protein</th>
                    <th style={style}>Fat</th>
                    <th style={style}>Phosphorus</th>
                    <th style={style}>Potassium</th>
                    <th style={style}>Sodium</th>
                    <th style={style}>Serving Size</th>
                    <th style={style}>Serving Unit</th>
                    <th style={style}>Servings</th>
                    <th style={style}>Date</th>
                    <th style={style}></th>
                </tr>
                </thead>
                {meals.map(meal => {
                    return (
                        <React.Fragment key={meal.mealId}>
                        {/* <tr key={meal.mealId}>
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
                            <td>
                                <button className="bg-danger text-light">Delete</button>
                                <button style={{"marginLeft":"1em"}} className="bg-warning text-dark">Edit</button>
                            </td>
                        </tr> */}
                        <NutritionFacts food={meal} mealView={true} style={style} meals={meals} setMeals={setMeals} />
                        </React.Fragment>
                    )
                })}
            </table>
            <Link to='/AddMeal'><button className='btn btn-success'>Create</button></Link>
        </>
        )

}
export default Meals
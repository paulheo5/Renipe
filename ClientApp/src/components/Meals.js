import React, { useEffect, useState } from 'react';
import { getMeals } from '../services/Meals';
import {Link} from 'react-router-dom';
import NutritionFacts from './NutritionFacts';

const Meals = ({mealsList = [], setMealsList}) => {
    const [meals, setMeals] = useState(mealsList);
    
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
        if(mealsList.length < 1){
            retrieveMeals()
        }
    },[])

    const style = {"padding":"3px", "paddingLeft":"10px", "paddingRight":"10px"}

    return (
        <>
            <table className="table table-striped">
                <thead>
                <tr className='bg-dark'>
                    <th className='text-light' style={style}>Name</th>
                    <th className='text-light' style={style}>Calories</th>
                    <th className='text-light' style={style}>Carbohydrates</th>
                    <th className='text-light' style={style}>Protein</th>
                    <th className='text-light' style={style}>Fat</th>
                    <th className='text-light' style={style}>Phosphorus</th>
                    <th className='text-light' style={style}>Potassium</th>
                    <th className='text-light' style={style}>Sodium</th>
                    <th className='text-light' style={{...style, 'width':'8em'}}>Serving Size</th>
                    <th className='text-light' style={{...style, 'width':'8em'}}>Serving Unit</th>
                    <th className='text-light' style={style}>Servings</th>
                    <th className='text-light' style={style}>Date</th>
                    <th className='text-light' ></th>
                </tr>
                </thead>
                {meals.map(meal => {
                    return (
                        <React.Fragment key={meal.mealId}>
                            <NutritionFacts food={meal} mealView={true} style={style} meals={meals} setMeals={setMeals} setMealsList={setMealsList} />
                        </React.Fragment>
                    )
                })}
            </table>
            <Link to='/AddMeal'><button className='btn btn-success'>Create</button></Link>
        </>
        )

}
export default Meals
import React from 'react'
import { Link } from 'react-router-dom'
import NutritionFacts from './NutritionFacts'

const NutritionFactsTable = ({mealsLocal, meals, setMeals, style, mealView, totalView}) => {
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
                    {mealView ?
                    <>
                    <th className='text-light' style={style}>Servings</th>
                    <th className='text-light' style={style}>Date</th>
                    </>
                    :
                    <></>
                    }
                    <th className='text-light' ></th>
                </tr>
            </thead>
            <tbody>
                {totalView ? 
                mealsLocal.map(meal => {
                    return(
                        <React.Fragment key={meal.mealId}>
                            <NutritionFacts food={meal} mealView={mealView} style={style} meals={meals} setMeals={setMeals} />
                        </React.Fragment>
                    )
                })
                :
                meals.map(meal => {
                    return (
                        <React.Fragment key={mealView ? meal.mealId : meal.id}>
                            <NutritionFacts food={meal} mealView={mealView} style={style} meals={meals} setMeals={setMeals} />
                        </React.Fragment>
                    )
                })
                }
            </tbody>
            </table>
            {(mealView && !totalView)?
            <Link to='/AddMeal'><button className='btn btn-success'>Create</button></Link>
            :
            <></>
            }
        </>
  )
}

export default NutritionFactsTable
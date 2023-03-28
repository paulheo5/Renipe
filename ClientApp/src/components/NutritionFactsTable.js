import React from 'react'
import { Link } from 'react-router-dom'
import NutritionFacts from './NutritionFacts'

const NutritionFactsTable = ({mealsLocal, meals, setMeals, style, styles, mealView, totalView}) => {

  return (
        <>
        <table className="table table-striped">
            <thead>
                <tr className='bg-dark'>
                    <th className='text-light' style={totalView? styles[0] : {...style, "width":"18%"}}>Name</th>
                    <th className='text-light' style={totalView? styles[1] : style}>Calories</th>
                    <th className='text-light' style={totalView? styles[2] : style}>Carbohydrates</th>
                    <th className='text-light' style={totalView? styles[3] : style}>Protein</th>
                    <th className='text-light' style={totalView? styles[4] : style}>Fat</th>
                    <th className='text-light' style={totalView? styles[5] : style}>Phosphorus</th>
                    <th className='text-light' style={totalView? styles[6] : style}>Potassium</th>
                    <th className='text-light' style={totalView? styles[7] : style}>Sodium</th>
                    <th className='text-light' style={{...style, 'width':'5%'}}>Serving Size</th>
                    <th className='text-light' style={{...style, 'width':'5%'}}>Serving Unit</th>
                    {mealView ?
                    <>
                    <th className='text-light' style={{...style, "width":"5%"}}>Servings</th>
                    <th className='text-light' style={{...style, "width":"5%"}}>Date</th>
                    </>
                    :
                    <></>
                    }
                    <th className='text-light'></th>
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
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackMeal, updateMeal, deleteMeal } from '../services/Meals'
import PropTypes from 'prop-types'

const NutritionFacts = ({style, food, mealView, meals, setMeals}) => {

    NutritionFacts.propTypes = {
        style: PropTypes.object,
        food: PropTypes.object,
        mealview: PropTypes.bool,
        meals: PropTypes.array,
        setMeals: PropTypes.func,
    }

    const [hide, setHide] = useState(true)
    
    const initialValues = {
            "mealId" : food.mealId,
            "foodName" : food.foodName,
            "caloriesPerServing" : Math.round(food.caloriesPerServing),
            "carbohydratesPerServing" : Math.round(food.carbohydratesPerServing),
            "proteinPerServing" : Math.round(food.proteinPerServing),
            "fatPerServing" : Math.round(food.fatPerServing),
            "phosphorusPerServing" : Math.round(food.phosphorusPerServing),
            "potassiumPerServing" : Math.round(food.potassiumPerServing),
            "sodiumPerServing" : Math.round(food.sodiumPerServing),
            "date" : new Date(food.date),
            "servings" : food.servings ?? 1,
            "servingSize" : food.servingSize,
            "servingSizeUnit" : food.servingSizeUnit
    }    

    const year = new Date().getFullYear();
    const month = (initialValues.date.getMonth() > 9) ? initialValues.date.GetMonth() + 1 : "0" + (initialValues.date.getMonth() + 1).toString()
    const dateDay = (initialValues.date.getDate() > 9) ? initialValues.date.getDate() : "0" + initialValues.date.getDate().toString()
    const dateString = `${year}-${month}-${dateDay}`
    
    const [meal, setMeal] = useState(initialValues)
    useEffect(() => {
        setMeal(initialValues)
    }, [food])

    const updateValues = (e) =>{
        setMeal({
            ...meal,
            "caloriesPerServing" : Math.round(initialValues.caloriesPerServing),
            "carbohydratesPerServing" : Math.round(initialValues.carbohydratesPerServing),
            "proteinPerServing" : Math.round(initialValues.proteinPerServing),
            "fatPerServing" : Math.round(initialValues.fatPerServing),
            "phosphorusPerServing" : Math.round(initialValues.phosphorusPerServing),
            "potassiumPerServing" : Math.round(initialValues.potassiumPerServing),
            "sodiumPerServing" : Math.round(initialValues.sodiumPerServing),
            "servings" : e.target.value,
            "servingSize" : initialValues.servingSize,
            "servingSizeUnit" : initialValues.servingSizeUnit
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        if(mealView){
            updateMeal(meal.mealId, meal)
            .then(() => {
                navigate(setHide(!hide))
            })
            .catch(err => console.log(err.response))
        }else{
        trackMeal(meal)
            .then(() => {
                navigate('/meals')
            })
            .catch(err => console.log(err.response))
        }
    }

    const clickDelete = () => {
        const result = confirm(`Are you sure you want to delete ${meal.servings} ${meal.servings === 1 ? 'serving' : 'servings'} of ${meal.foodName}?`)
        if(result){
            deleteMeal(meal.mealId)
            .then(() => {
                const updatedMeals = meals.filter(m => m.mealId != meal.mealId)
                setMeals(updatedMeals)
            })
            .catch(err => console.log(err.response))
        }
    }
    
  return (
    <tbody>
    <tr>
        <td style={style}>{meal.foodName}</td>
        <td style={style}>{Math.round(meal.caloriesPerServing * meal.servings)}</td>
        <td style={style}>{Math.round(meal.carbohydratesPerServing * meal.servings)}g</td>
        <td style={style}>{Math.round(meal.proteinPerServing * meal.servings)}g</td>
        <td style={style}>{Math.round(meal.fatPerServing * meal.servings)}g</td>
        <td style={style} className={food.phosphorusPerServing > 50 ? "text-danger" : ""}>{Math.round(meal.phosphorusPerServing * meal.servings)}mg</td>
        <td style={style} className={food.potassiumPerServing > 200 ? "text-danger" : ""}>{Math.round(meal.potassiumPerServing * meal.servings)}mg</td>
        <td style={style} className={food.sodiumPerServing > 220 ? "text-danger" : ""}>{Math.round(meal.sodiumPerServing * meal.servings)}mg</td>
        <td style={style}>{meal.servingSize}</td>
        <td style={style}>{meal.servingSizeUnit}</td>
            {mealView ? <>
                <td style={style}>{meal.servings}</td>
                <td style={style}>{new Date(meal.date).toLocaleDateString()}</td>
                <td style={{"width":"14em"}}>
                    <button className='btn btn-danger text-light'onClick={clickDelete}>Delete</button>
                    <button style={{"marginLeft":"1em"}} className='btn btn-warning text-dark' onClick={() => setHide(!hide)}>Update</button>
                </td>
            </>
            :
            <td>
                <button className="btn btn-primary" onClick={() => setHide(!hide)}>Track</button>
            </td>
        }
    </tr>
    <tr hidden={hide}>
        <td colSpan={9}>
            <form onSubmit={handleSubmit}>
                <input id="foodName" name="foodName" type="hidden" value={meal.foodName} />
                <input id="caloriesPerServing" name="caloriesPerServing" type="hidden" value={meal.caloriesPerServing} />
                <input id="carbohydratesPerServing" name="carbohydratesPerServing" type="hidden" value={meal.carbohydratesPerServing} />
                <input id="proteinPerServing" name="proteinPerServing" type="hidden" value={meal.proteinPerServing} />
                <input id="fatPerServing" name="fatPerServing" type="hidden" value={meal.fatPerServing} />
                <input id="phosphorusPerServing" name="phosphorusPerServing" type="hidden" value={meal.phosphorusPerServing} />
                <input id="potassiumPerServing" name="potassiumPerServing" type="hidden" value={meal.potassiumPerServing} />
                <input id="sodiumPerServing" name="sodiumPerServing" type="hidden" value={meal.sodiumPerServing} />
                <div className='row'>
                    <div className='col col-sm-3'>
                        <label htmlFor="date" className="col-sm-1">Date: </label>
                        <input className="form-control" id="date" name="date" type="date" defaultValue={dateString} onInput={(e) => setMeal({...meal, "date":e.target.value})} />
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col col-sm-3'>
                        <label htmlFor="servings">Servings: </label>
                        <label htmlFor='servings value' style={{"marginLeft":"1em"}}>{meal.servings}</label>
                        <input className="form-control" id="servings" name="servings" type="range" min={.25} max={5} step={.25} defaultValue={meal.servings} onInput={updateValues} />
                    </div>
                </div>
                <br />
                <button type="submit" className='btn btn-success'>Save</button>
            </form>
        </td>
    </tr>
    </tbody>
  )
}

export default NutritionFacts
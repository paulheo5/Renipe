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

    const date = new Date(2023, 1, 20)
    
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
            "date" : food.date ?? date,
            "servings" : food.servings ?? 1,
            "servingSize" : food.servingSize,
            "servingSizeUnit" : food.servingSizeUnit
    }    
    
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
            .then(navigate('/meals'))
            .catch(err => console.log(err.response))
        }else{
        trackMeal(meal)
            .then(navigate('/meals'))
            .catch(err => console.log(err.response))
        }
    }

    const clickDelete = () => {
        const result = confirm(`Are you sure you want to delete ${meal.servings} servings of ${meal.foodName}?`)
        if(result){
            deleteMeal(meal.mealId)
            .catch(err => console.log(err.response))
            const updatedMeals = meals.filter(m => m.mealId != meal.mealId)
            setMeals(updatedMeals)
        }
    }
    
  return (
    <tbody>
    <tr>
        {/* {mealView ? <td style={style}>{food.mealId}</td> :<></>} */}
        <td style={style}>{meal.foodName}</td>
        <td style={style}>{Math.round(meal.caloriesPerServing * meal.servings)}</td>
        <td style={style}>{Math.round(meal.carbohydratesPerServing * meal.servings)}</td>
        <td style={style}>{Math.round(meal.proteinPerServing * meal.servings)}</td>
        <td style={style}>{Math.round(meal.fatPerServing * meal.servings)}</td>
        <td style={style} className={food.phosphorusPerServing > 50 ? "text-danger" : ""}>{Math.round(meal.phosphorusPerServing * meal.servings)}</td>
        <td style={style} className={food.potassiumPerServing > 200 ? "text-danger" : ""}>{Math.round(meal.potassiumPerServing * meal.servings)}</td>
        <td style={style} className={food.sodiumPerServing > 220 ? "text-danger" : ""}>{Math.round(meal.sodiumPerServing * meal.servings)}</td>
        <td style={style}>{meal.servingSize}</td>
        <td style={style}>{meal.servingSizeUnit}</td>
        <td>{meal.test}</td>
            {mealView ? <>
                <td style={style}>{meal.servings}</td>
                <td style={style}>{meal.date}</td>
                <td>
                    <button className='btn btn-danger text-light'onClick={clickDelete}>Delete</button>
                    <button style={{"marginLeft":"1em"}} className='btn btn-warning text-dark' onClick={() => setHide(!hide)}>Update</button>
                </td>
            </>
            :
            <td>
                <button className="btn btn-primary" onClick={() => setHide(!hide)}>Select</button>
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
                <label htmlFor="date" className="col-sm-1">Date: </label>
                <input className="input-control" id="date" name="date" type="date" value={meal.date} onInput={(e) => setMeal({...meal, "date":e.target.value})} />
                <br />
                <label htmlFor="servings" className="col-sm-1">Servings: </label>
                <input className="input-control" id="servings" name="servings" type="range" min={.25} max={5} step={.25} defaultValue={meal.servings} onInput={updateValues} />
                <label htmlFor='servings value' style={{"marginLeft":"1em"}}>{meal.servings}</label>
                <br />
                <button type="submit" className='btn btn-success'>Track</button>
            </form>
        </td>
    </tr>
    </tbody>
  )
}

export default NutritionFacts
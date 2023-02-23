import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { trackMeal } from '../services/Meals'

const NutritionFacts = ({style, food}) => {

    const [hide, setHide] = useState(true)
    
    const initialValues = {
            "FoodName" : food.FoodName,
            "CaloriesPerServing" : Math.round(food.CaloriesPerServing / (food.Servings ?? 1)),
            "CarbohydratesPerServing" : Math.round(food.CarbohydratesPerServing / (food.Servings ?? 1)),
            "ProteinPerServing" : Math.round(food.ProteinPerServing / (food.Servings ?? 1)),
            "FatPerServing" : Math.round(food.FatPerServing / (food.Servings ?? 1)),
            "PhosphorusPerServing" : Math.round(food.PhosphorusPerServing / (food.Servings ?? 1)),
            "PotassiumPerServing" : Math.round(food.PotassiumPerServing / (food.Servings ?? 1)),
            "SodiumPerServing" : Math.round(food.SodiumPerServing / (food.Servings ?? 1)),
            "Date" : food.Date ?? Date(Date.now),
            "Servings" : food.Servings ?? 1
    }    
    
    const [meal, setMeal] = useState(initialValues)
    
    useEffect(() => {
        setMeal(initialValues)
    }, [food])

    const updateValues = (e) =>{
        setMeal({
            ...meal,
            "CaloriesPerServing" : Math.round(initialValues.CaloriesPerServing * e.target.value),
            "CarbohydratesPerServing" : Math.round(initialValues.CarbohydratesPerServing * e.target.value),
            "ProteinPerServing" : Math.round(initialValues.ProteinPerServing * e.target.value),
            "FatPerServing" : Math.round(initialValues.FatPerServing * e.target.value),
            "PhosphorusPerServing" : Math.round(initialValues.PhosphorusPerServing * e.target.value),
            "PotassiumPerServing" : Math.round(initialValues.PotassiumPerServing * e.target.value),
            "SodiumPerServing" : Math.round(initialValues.SodiumPerServing * e.target.value),
            "Servings" : e.target.value
        })
    }

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        trackMeal(meal)
        .then(navigate('/meals'))
        .catch(err => console.log(err.response))
    }
    
  return (
    <tbody>
    <tr>
        <td style={style}>{meal.FoodName}</td>
        <td style={style}>{meal.CaloriesPerServing}</td>
        <td style={style}>{meal.CarbohydratesPerServing}</td>
        <td style={style}>{meal.ProteinPerServing}</td>
        <td style={style}>{meal.FatPerServing}</td>
        <td style={style} className={food.PhosphorusPerServing > 50 ? "text-danger" : ""}>{meal.PhosphorusPerServing}</td>
        <td style={style} className={food.PotassiumPerServing > 200 ? "text-danger" : ""}>{meal.PotassiumPerServing}</td>
        <td style={style} className={food.SodiumPerServing > 220 ? "text-danger" : ""}>{meal.SodiumPerServing}</td>
        <td style={style}>
            <button className="bg-light" onClick={() => setHide(!hide)}>Select</button>
        </td>
    </tr>
    <tr hidden={hide}>
        <td colSpan={9}>
            <form onSubmit={handleSubmit}>
                <input id="FoodName" name="FoodName" type="hidden" value={meal.FoodName} />
                <input id="CaloriesPerServing" name="CaloriesPerServing" type="hidden" value={meal.CaloriesPerServing} />
                <input id="CarbohydratesPerServing" name="CarbohydratesPerServing" type="hidden" value={meal.CarbohydratesPerServing} />
                <input id="ProteinPerServing" name="ProteinPerServing" type="hidden" value={meal.ProteinPerServing} />
                <input id="FatPerServing" name="FatPerServing" type="hidden" value={meal.FatPerServing} />
                <input id="PhosphorusPerServing" name="PhosphorusPerServing" type="hidden" value={meal.PhosphorusPerServing} />
                <input id="PotassiumPerServing" name="PotassiumPerServing" type="hidden" value={meal.PotassiumPerServing} />
                <input id="SodiumPerServing" name="SodiumPerServing" type="hidden" value={meal.SodiumPerServing} />
                <label htmlFor="Date" className="col-sm-1">Date: </label>
                <input className="input-control" id="Date" name="Date" type="date" value={meal.Date} onInput={(e) => setMeal({...meal, "Date":e.target.value})} />
                <br />
                <label htmlFor="Servings" className="col-sm-1">Servings: </label>
                <input className="input-control" id="Servings" name="Servings" type="range" min={.25} max={5} step={.25} defaultValue={meal.Servings} onInput={updateValues} />
                <label htmlFor='Servings Value' style={{"marginLeft":"1em"}}>{meal.Servings}</label>
                <br />
                <button type="submit" className='btn-success'>Track</button>
            </form>
        </td>
    </tr>
    </tbody>
  )
}

export default NutritionFacts
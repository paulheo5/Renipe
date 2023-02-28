import React, { useEffect, useState } from 'react';
import { getMeals } from '../services/Meals';
import {Link} from 'react-router-dom';
import NutritionFacts from './NutritionFacts';
import NutritionFactsTable from './NutritionFactsTable';

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
            <NutritionFactsTable meals={meals} setMeals={setMeals} mealView={true} style={style} />
        </>
        )

}
export default Meals
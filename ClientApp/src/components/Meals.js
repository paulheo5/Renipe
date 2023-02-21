import React, { useState, useEffect } from 'react';
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
    useEffect(() => {
        retrieveMeals();
    },[])

    return (
        <>
            {JSON.stringify(meals)}
        </>
        )

}
export default Meals